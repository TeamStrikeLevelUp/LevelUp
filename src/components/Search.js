import React from "react";

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
    })
  }

  render() {

    const { gameData } = this.props;

    return (
      <div>
        <h1>Find your Game here</h1>

        <br />
        <form className="search__form" id="search__form" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            className="search__text"
            id="search__text"
            autoComplete="off"
            value={this.state.searchGame}
            placeholder="Enter game title search"
          />
        </form>
        <br />

        <ul>

          {gameData !== undefined ?
            gameData.map(game => {
              return (
                <li key={game.igdbId}>
                  <img src={game.cover_img} />
                  <br />
                  <h2>{game.name}</h2>
                  <p>{game.description}</p>
                  About:
                <h4>User Rating:         {game.user_rating}</h4>
                  <h4>Critics Rating:      {game.critic_rating}
                  </h4>
                  <h4>Genres:{game.genres}</h4>
                  <h4>Themes: {game.themes}</h4>
                  {game.screenshot ? (game.screenshot).map(currentImg => {

                    return <img src={currentImg} key={currentImg} />

                  }) : null}


                  <br />
                </li>
              )
            }
            ) : null}

        </ul>
      </div>
    )
  }
}

export default Search;
