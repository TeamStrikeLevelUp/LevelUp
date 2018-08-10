import React from "react";
import "../../styles/components/search.scss";
import "../../styles/index.scss";

import Carousel from "nuka-carousel";
// import SearchGallery from "./SearchGallery";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchGame: "",
      count: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToFavourites = this.addToFavourites.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchReferenceData();
    if (this.props.userAuthState) {
      if (this.props.fetchGameFavourites !== undefined) {
        this.props.fetchGameFavourites(this.props.userAuthState.userId);
      }
    }
  }
  // handleClick(event) {
  //   this.setState({
  //     searchGame: event.target.innerText
  //   }, () => this.handleSubmit(event))
  // }
  handleChange(event) {
    event.preventDefault();
    this.setState({
      searchGame: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchGameInfo("/games/" + this.state.searchGame);
    console.log("/games/" + this.state.searchGame);
    this.setState({
      searchGame: ""
    });
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1
    });
  }

  addToFavourites(gameId, gameTitle) {
    if (this.props.userAuthState) {
      const newFav = {
        gamerId: this.props.userAuthState.userId,
        igdb: gameId,
        title: gameTitle
      };

      this.props.addToFavourite(newFav);
      this.props.fetchGameFavourites(this.props.userAuthState.userId);
    } else {
      alert("Please log in to select favourites");
    }
  }
  render() {
    const { gameData, userAuthState, gameFavourite } = this.props;
    console.log(this.props.gameData);
    const gameDisplay =
      gameData === "No results found" ? (
        <div className="search__result">
          <div className="search__details">{gameData}</div>
        </div>
      ) : (
        gameData.map(game => {
          return (
            <li key={game.igdbId} className="search__result">
              <div className="search__img">
                <img src={game.cover_img} className="search__img--cover" />
                <button
                  className="search__details--button"
                  onClick={event => {
                    this.addToFavourites(game.igdbId, game.name);
                  }}
                >
                  Add to favourites
                </button>
              </div>
              <div className="search__details">
                <header className="search__details--name">{game.name}</header>

                {game.description !== "" || game.description !== undefined ? (
                  <p className="search__desc">{game.description}</p>
                ) : null}
                <div className="search__box">
                  <div className="search__info">
                    {game.user_rating ? (
                      <header className="search__details--ratings">
                        Gamer Rating:
                        <span className="search__rating">
                          {game.user_rating}%
                        </span>
                      </header>
                    ) : null}

                    {game.critic_rating ? (
                      <header className="search__details--ratings">
                        Critic Rating:
                        <span className="search__rating">
                          {game.critic_rating}%
                        </span>
                      </header>
                    ) : null}

                    {game.genres ? (
                      <header className="search__details--ratings">
                        Genre:
                        <span className="search__rating">{game.genres}</span>
                      </header>
                    ) : null}

                    {game.themes ? (
                      <header className="search__details--ratings">
                        Theme:<span className="search__rating">
                          {game.themes}
                        </span>
                      </header>
                    ) : null}
                  </div>

                  <div className="search__video">
                    {game.video ? (
                      <iframe
                        width="560"
                        height="315"
                        src={game.video + "autoPlay=0"}
                        frameBorder="0"
                        allowFullScreen
                        autostart="false"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="search__screenshots">{imagesArr}</div>

              <br />
            </li>
          );
        })
      );
    const displayStatus = userAuthState
      ? "Welcome Gamer " + userAuthState.userId
      : "You are not logged in";
    return (
      <div className="search__body">
        <div className="search">
          {displayStatus}
          <br />
          <form className="search__form" onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              type="search"
              results="0"
              alt="Game Search"
              className="search__input"
              autoComplete="off"
              value={this.state.searchGame}
              placeholder="Search games"
            />
          </form>

          {userAuthState ? <h2>Favourites </h2> : null}
          <ul>
            {gameFavourite.map(currentFavourite => (
              <a href="#" className="game__anchor" key={currentFavourite.title}>
                {" "}
                <li key={currentFavourite.title}>
                  {/* //onClick={this.handleClick}> */}

                  {currentFavourite.title}
                </li>
              </a>
            ))}
          </ul>

          <br />
          <ul className="search__wrapper">{gameDisplay}</ul>
          <footer className="search__footer">Powered by IGDB.com API</footer>
        </div>
      </div>
    );
  }
}

export default Search;

// {game.screenshot
//   ? game.screenshot.map(currentImg => {
//     return <img src={currentImg} key={currentImg} />;
//   })
//   : null}
