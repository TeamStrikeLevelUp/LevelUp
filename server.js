const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//For News page
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("167aa74e22a045b58d8d8af7cb8effe8");
//For Search page
const igdb = require("igdb-api-node").default;

const pgp = require("pg-promise")();

const bcrypt = require("bcrypt");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(
  require("express-session")({
    secret: "some random text #^*%!!", // used to generate session ids
    resave: false,
    saveUninitialized: false
  })
);

// Database connection
const db = pgp({
  host: "localhost",
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
});

// Login starts

const SALT_ROUNDS = 12;

/* helper function to get user by username */
function getUserByUsername(username) {
  return db
    .one(`SELECT * FROM gamer WHERE gamer_name = $1`, [username])
    .catch(error => console.log(error.message));
}

function getUserById(id) {
  return db
    .one(`SELECT * FROM gamer WHERE id = $1`, [id])
    .catch(error => console.log(error.message));
}

function getUserAvatarById(id) {
  return db
    .one(`SELECT avatar FROM gamer_profile WHERE gamer_id = $1`, [id])
    .catch(error => console.log(error.message));
}



///////////////// Forum - start //////////////////


app.get("/api/forum", function (req, res) {
  db.any(`SELECT * FROM forum ORDER BY title ASC`)

    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/forum/:id", function (req, res) {
  db.one(`SELECT * FROM forum WHERE id = $1`, [req.params.id])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/forum/search/:name", function (req, res) {
  db.any(`SELECT * FROM forum WHERE title ILIKE \'%$1#%\'`, [req.params.name])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/post/:id", function (req, res) {
  db.any(`SELECT * FROM post WHERE parent_id is null AND forum_id = $1 ORDER BY created DESC`, [

    req.params.id
  ])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/post/:id/search/:name", function (req, res) {
  db.any(
    `SELECT * FROM post WHERE parent_id is null AND forum_id = $1 
  AND (title ILIKE \'%$2#%\' OR body ILIKE \'%$2#%\') ORDER BY created DESC`,
    [req.params.id, req.params.name]
  )
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/parentpost/:id", function (req, res) {
  db.one(`SELECT * FROM post WHERE id = $1`, [req.params.id])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/reply/:id", function (req, res) {
  db.any(`SELECT * FROM post WHERE parent_id = $1`, [req.params.id])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/reply/:id/search/:name", function (req, res) {
  db.any(
    `SELECT * FROM post WHERE  
   (title ILIKE \'%$2#%\' OR body ILIKE \'%$2#%\') AND parent_id = $1 `,
    [req.params.id, req.params.name]
  )
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.post("/api/reply", function (req, res) {
  const { title, body, parent_id, forum_id, gamer_id, gamer_name } = req.body;

  db.one(
    `INSERT INTO post(title, body, parent_id, forum_id, gamer_id, gamer_name)
          VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
    [title, body, parent_id, forum_id, gamer_id, gamer_name]
  )
    .then(data => {
      db.any(`SELECT * FROM post WHERE parent_id = $1`, [parent_id])
        .then(data => {
          res.json(data);
        })
        .catch(error => console.log(error.message));

      // res.json(Object.assign({}, {id: data.id}, req.body));
    })
    .catch(error => {
      res.json({
        error: error.message
      });
    });
});


app.post("/api/post", function (req, res) {
  const { title, body, forum_id, gamer_id, gamer_name } = req.body;

  db.one(
    `INSERT INTO post(title, body, forum_id, gamer_id, gamer_name)
          VALUES($1, $2, $3, $4, $5) RETURNING id`,
    [title, body, forum_id, gamer_id, gamer_name]
  )
    .then(data => {
      db.any(`SELECT * FROM post WHERE parent_id is NULL AND forum_id= $1 ORDER BY created DESC`, [forum_id])
        .then(data => {
          res.json(data);
        })
        .catch(error => console.log(error.message));

      // res.json(Object.assign({}, {id: data.id}, req.body));
    })
    .catch(error => {
      res.json({
        error: error.message
      });
    });
});

///////////////// Forum - end //////////////////

///////////////// profile - start //////////////////

app.get("/api/gamer/:id", function (req, res) {
  db.one(`SELECT gamer_profile.*, gamer.gamer_name, gamer.email FROM gamer_profile
       INNER JOIN gamer ON gamer.id=$1 WHERE gamer_profile.gamer_id =$1;`, [req.params.id])
    .then(profile => {
      db.any(`SELECT * FROM game, gamer_favorites WHERE  gamer_favorites.gamer_id = $1 
      AND game.id = gamer_favorites.game_id`, [req.params.id])
        .then(favs => {
          res.json({ profile: profile, favs: favs });
        })
        .catch(error => console.log(error.message));
    })
    .catch(error => console.log(error.message));
});


app.get("/api/gamer/post/:id", function (req, res) {
  db.any(`SELECT * FROM post WHERE parent_id is null AND gamer_id = $1 ORDER BY created DESC`, [
    req.params.id
  ])
    .then(posts => {


      db.any(`SELECT * FROM post WHERE parent_id IS NOT NULL AND gamer_id = $1 ORDER BY created DESC`, [req.params.id])
        .then(replies => {
          res.json({ posts: posts, replies: replies });
        })
        .catch(error => console.log(error.message));



      // res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/profile/:username", function(req, res) {
  db.one(`SELECT * FROM gamer_profile WHERE gamer_name = $1`, [req.params.username])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

///////////////// profile - end //////////////////


// Database connection ends

function compare(plainTextPassword, hashedPassword) {
  return bcrypt.compare(plainTextPassword, hashedPassword).then(matches => {
    // matches will be true if plain text password is the same as hashedPassword once it has been hashed.
    return matches;
  });
}

// serialise user into session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialise user from session
passport.deserializeUser(function (id, done) {
  getUserById(id).then(user => {
    done(null, user);
  });
});

// configure passport to use local strategy
// that is use locally stored credentials
passport.use(
  new LocalStrategy(function (username, password, done) {
    let _user;
    getUserByUsername(username)
      .then(user => {
        if (!user) return done(null, false);
        _user = user;
        return compare(password, user.password_hash);
      })
      .then(passwordMatches => {
        if (!passwordMatches) return done(null, false);
        return done(null, _user);
      })
      .catch(error => done(error, false));
  })
);

// initialise passport and session
app.use(passport.initialize());
app.use(passport.session());

// middleware function to check user is logged in
function isLoggedIn(req, res, next) {
  if (req.user && req.user.id) {
    next();
  } else {
    res.redirect("/login");
  }
}

// route to log out users
app.get("/logout", function (req, res) {
  // log user out and redirect them to home page
  req.logout();
  res.redirect("/");
});

// Login ends

// only accessible to logged in users
app.get("/dashboard", isLoggedIn, function (req, res) {
  getUserAvatarById(req.user.id)
    .then(avatar => {
      res.render("index", {
        data: JSON.stringify(
          {
            username: req.user.gamer_name,
            userId: req.user.id,
            avatar: avatar ? avatar.avatar : ""
          })
      });
    })
});
app.get("/dashboard/account", isLoggedIn, function (req, res) {
  getUserAvatarById(req.user.id)
    .then(avatar => {
      res.render("index", {
        data: JSON.stringify(
          {
            username: req.user.gamer_name,
            userId: req.user.id,
            avatar: avatar ? avatar.avatar : ""
          })
      });
    })
});

const client = igdb("96651c2677f60060f3a91ef002c2a419");

app.set("view engine", "hbs");

app.get("/", function (req, res) {
  res.render("index", {});
});

// app.get("/", function(req, res) {
//   res.render("landing", {});
// });

app.get("/homepage", function (req, res) {
  res.render("index", {});
});

app.get("/login", function (req, res) {
  res.render("login", {});
});
// route to accept logins
app.post("/login", passport.authenticate("local", { session: true }), function (req, res) {
  res.status(200).end();
});

// register page
app.get("/signup", function (req, res) {
  res.render("signup", {});
});



app.post("/signup", (req, res) => {
  const { signupUsername, signupPassword, signupEmail } = req.body;
  pass = signupPassword;
  bcrypt
    .genSalt(SALT_ROUNDS)
    .then(salt => {
      return bcrypt.hash(signupPassword, salt);
    })
    .then(hashedPassword => {
      db.one(
        `
              INSERT INTO gamer (gamer_name, password_hash, email)
              VALUES ($1, $2, $3) RETURNING id;
        `,
        [signupUsername, hashedPassword, signupEmail]
      )
        .then(data => {
         

          db.one(
            `
                  INSERT INTO gamer_profile (gamer_name, gamer_id)
                  VALUES ($1, $2) RETURNING id;
            `,
            [signupUsername, data.id]
          )
            .then(data2 => {
            
    
              res.status(200).end();
            }).catch(error => console.log("Gamer_profile error: ", error.message));

                  })
        .catch(error => console.log("Gamer error: ", error.message));
    });
});



app.get("/games/:title", (req, res) => {
  const gameTitle = req.params.title;
  client
    .games(
      {
        filters: {
          "name-in": gameTitle
        },
        order: "popularity:desc",
        search: gameTitle
      },
      ["*"]
    )
    .then(response => {
      // response.body contains the parsed JSON response to this query
      displayData(res, response);
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    });
});

app.get("/gameid/:id", (req, res) => {
  const gameTitle = req.params.id;
  client
    .games({
      ids: [gameTitle],
      order: "release_dates.date:asc",
      fields: "id,name,summary,cover.url,rating,aggregated_rating,cover", // Return all fields
      limit: 5, // Currentlyl imited to 5 results
      offset: 15 // Index offset for results
    })
    .then(response => {
      displayData(res, response);
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    });
});

//Load themes and genres once on component did mount to speed up search
app.get("/themes/", (req, res) => {
  const themeId = req.params.title;
  client
    .themes({
      fields: "id,name",
      limit: 50 // Limit to 50 results
    })
    .then(response => {
      displayData(res, response);
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    });
});

app.get("/genres/", (req, res) => {
  const genreId = req.params.genreId;
  client
    .genres({
      fields: "id,name", // Return all fields
      limit: 50 // Limit to 50 results
    })
    .then(response => {
      // response.body contains the parsed JSON response to this query
      displayData(res, response);
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    });
});

function displayData(res, data) {
  res.json(data);
}

//Main general NEWS search for latest Gaming/tech articles
app.get("/newsApi/:pageNum", (req, res) => {
  const page = req.params.pageNum;

  newsapi.v2.everything({
    sources: "ign",
    language: "en",
    sortBy: "publishedAt",
    pageSize: 10,
    page
  })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    });
});

//Specific NEWS search based on user-input
app.get("/searchNews/:searchTerm/:pageNum", (req, res) => {
  const search = req.params.searchTerm;
  const page = req.params.pageNum;
  newsapi.v2
    .everything({
      sources: "ign",
      q: search,
      language: "en",
      sortBy: "relevancy,publishedAt",
      pageSize: 10,
      page
    })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Origin", "Content-Type");
  next();
});

app.get("*", function (req, res) {
  res.render("index", {
    data: req.user
      ? JSON.stringify({ username: req.user.gamer_name, userId: req.user.id })
      : JSON.stringify({ username: null, userId: null })
  });
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Listening on port number http://localhost:${port}`);
});
