import React from "react";
import "../../static/styles/components/search.scss";
import "../../static/styles/index.scss";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchGame: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const gameDisplay = gameData.map(game => {
      return (
        <li key={game.igdbId} className="search__result">
          <img src={game.cover_img} className="search__img--cover" />
          <div className="search__details">
            <header className="search__details--name">{game.name}</header>
            {game.description !== "" || game.description !== undefined ? (
              <p>{game.description}</p>
            ) : null}

            {game.user_rating ? (
              <header className="search__details--ratings">
                Gamer Rating: {game.user_rating}%
              </header>
            ) : null}

            {game.critic_rating ? (
              <header className="search__details--ratings">
                Critics Rating: {game.critic_rating}%
              </header>
            ) : null}

            {game.genres ? (
              <header className="search__details--ratings">
                Genre: {game.genres}
              </header>
            ) : null}

            {game.themes ? (
              <header className="search__details--ratings">
                Theme: {game.themes}
              </header>
            ) : null}
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

    return (
      <div>
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
            placeholder="🔍 Search"
          />
        </form>
        <br />

        <ul className="search">{gameDisplay}</ul>
      </div>
    );
  }
}

export default Search;
