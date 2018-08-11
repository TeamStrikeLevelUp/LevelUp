import React from "react";
import "../../styles/components/twitch.scss";

class TwitchSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      twitchQuery: this.props.twitchStreamer,
      displayVideo: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addToFavourites = this.addToFavourites.bind(this);
  }

  componentDidMount() {
    if (this.props.fetchTwitchFavourites !== undefined) {
      if (this.props.userAuthState) {
        this.props.fetchTwitchFavourites(this.props.userAuthState.userId);
      }
    }
    this.props.fetchTopTwitchers();
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

  addToFavourites(twitchStream) {
    if (this.props.userAuthState) {
      const newFav = {
        gamerId: this.props.userAuthState.userId,
        twitchName: twitchStream
      };
      // console.log("twitch info", newFav)
      this.props.addToFavourite(newFav);
      this.props.fetchTwitchFavourites(this.props.userAuthState.userId);
    } else {
      alert("Please log in to select favourites");
    }
  }

  render() {
    const {
      fetchTwitchFavourites,
      twitchFavourite,
      userAuthState,
      topTwitchers
    } = this.props;
    return (
      <div className="twitch">
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
              alt="Twitch Search"
              id="twitch__input"
              placeholder="Search streamers"
              value={this.state.twitchQuery}
            />
            <button id="twitch__submit" className="twitch__button">
              Search
            </button>
            <button
              className="twitch__button"
              onClick={event => {
                this.addToFavourites(this.state.twitchQuery);
              }}
            >
              Add to favourites
            </button>

            {userAuthState ? <h2>Favourites </h2> : null}
            <ul>
              {twitchFavourite.map(currentFavourite => (
                <a
                  href="#"
                  className="twitch__anchor"
                  key={currentFavourite.twitch_name}
                >
                  <li
                    key={currentFavourite.twitch_name}
                    onClick={this.handleClick}
                  >
                    {currentFavourite.twitch_name}
                  </li>
                </a>
              ))}
            </ul>
          </form>
          <div className="twitch__search--video">
            <iframe
              className="twitch__player"
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
          <h2 className="twitch__streamers--title">Top 10 Live Streams</h2>
          <ul>
            {topTwitchers.map(currentTwitch => {
              return (
                <a href="#" key={currentTwitch.id}>
                  <li onClick={this.handleClick}>
                    <img src={currentTwitch.profile_image_url} width="100" />
                    {currentTwitch.display_name}
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TwitchSearch;
