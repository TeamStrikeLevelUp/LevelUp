import React from "react";
import "../../styles/components/search.scss";
import "../../styles/index.scss";
import SearchGallery from "./SearchGallery";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchGame: "",
      showPopup: false
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToFavourites = this.addToFavourites.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startUpSearch = this.startUpSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchReferenceData();
    if (this.props.userAuthState) {
      if (this.props.fetchGameFavourites !== undefined) {
        this.props.fetchGameFavourites(this.props.userAuthState.userId);
        // console.log(this.props.gameFavourite);
      }
    }
    this.startUpSearch();
  }

  //toggle screenshot popup on and off
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  //fetches game ID when a user clicks on a favourite (because API won't return title reliably)
  handleClick(event) {
    this.setState(
      {
        searchGame: event.target.value
      },
      () => this.props.fetchGameInfo("/gameid/" + this.state.searchGame)
    );
    //
  }

  startUpSearch() {
    this.props.fetchGameInfo(
      "/games/" + this.props.gameToSearch.replace(/[^\w\s]/gi, "").toLowerCase()
    );
    this.props.searchClickedGame("");
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      searchGame: event.target.value
    });
  }

  //Search for game based on user's typed input
  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchGameInfo(
      "/games/" + this.state.searchGame.replace(/[^\w\s]/gi, "").toLowerCase()
    );
    this.setState({
      searchGame: ""
    });
  }

  addToFavourites(gameId, gameTitle, gameImage) {
    if (this.props.userAuthState.userId) {
      const newFav = {
        gamerId: this.props.userAuthState.userId,
        igdb: gameId,
        title: gameTitle,
        cover: gameImage
      };

      this.props.addToFavourite(newFav);
      this.props.fetchGameFavourites(this.props.userAuthState.userId);
    } else {
      alert("Please log in to select favourites"); //Change to message on screen
    }
  }

  render() {
    const { gameData, userAuthState, gameFavourite } = this.props;
    const gameDisplay =
      gameData === "No results found" ? (
        <div className="search__result">
          <div className="search__details">{gameData}</div>
        </div>
      ) : (
        gameData.map(game => {
          return (
            <li key={game.igdbId} className="search__result">
              <header className="search__details--name">{game.name}</header>

              {/* <div className="search__result" > */}
              <div className="search__LHS">
                <img src={game.cover_img} className="search__img--cover" />
                <button
                  className="search__details--button"
                  onClick={event => {
                    this.addToFavourites(
                      game.igdbId,
                      game.name,
                      game.cover_img
                    );
                  }}
                >
                  Add to favourites
                </button>
              </div>

              <div className="search__RHS">
                {/* <div className="search__details"> */}
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
                        Theme:
                        <span className="search__rating">{game.themes}</span>
                      </header>
                    ) : null}
                  </div>

                  {game.video ? (
                    <iframe
                      className="search__video"
                      src={game.video + "autoPlay=0"}
                      allowFullScreen
                      autostart="false"
                    />
                  ) : null}
                </div>

                {/* </div> */}
              </div>
              <div className="search__screenshots">
                {game.screenshot
                  ? game.screenshot.map(currentImg => {
                      return (
                        <img
                          src={currentImg}
                          key={currentImg}
                          width="100"
                          onClick={this.togglePopup}
                        />
                      );
                    })
                  : null}
              </div>
              {this.state.showPopup ? (
                <SearchGallery closePopup={this.togglePopup} game={gameData} />
              ) : null}
              {/* </div> */}
            </li>
            // {/* </div> */}
          );
        })
      );
    const displayStatus = userAuthState ? (
      <div>
        <img src={userAuthState.avatar} className="search__avatar" />
        <p>{userAuthState.username} </p>
      </div>
    ) : (
      "You are not logged in"
    );

    return (
      <div className="search__body">
        {/* <div className="search"> */}
        <div className="search__side">
          {displayStatus}
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

          {userAuthState ? <h3>Favourites </h3> : null}
          <ul>
            {gameFavourite.map(currentFavourite => (
              <a
                href="#"
                className="game__anchor"
                key={currentFavourite.igdb_id}
              >
                <li
                  className="search__list"
                  onClick={this.handleClick}
                  key={currentFavourite.title}
                  value={currentFavourite.igdb_id}
                >
                  {currentFavourite.title}
                </li>
              </a>
            ))}
          </ul>
        </div>
        <ul className="search__wrapper">{gameDisplay}</ul>
        <footer className="search__footer">Powered by IGDB.com API</footer>
        {/* </div> */}
      </div>
    );
  }
}

export default Search;
