import React from "react";

import "../../static/styles/components/twitch.scss";

class TwitchSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      twitchQuery: "",
      displayVideo: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      twitchQuery: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      displayVideo: true
    });
  }

  handleClick(event) {
    this.setState({
      twitchQuery: event.target.innerText,
      displayVideo: true
    });
  }

  render() {
    console.log(this.state.twitchQuery);
    return (
      <div className="twitch">
        <div className="twitch__search">
          <h2 className="twitch__search--title">
            Find Your Favourite Streamers and Enjoy!
          </h2>
          <form
            onSubmit={this.handleSubmit}
            className="twitch__search--form"
            id="twitch__form"
            action=""
          >
            <input
              onChange={this.handleChange}
              className="twitch__search--input"
              type="text"
              name="twitch__input"
              id="twitch__input"
              placeholder="Search for a channel..."
            />
            <button id="twitch__submit" className="twitch__submit">
              Search
            </button>
          </form>
          <div>
            <iframe
              className={
                this.state.displayVideo
                  ? "twitch__player"
                  : "twitch__player--hide"
              }
              src={`http://player.twitch.tv/?channel=${this.state.twitchQuery}`}
              height="700"
              width="800"
              frameBorder="2"
              scrolling="yes"
              allowFullScreen="true"
            />
          </div>
        </div>
        <div>
          <h2 className="twitch__streamers--title">
            Check out these popular streamers:
          </h2>
          <ul className="twitch__streamers">
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                Ninja
              </h4>
              <p>Focus: Fortnite</p>
            </li>
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                Shroud
              </h4>
              <p>Focus: Shooters</p>
            </li>
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                Riot Games
              </h4>
              <p>Focus: League of Legends</p>
            </li>
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                ESL
              </h4>
              <p>Focus: Counter Strike</p>
            </li>
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                TSM_Myth
              </h4>
              <p>Focus: Fortnite</p>
            </li>
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                MHeyhoe91
              </h4>
              <p>Focus: FIFA</p>
            </li>
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                CohhCarnage
              </h4>
              <p>Focus: PUBG</p>
            </li>
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                Asmongold
              </h4>
              <p>Focus: World of Warcraft</p>
            </li>
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                Dendi
              </h4>
              <p>Focus: Dota 2</p>
            </li>
            <li>
              <h4
                className="twitch__streamers--names"
                onClick={this.handleClick}
              >
                Ltzonda
              </h4>
              <p>Focus: Grand Theft Auto</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TwitchSearch;
