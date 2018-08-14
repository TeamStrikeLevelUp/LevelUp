import React from "react";
import { Link } from "react-router-dom";
let shuffle = require("shuffle-array");

import "../../styles/index.scss";
import "../../styles/components/homepage.scss";

let topGames = [];
let topTwitchers = [];

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      gamer: {},
      game: {},
      forum: {},
      choice: {},
      voteResults: [],
      viewMode: false,
      topForum: [],
      resultsMode: false,
      topGames: [
        "The Elder Scrolls 5: Skyrim",
        "Fallout 4",
        "Grand Theft Auto 5",
        "Fortnite",
        "The Witcher 3: Wild Hunt",
        "No Man's Sky",
        "Octopath Traveler",
        "Monster Hunter: World",
        "The Legend of Zelda: Breath of the Wild",
        "Persona 5"
      ]
      // topTwitchers:{}
      // ],
      // topTwitchers: [
      //   "Reckful",
      //   "dakotaz",
      //   "CohhCarnage",
      //   "partypokerTV",
      //   "twitchrivals_tw"
      // ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
    this.viewHandler = this.viewHandler.bind(this);
    this.searchGame = this.searchGame.bind(this);
    this.searchListGame = this.searchListGame.bind(this);
  }

  componentDidMount() {
    // this.props.fetchTopTwitchers(); // fetch current streamers online atm
    this.props.fetchTopTwitchers(); //hold 5 in state
    console.log("top twitchers", topTwitchers);
    shuffle(topTwitchers);

    topGames = this.state.topGames;
    shuffle(topGames);

    fetch(`/api/featured`)
      .then(response => response.json())
      .then(json =>
        this.setState({ gamer: json.gamer, game: json.game, forum: json.forum })
      );

    fetch(`/api/top5forums`)
      .then(response => response.json())
      .then(json => this.setState({ topForum: json }));
  }

  handleChange(event) {
    const choice = {
      value: event.target.value,
      title: event.target.id
    };
    this.setState({ choice });
  }

  voteHandler(event) {
    event.preventDefault();

    if (this.state.choice.value) {
      if (this.props.userAuthState.userId) {
        const newVote = {
          value: this.state.choice.value,
          title: this.state.choice.title,
          gamer_id: this.props.userAuthState.userId,
          gamer_name: this.props.userAuthState.username
        };

        fetch("/api/vote", {
          method: "post",
          body: JSON.stringify(newVote),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(function(response) {
            return response.json();
          })
          .then(json => {
            alert(json.msg);
          })
          .catch(error => {
            alert(error.msg);
          });
      } else alert("login to vote");
    } else alert("select a choice to vote");
  }

  viewHandler(event) {
    event.preventDefault();

    fetch(`/api/voteresults`)
      .then(response => response.json())
      .then(json => {
        let count = 0;
        json.forEach(vote => (count = count + parseInt(vote.count)));
        this.setState({ voteResults: json, totalVotes: count, viewMode: true });
      });

    this.setState({ resultsMode: !this.state.resultsMode });
  }

  searchTwitch(event, title) {
    this.props.setTwitchStreamer(title);
  }

  searchGame() {
    this.props.searchClickedGame(this.state.game.title);
  }

  searchListGame(event, title) {
    this.props.searchClickedGame(title);
  }

  render() {
    const { userAuthState } = this.props;
    // console.log("rnd twitch", topTwitchers[0][display_name]);

    return (
      <div className="homepage">
        <button
          onBlur={() => this.props.handleBlur()}
          onClick={() => this.props.triggerIntro()}
          className="homepage__main--tour"
        >
          Tour Leve1UP
        </button>
        <div className="homepage__main--title">Featured</div>
        <div className="homepage__main">
          <div className="homepage__featured--game">
            <h4 onClick={this.searchGame}>Game</h4>
            <h4>
              <Link className="homepage__links" to="/search">
                {this.state.game.title}
                <br />

                <img
                  src="//images.igdb.com/igdb/image/upload/t_cover_big/f9jvrf3nwdgdil287sla"
                  className="search__img--cover"
                />
              </Link>
            </h4>
          </div>

          <div className="homepage__featured--user">
            <h4>User</h4>
            <h4>
              <Link
                className="homepage__links"
                to={`/profile/${this.state.gamer.gamer_name}`}
              >
                {" "}
                {this.state.gamer.gamer_name}
              </Link>{" "}
              <br />
              <img className="profile--image" src={this.state.gamer.avatar} />
            </h4>
          </div>

          <div className="homepage__featured--forum">
            <h4>Forum</h4>
            <h4>
              <Link
                className="homepage__links"
                to={`/forum/${this.state.forum.id}`}
              >
                {" "}
                {this.state.forum.title} <br />
                <img src="../static/images/forums.png" width="250" />
              </Link>{" "}
            </h4>
          </div>

          <div className="homepage__featured--twitch">
            <h4>Stream</h4>
            <h4 className="homepage__links">
              {topTwitchers[0] ? (
                <p
                  onClick={event =>
                    this.searchTwitch(event, topTwitchers[0].display_name)
                  }
                >
                  {" "}
                  <br /> <br />
                  <img src="../static/images/twitch.png" width="200" />
                  <Link className="homepage__links" to="/twitch">
                    {" "}
                    {topTwitchers[0]}{" "}
                  </Link>{" "}
                </p>
              ) : null}
            </h4>
          </div>

          <div className="homepage__side--poll">
            <form onChange={this.handleChange}>
              <header className="homepage__side--poll-question">
                <strong>What is your favourite gaming platform?</strong>
              </header>
              <div
                className="homepage__side--poll-answers"
                style={{ display: this.state.resultsMode ? "none" : "" }}
              >
                <input type="radio" name="answer" value="1" />
                <label htmlFor="PC">PC</label>
                <input type="radio" name="answer" value="2" id="PS4" />
                <label htmlFor="PS4">PS4</label>
                <input type="radio" name="answer" value="3" id="Xbox" />
                <label htmlFor="Xbox">Xbox One</label>
                <input type="radio" name="answer" value="4" id="Switch" />
                <label htmlFor="Switch">Nintendo Switch</label>
                <input type="radio" name="answer" value="5" id="Mobile" />
                <label htmlFor="Mobile">Mobile</label>
                <input type="radio" name="answer" value="6" id="Other" />
                <label htmlFor="Other">Other</label>
              </div>
              <div style={{ display: this.state.resultsMode ? "" : "none" }}>
                <p>Number of Voters: {this.state.totalVotes} </p>
                {this.state.voteResults.map(vote => {
                  return (
                    <p key={vote.title}>
                      {" "}
                      {vote.title} got{" "}
                      {(vote.count / this.state.totalVotes) * 100}%{" "}
                    </p>
                  );
                })}
              </div>

              <div>
                <button
                  className="homepage__button button-primary button"
                  onClick={this.voteHandler}
                >
                  Vote{" "}
                </button>
                <button
                  className="button-primary button"
                  onClick={this.viewHandler}
                >
                  {this.state.resultsMode ? "View Poll" : "View Results"}{" "}
                </button>
              </div>
            </form>
          </div>
          <div className="homepage__topgames">
            <h4>Top Games</h4>
            <ul>
              {topGames.map((game, index) => {
                if (index > 4) return;
                return (
                  <li
                    onClick={event => this.searchListGame(event, game)}
                    key={index}
                  >
                    {" "}
                    <Link className="homepage__links" to="/search">
                      {" "}
                      {game}{" "}
                    </Link>{" "}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="homepage__topforums">
            <h4> Top Forums</h4>
            <ul>
              {this.state.topForum.map(forum => {
                return (
                  <li key={forum.id}>
                    <Link
                      className="homepage__links"
                      to={`/forum/${forum.forum_id}`}
                    >
                      {" "}
                      {forum.title}{" "}
                    </Link>{" "}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* <div className="homepage__side"> */}

        {/* <div className="homepage__side--twitter">
            <a
              className="twitter-timeline"
              data-height="500"
              data-theme="dark"
              data-link-color="#FAB81E"
              href="https://twitter.com/UpUpDwnDwn?ref_src=twsrc%5Etfw"
            >
              Tweets by UpUpDwnDwn
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            />
          </div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Homepage;
