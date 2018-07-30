const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const igdb = require('igdb-api-node').default;
app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.use(cors());

const client = igdb('96651c2677f60060f3a91ef002c2a419')

app.set("view engine", "hbs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/games/:title", (req, res) => {
  const gameTitle = req.params.title;
  client.games({
    search: gameTitle,
    fields: 'id,name,summary,cover.url,rating,aggregated_rating,cover', // Return all fields
    limit: 5, // Limit to 5 results
    offset: 15 // Index offset for results
  })
    .then(response => {
      // response.body contains the parsed JSON response to this query

      displayData(res, response)
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    })
})
app.get("/gameid/:id", (req, res) => {
  const gameTitle = req.params.id;
  client.games({
    ids: [gameTitle],
    fields: 'id,name,summary,cover.url,rating,aggregated_rating,cover', // Return all fields
    limit: 5, // Limit to 5 results
    offset: 15 // Index offset for results
  })
    .then(response => {
      // response.body contains the parsed JSON response to this query

      displayData(res, response)
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    })
})

app.get("/reviews/:gameId", (req, res) => {
  const gameTitle = req.params.gameId;
  client.reviews({
    ids: [gameTitle],//try 2645 for an id 
    // fields: 'id,title,review_rating,content,positive_points,negative_points', // Return all fields
    fields: '*',
    limit: 5, // Limit to 5 results
    offset: 15 // Index offset for results
  })
    .then(response => {
      // response.body contains the parsed JSON response to this query
      displayData(res, response)
    })
    .catch(error => {
      console.log("You have 2 lives remaining ", error);
    })
})
function displayData(res, data) {
  res.json(data)
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Origin', 'Content-Type');
  next();
})

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Listening on port number ${port}`);
});
