import React from "react";

class TwitchSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      twitchQuery: "",
      displayVideo: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    console.log(this.state.twitchQuery);
    return (
      <div className="twitch__search">
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
    );
  }
}

export default TwitchSearch;
