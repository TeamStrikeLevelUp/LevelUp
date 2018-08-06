import React from "react";
import "../../styles/components/search.scss";
import "../../styles/index.scss";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchGame: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchReferenceData();
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      searchGame: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchGameInfo("/games/" + this.state.searchGame);
    this.setState({
      searchGame: ""
    });
  }

  render() {
    const { gameData } = this.props;
    const gameDisplay =
      gameData === "No results found"
        ? gameData
        : gameData.map(game => {
          return (
            <li key={game.igdbId} className="search__result">
              <img src={game.cover_img} className="search__img--cover" />
              <div className="search__details">
                <header className="search__details--name">{game.name}</header>
                {game.description !== "" || game.description !== undefined ? (
                  <p>{game.description}</p>
                ) : null}
                <div className="search__box">
                  <div className="search__info">
                    {game.user_rating ? (
                      <header className="search__details--ratings">
                        Gamer Rating:{" "}
                        <span className="search__rating">
                          {game.user_rating}%
                          </span>
                      </header>
                    ) : null}

                    {game.critic_rating ? (
                      <header className="search__details--ratings">
                        Critic Rating:{" "}
                        <span className="search__rating">
                          {game.critic_rating}%
                          </span>
                      </header>
                    ) : null}

                    {game.genres ? (
                      <header className="search__details--ratings">
                        Genre:{" "}
                        <span className="search__rating">{game.genres}</span>
                      </header>
                    ) : null}

                    {game.themes ? (
                      <header className="search__details--ratings">
                        Theme:<span className="search__rating">
                          {" "}
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
                        src={game.video}
                        frameBorder="0"
                        allowFullScreen
                        autostart="false"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="search__details--screenshots">
                {game.screenshot
                  ? game.screenshot.map(currentImg => {
                    return <img src={currentImg} key={currentImg} />;
                  })
                  : null}
              </div>
              <br />
            </li>
          );
        });
    const displayStatus = this.props.userAuthState ? "youre logged in!" : "youre not logged in"
    return (

      <div className="search__body">
        {displayStatus}
        <br />
        <form
          className="search__form"
          id="search__form"
          onSubmit={this.handleSubmit}
        >
          <input
            onChange={this.handleChange}
            type="search"
            results="0"
            alt="Search"
            className="search__input"
            id="search__text"
            autoComplete="off"
            value={this.state.searchGame}
            placeholder="🔍 Search Game Info"
          />
        </form>
        <br />
        <ul className="search">{gameDisplay}</ul>
        <footer className="search__footer">Powered by IGDB.com API</footer>
      </div>
    );
  }
}

export default Search;
