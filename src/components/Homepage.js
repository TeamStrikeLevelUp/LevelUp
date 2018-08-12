import React from "react";
import { Link } from 'react-router-dom';
let shuffle = require("shuffle-array");

import "../../styles/index.scss";
import "../../styles/components/homepage.scss";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      gamer: {}, game: {}, forum: {}, choice: {}, voteResults: [], viewMode: false, topForum: [],
      topGames: [
        "The Elder Scrolls V: Skyrim", "Fallout 4", "Grand Theft Auto V", "Fortnite", "The Witcher 3: Wild Hunt",
        "No Man's Sky", "Octopath Traveler", "Monster Hunter: World", "The Legend of Zelda: Breath of the Wild", "Persona 5"
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.voteHandler = this.voteHandler.bind(this)
    this.viewHandler = this.viewHandler.bind(this)
  }

  componentDidMount() {
    this.props.fetchTopTwitchers();

    fetch(`/api/featured`)
      .then(response => response.json())
      .then(json => this.setState({ gamer: json.gamer, game: json.game, forum: json.forum }));

    fetch(`/api/top5forums`)
      .then(response => response.json())
      .then(json => this.setState({ topForum: json }));

  }

  handleChange(event) {

    const choice = {
      value: event.target.value,
      title: event.target.id
    }
    this.setState({ choice })
  }

  voteHandler(event) {
    event.preventDefault();

    if (this.state.choice.value) {
      if (this.props.userAuthState) {

        const newVote = {
          value: this.state.choice.value,
          title: this.state.choice.title,
          gamer_id: this.props.userAuthState.userId,
          gamer_name: this.props.userAuthState.username
        }

        fetch("/api/vote", {
          method: "post",
          body: JSON.stringify(newVote),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(function (response) {
            return response.json();
          })
          .then(json => {
            alert(json.msg)
          }).catch(error => {
            alert(error.msg)
          });

      }
      else
        alert("login to vote")
    }
    else
      alert("select a choice to vote")
  }

  viewHandler(event) {
    event.preventDefault();

    fetch(`/api/voteresults`)
      .then(response => response.json())
      .then(json => {
        let count = 0;
        json.forEach(vote => count = count + parseInt(vote.count))
        this.setState({ voteResults: json, totalVotes: count, viewMode: true });
      });
  }

  searchTwitch(event, title) {

    this.props.setTwitchStreamer(title)
    console.log("title", title);
    console.log("redux state", this.props.twitchStreamer)
  }

  render() {
    let topGames = this.state.topGames;
    shuffle(topGames);
    let topTwitchers = this.props.topTwitchers;
    shuffle(topTwitchers);
    console.log("shuffled", topTwitchers[0])
    console.log("intro", this.props.introTrigger)
    return (
      <div className="homepage">
        <div className="homepage__main">
          <h2 className="homepage__main--title">Welcome to Level Up <hr /></h2>
          <div>
            <button onClick={() => this.props.triggerIntro()} className="homepage__main--tour">Take a Tour of Level Up</button>
          </div>
          <div className="homepage__main--featured">
            <h3 className="homepage__main--featured-title"> Today's Featured Content </h3>
            <div className="homepage__main--featured--selection">
              <div className="homepage__main--featured--selection--game">
                <h4 ><i>Featured Game:</i></h4>
                <h4 className="homepage__links">{this.state.game.title}</h4>
              </div>
              <hr className="vertical__rule" />
              <div className="homepage__main--featured--selection--user">
                <h4><i>Featured User:</i> </h4>
                <h4><Link className="homepage__links" to={`/profile/${this.state.gamer.gamer_name}`}> {this.state.gamer.gamer_name} </Link>  </h4>
              </div>
              <hr className="vertical__rule" />
              <div className="homepage__main--featured--selection--forum">
                <h4><i>Featured Forum:</i> </h4>
                <h4><Link className="homepage__links" to={`/forum/${this.state.forum.id}`}> {this.state.forum.title} </Link>  </h4>
              </div>
              <hr className="vertical__rule" />
              <div className="homepage__main--featured--selection--twitch">
                <h4><i>Featured Stream: </i></h4>
                <h4 className="homepage__links">{topTwitchers[0] ?
                  <p onClick={(event) => this.searchTwitch(event, topTwitchers[0].display_name)}> <Link className="homepage__links" to="/twitch"> {topTwitchers[0].display_name} </Link> </p>
                  : null}</h4>
              </div>
            </div>
          </div>
          {/* <div className="homepage__main--upcoming-releases">
            <h4>LIST OF UPCOMING RELEASES WITH LINKS/TRAILER ONCLICK</h4>
          </div> */}
          <div className="homepage__main--top5">
            <div className="homepage__main--top5-games">
              <h4>Today's Top Games <hr /></h4>
              <ul className="homepage__links">
                {topGames.map((game, index) => {
                  if (index > 4) return;
                  return (<li key={index}>{game}</li>)
                })}
              </ul>
            </div>

            <div className="homepage__main--top5-forums">
              <h4> Top 5 Active Forums <hr /></h4>
              <ul>
                {this.state.topForum.map(forum => {

                  return (<li><Link className="homepage__links" to={`/forum/${forum.forum_id}`}> {forum.title} </Link> </li>)
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="homepage__side">
          <div className="homepage__side--poll">
            <form onChange={this.handleChange}>
              <div>
                <h3 className="poll__heading">Today's Poll</h3>
                <div className="homepage__side--poll-question">
                  <strong>
                    What platform do you prefer to play on the most?
                  </strong>
                </div>
                <br />
                <div className="homepage__side--poll-answers">
                  <input type="radio" name="answer" value="1" id="PC" />
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
                <div>
                  <button className="homepage__button button-primary button" onClick={this.voteHandler} >Vote  </button>
                  <button className="button-primary button" onClick={this.viewHandler} >View </button>
                </div>
                <div style={{ display: this.state.viewMode ? '' : 'none' }}>
                  <p>Number of Voters: {this.state.totalVotes} </p>
                  {this.state.voteResults.map(vote => {
                    return <p key={vote.title}> {vote.title} got %{(vote.count / this.state.totalVotes) * 100} </p>
                  })}
                </div>
              </div>
            </form>
          </div>
          <div className="homepage__side--twitter">
            <a className="twitter-timeline" data-height="500" data-theme="dark" data-link-color="#FAB81E" href="https://twitter.com/UpUpDwnDwn?ref_src=twsrc%5Etfw">Tweets by UpUpDwnDwn</a>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>

          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
