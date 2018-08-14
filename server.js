const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const FormData = require("form-data");

//For News page
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);

//For Search page
const igdb = require("igdb-api-node").default;
const client = igdb(process.env.IGDB_KEY);
const pgp = require("pg-promise")();

const bcrypt = require("bcrypt");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

const getUser = req => {
  const user = req.user
    ? {
      username: req.user.gamer_name,
      userId: req.user.id
    }
    : { username: null, userId: null };

  return {
    data: JSON.stringify(user)
  };
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

//Fetches Top TWITCH Data streams - Twitch channel/user names & photos etc
app.get("/twitchStreams", (req, res) => {
  var headers = {
    "Client-ID": process.env.TWITCH_KEY
  };
  fetch(`https://api.twitch.tv/helix/streams?first=5&language=en`, {
    method: "GET",
    headers
  })
    .then(
      response => (response.ok ? response.json() : Promise.reject(response))
    )
    .then(result => {
      return result.data.map(twitchUser => {
        return fetch(
          `https://api.twitch.tv/helix/users?id=${twitchUser.user_id}`,
          {
            method: "GET",
            headers
          }
        );
      });
    })
    .then(result => {
      return Promise.all(result);
      // console.log("twitcher info", result.data);
    })
    .then(results => {
      return results.map(result => result.json());
    })
    .then(result => {
      return Promise.all(result);
      // console.log("twitcher info", result.data);
    })
    .then(results => {
      // console.log("twitcher info", results);
      res.json(results);
    })
    .catch(error => {
      console.log(error);
    });
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
  db.any(
    `SELECT * FROM post WHERE parent_id is null AND forum_id = $1 ORDER BY created DESC`,
    [req.params.id]
  )
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

// Get gamer's posts
app.get("/api/userposts/:id", function (req, res) {
  db.manyOrNone(
    `SELECT * FROM post WHERE gamer_id = $1 ORDER BY created DESC`,
    [req.params.id]
  )
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

// Get posts that are parent (thread)
app.get("/api/parentpost/:id", function (req, res) {
  db.one(`SELECT * FROM post WHERE id = $1`, [req.params.id])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

// Get posts that are replies of a parent post
app.get("/api/postsbyparent/:parentid", function (req, res) {
  db.manyOrNone(`SELECT * FROM post WHERE parent_id = $1`, [
    req.params.parentid
  ])
    .then(data => res.json(data))
    .catch(error => console.log("/api/postsbyparent/:parentid", error.message));
});

// Get user's avatar
app.get("/api/getgameravatar/:gamer_id", function (req, res) {
  db.oneOrNone(`SELECT avatar FROM gamer_profile WHERE gamer_id = $1`, [
    req.params.gamer_id
  ])
    .then(data => res.json(data))
    .catch(error => console.log("/api/getgameravatar", error.message));
});

app.get("/api/reply/:id", function (req, res) {
  db.any(`SELECT * FROM post WHERE parent_id = $1 ORDER BY created ASC`, [
    req.params.id
  ])
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
          db.none(
            `UPDATE gamer_profile SET totalposts = totalposts+1 where gamer_id = $1`,
            [gamer_id]
          );
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
      db.any(
        `SELECT * FROM post WHERE parent_id is NULL AND forum_id= $1 ORDER BY created DESC`,
        [forum_id]
      )
        .then(data => {
          db.none(
            `UPDATE gamer_profile SET totalposts = totalposts+1 where gamer_id = $1`,
            [gamer_id]
          );
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

app.post("/api/post-edit", function (req, res) {
  const { newTitle, newBody, post_id, forum_id } = req.body;

  db.one(
    `UPDATE post SET title = $1, body = $2 WHERE id = $3 
  RETURNING id;`,
    [newTitle, newBody, post_id]
  )
    .then(data => {
      db.any(
        `SELECT * FROM post WHERE parent_id is NOT NULL AND forum_id= $1 ORDER BY created DESC`,
        [forum_id]
      )
        .then(data => {
          res.json(data);
        })
        .catch(error => console.log(error.message));
    })
    .catch(error => console.log(error.message));
});

app.post("/api/postreport/:id", function (req, res) {
  const { selectId } = req.body;
  const review = "review";
  db.one(`UPDATE post SET admin_status = $1 WHERE id = $2;`, [review, selectId])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/reviewposts", function (req, res) {
  db.any(
    "SELECT body, post.id, post.title, gamer.gamer_name, forum.title AS forum_title FROM post, gamer, forum WHERE admin_status = 'review' AND post.gamer_id = gamer.id AND post.forum_id = forum.id;"
  )
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.post("/api/review-delete/:id", function (req, res) {
  const { id } = req.body;
  const deletedPost = "this post was deleted by a moderator";
  const deletedStatus = "delete";
  db.one(`UPDATE post SET body = $1, admin_status = $2 WHERE id = $3;`, [
    deletedPost,
    deletedStatus,
    id
  ])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/deletedposts", function (req, res) {
  db.any(
    "SELECT body, post.id, post.title, gamer.gamer_name, forum.title AS forum_title FROM post, gamer, forum WHERE admin_status = 'delete' AND post.gamer_id = gamer.id AND post.forum_id = forum.id;"
  )
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

///////////////// Forum - end //////////////////

///////////////// Account Updates - Starts /////////////////
// Avatar Update
app.post("/api/account/avatar", function (req, res) {
  const { gamer_id, avatar } = req.body;
  if (avatar) {
    db.one(
      `UPDATE gamer_profile SET avatar = $2
            WHERE gamer_id = $1`,
      [gamer_id, avatar]
    )
      .then(data => {
        return { status: "success" };
      })
      .catch(error => {
        res.json({
          error: error.message
        });
      });
  }
});

// Fortnite name Update
app.post("/api/account/fortnitename", function (req, res) {
  console.log("req.body", req.body);
  const { gamer_id, fortniteName } = req.body;
  if (fortniteName) {
    db.one(
      `UPDATE gamer_profile SET fortniteName = $2
            WHERE gamer_id = $1`,
      [gamer_id, fortniteName]
    )
      .then(data => {
        return { status: "success" };
      })
      .catch(error => {
        res.json({
          error: error.message
        });
      });
  }
});

// Email Update
app.post("/api/account/emailupdate", function (req, res) {
  console.log("req.body", req.body);
  const { gamer_id, email } = req.body;
  if (email) {
    db.one(
      `UPDATE gamer SET email = $2
            WHERE id = $1`,
      [gamer_id, email]
    )
      .then(data => {
        return { status: "success" };
      })
      .catch(error => {
        res.json({
          error: error.message
        });
      });
  }
});

// Description Update
app.post("/api/account/description", function (req, res) {
  const { gamer_id, desc } = req.body;
  if (desc) {
    db.one(
      `UPDATE gamer_profile SET description = $2
            WHERE gamer_id = $1`,
      [gamer_id, desc]
    )
      .then(data => {
        return { status: "success" };
      })
      .catch(error => {
        res.json({
          error: error.message
        });
      });
  }
});

///////////////// Account Updates - Ends //////////////////

///////////////// profile - start //////////////////

app.get("/api/gamer/:id", function (req, res) {
  db.one(
    `SELECT gamer_profile.*, gamer.gamer_name, gamer.email FROM gamer_profile
       INNER JOIN gamer ON gamer.id=$1 WHERE gamer_profile.gamer_id =$1;`,
    [req.params.id]
  )
    .then(profile => {
      db.any(
        `SELECT * FROM game, gamer_favorites WHERE  gamer_favorites.gamer_id = $1 
      AND game.id = gamer_favorites.game_id`,
        [req.params.id]
      )
        .then(favs => {
          res.json({ profile: profile, favs: favs });
        })
        .catch(error => console.log(error.message));
    })
    .catch(error => console.log(error.message));
});

app.post("/api/newfavourite/", function (req, res) {
  //check if game exists in game table
  db.one(`SELECT * FROM game WHERE igdb_id = $1`, [req.body.igdb])
    .then(data1 => {
      console.log(data1.id);

      // game exists in game table => check if it exists in gamer_favorites
      db.one(
        `SELECT * FROM gamer_favorites WHERE game_id = $1 
      AND gamer_id = $2`,
        [data1.id, req.body.gamerId]
      )
        .then(data2 => {
          //game already exists in gamer_favorites. Returning
          res.json({ msg: "game is already there" });
        })
        .catch(error => {
          // game doesnt exists in gamer_favorites. Adding

          db.one(
            `INSERT INTO gamer_favorites(game_id, gamer_id)
                    VALUES($1, $2) RETURNING id`,
            [data1.id, req.body.gamerId]
          )
            .then(data3 => {
              res.json({ msg: "added fav" });
            })
            .catch(error => {
              res.json({
                error: error.message
              });
            });
        });
    })
    .catch(error => {
      //game doesnt exsits in game table, Adding to game table
      console.log("doesnt exist");

      db.one(
        `INSERT INTO game(title, igdb_id)
                VALUES($1, $2) RETURNING id`,
        [req.body.title, req.body.igdb]
      )
        .then(data4 => {
          db.one(
            `INSERT INTO gamer_favorites(game_id, gamer_id)
                    VALUES($1, $2) RETURNING id`,
            [data4.id, req.body.gamerId]
          )
            .then(data5 => {
              res.json({ msg: "added game and fav" });
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
});

// gets all GAME favourites per user
app.get("/api/favourites/:id", function (req, res) {
  db.any(
    `SELECT * FROM game, gamer_favorites WHERE  gamer_favorites.gamer_id = $1 
      AND game.id = gamer_favorites.game_id`,
    [req.params.id]
  )
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

// gets all TWITCH favourites per user
app.get("/api/twitchfavourites/:id", function (req, res) {
  db.any(`SELECT * FROM twitch_favorites WHERE  gamer_id = $1 `, [
    req.params.id
  ])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

// adds TWITCH favourite to database
app.post("/api/addtwitchfavourite", function (req, res) {
  var headers = {
    "Client-ID": process.env.TWITCH_KEY
  };
  fetch(`https://api.twitch.tv/helix/users?login=${req.body.twitchName}`, {
    method: "GET",
    headers
  })
    .then(
      response => (response.ok ? response.json() : Promise.reject(response))
    )
    .then(result => {
      const twitch_image = result.data[0]["profile_image_url"];
      return twitch_image;
    })
    .then(twitch_image => {
      //Original insert below

      db.one(
        `INSERT INTO twitch_favorites(twitch_name, gamer_id,twitch_image)
          VALUES($1, $2, $3) RETURNING id`,
        [req.body.twitchName, req.body.gamerId, twitch_image]
      )
        .then(data => {
          res.json({ msg: "added" });
        })
        .catch(error => {
          res.json({
            error: error.message
          });
        });
    });
});

app.get("/api/gamer/post/:id", function (req, res) {
  db.any(
    `SELECT * FROM post WHERE parent_id is null AND gamer_id = $1 ORDER BY created DESC`,
    [req.params.id]
  )
    .then(posts => {
      db.any(
        `SELECT * FROM post WHERE parent_id IS NOT NULL AND gamer_id = $1 ORDER BY created DESC`,
        [req.params.id]
      )
        .then(replies => {
          res.json({ posts: posts, replies: replies });
        })
        .catch(error => console.log(error.message));

      // res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.get("/api/profile/:username", function (req, res) {
  db.one(`SELECT * FROM gamer_profile WHERE gamer_name = $1`, [
    req.params.username
  ])
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

///////////////// profile - end //////////////////

///////////////// homepage - start //////////////////

app.get("/api/featured/", function (req, res) {
  db.one(
    `SELECT gamer_name, gamer_id,avatar FROM gamer_profile ORDER BY RANDOM() LIMIT 1`
  )
    .then(gamer => {
      db.one(`SELECT title, igdb_id FROM game ORDER BY RANDOM() LIMIT 1`)
        .then(game => {
          db.one(`SELECT title, id FROM forum ORDER BY RANDOM() LIMIT 1`)
            .then(forum => {
              res.json({ gamer, game, forum });
            })
            .catch(error => console.log(error.message));
        })
        .catch(error => console.log(error.message));
    })
    .catch(error => console.log(error.message));
});

app.get("/api/voteresults", function (req, res) {
  db.any(`SELECT title, COUNT(title) FROM poll GROUP BY title`)
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

app.post("/api/vote", function (req, res) {
  const { title, value, gamer_id, gamer_name } = req.body;

  db.one(
    `INSERT INTO poll(value, title, gamer_id, gamer_name)
          VALUES($1, $2, $3, $4) RETURNING id`,
    [value, title, gamer_id, gamer_name]
  )
    .then(data => {
      res.json({ msg: "thank you for voting" });
    })
    .catch(error => {
      res.json({ msg: "you already voted" });
    });
});

app.get("/api/top5forums", function (req, res) {
  db.any(
    `SELECT post.forum_id, COUNT(post.forum_id), forum.title FROM post, forum 
  WHERE post.forum_id = forum.id GROUP BY post.forum_id, forum.title ORDER BY count DESC LIMIT 5`
  )
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error.message));
});

///////////////// homepage - end //////////////////

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
  req.logout();
  res.redirect("/");
});

// Login ends

// only accessible to logged in users
app.get("/dashboard", isLoggedIn, function (req, res) {
  getUserAvatarById(req.user.id).then(avatar => {
    if (req.user.id) {
      res.render("index", {
        data: JSON.stringify({
          username: req.user.gamer_name,
          userId: req.user.id,
          avatar: avatar ? avatar.avatar : ""
        })
      });
    } else {
      res.render("index", getUser(req));
    }
  });
});
app.get("/dashboard/account", isLoggedIn, function (req, res) {
  getUserAvatarById(req.user.id)
    .then(avatar => {
      if (req.user.id) {
        res.render("index", {
          data: JSON.stringify({
            username: req.user.gamer_name,
            userId: req.user.id,
            avatar: avatar ? avatar.avatar : ""
          })
        });
      } else {
        res.render("index", getUser(req));
      }
    })
    .catch(error => console.log(error.message));
});

app.set("view engine", "hbs");

// app.get("/", function (req, res) {
//   res.render("index", {});
// });

app.get("/", function (req, res) {
  res.render("index", getUser(req));
});

app.get("/homepage", function (req, res) {
  if (req.user) {
    res.render("index", {
      data: JSON.stringify({
        username: req.user.gamer_name,
        userId: req.user.id
      })
    });
  } else {
    res.render("index", getUser(req));
  }
});

app.get("/login", function (req, res) {
  res.render("login", getUser(req));
});
// route to accept logins
app.post("/login", passport.authenticate("local", { session: true }), function (
  req,
  res
) {
  res.status(200).end();
});


// register page
app.get("/signup", function (req, res) {
  res.render("signup", getUser(req));
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
            })
            .catch(error =>
              console.log("Gamer_profile error: ", error.message)
            );
        })
        .catch(error => console.log("Gamer error: ", error.message));
    });
});

//Main  GAMES search for specific title
app.get("/games/:title", (req, res) => {
  const gameTitle = req.params.title;
  client
    .games(
      {
        filters: {
          "name-in": gameTitle
        },

        order: "popularity:desc"
      },
      ["*"]
    )
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    });
});

//This search is executed when a favourite is clicked on due to the search limitations of the API not finding the game by exact title
app.get("/gameid/:id", (req, res) => {
  const gameTitle = req.params.id;
  client
    .games({
      ids: [gameTitle],
      order: "release_dates.date:asc",
      fields: "*", // Return all fields
      limit: 5, // Currently limited to 5 results
      offset: 15 // Index offset for results
    })
    .then(response => {
      res.json(response);
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
      res.json(response);
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
      res.json(response);
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    });
});

//Main general NEWS search for latest Gaming/tech articles
app.get("/newsApi/:pageNum", (req, res) => {
  const page = req.params.pageNum;

  newsapi.v2
    .everything({
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

// Fortnite data --

app.get("/api/fortnite/:username", (req, res) => {
  const username = req.params.username;
  var formData = new FormData();
  formData.append("username", username);

  fetch(`https://fortnite-public-api.theapinetwork.com/prod09/users/id`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: process.env.FORTNITE_KEY
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(result => {
      //console.log(result);
      var formDataStats = new FormData();

      formDataStats.append("user_id", result.uid);
      formDataStats.append("platform", result.platforms[0]);
      formDataStats.append("window", "alltime");

      fetch(
        `https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats`,
        {
          method: "POST",
          body: formDataStats,
          headers: {
            Authorization: process.env.FORTNITE_KEY
          }
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(result => {
          //  console.log(result);

          res.json(result);
        });
    });
});
// -- Fortnite end

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Origin", "Content-Type");
  next();
});

app.get("*", function (req, res) {
  res.render("index", getUser(req));
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Listening on port number http://localhost:${port}`);
});
