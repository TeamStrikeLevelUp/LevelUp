import React from "react";
import "../../styles/components/twitch.scss";

class TwitchSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      twitchQuery: this.props.twitchStreamer
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
      // displayVideo: true
    });
  }

  handleClick(streamer) {
    this.setState({
      twitchQuery: streamer
      // displayVideo: true
    });
  }

  addToFavourites(twitchStream) {
    if (this.props.userAuthState.userId) {
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

    //Logic to check if the user is logged in and display avatar and name if they are
    const displayStatus = userAuthState ? (
      <div>
        <img src={userAuthState.avatar} className="search__avatar" />
        <p>{userAuthState.username} </p>
      </div>
    ) : (
      "You are not logged in"
    );

    return (
      <div className="twitch__body">
        {/* <div className="twitch__search"> */}
        <div className="search__side">
          {displayStatus}

          <form
            onSubmit={this.handleSubmit}
            //  {/* className="twitch__search--form" */}
            className="search__form"
          >
            <input
              onChange={this.handleChange}
              type="search"
              results="0"
              alt="Twitch Search"
              className="search__input"
              autoComplete="off"
              value={this.state.twitchQuery}
              placeholder="Search streamers"
              //name="twitch__input"
              //className="twitch__search--input"
            />
          </form>
          {/* //<button className="twitch__button">Search</button> */}

          <button
            className="twitch__button"
            onClick={event => {
              this.addToFavourites(this.state.twitchQuery);
            }}
          >
            Add to favourites
          </button>

          {/* List gamer's twitch favourite streams and make them clickable links*/}
          {userAuthState ? <h2>Favourites </h2> : null}
          <ul>
            {twitchFavourite.map(currentFavourite => (
              <a
                href="#"
                className="game__anchor"
                //className="twitch__anchor"
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
        </div>

        <div className="twitch__video">
          <iframe
            className="twitch__player"
            src={`http://player.twitch.tv/?channel=${this.state.twitchQuery}`}
            allowFullScreen="true"
          />
        </div>

        <div className="twitch__streamers">
          <h3 className="twitch__streamers--title">Top 5 Live Streams</h3>

          <ul>
            {topTwitchers.map(currentTwitch => {
              return (
                <a href="#" key={currentTwitch.id} className="twitch__anchor">
                  <li
                    onClick={event => {
                      this.handleClick(currentTwitch.display_name);
                    }}
                    className="twitch__list"
                  >
                    <img
                      className="twitch_streamers--image"
                      src={currentTwitch.profile_image_url}
                    />
                    <p className="twitch_streamers--name">
                      {currentTwitch.display_name}
                    </p>
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
        <footer className="twitch__footer">Powered by Twitch API</footer>
        {/* </div> */}
      </div>
    );
  }
}

export default TwitchSearch;
