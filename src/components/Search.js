import React from "react";
import Game from "./Game";


class Search extends React.Component {

  constructor() {
    super();

    this.state = {
      searchGame: "",
      gameInfo: []
    };

    this.getGameData = this.getGameData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.getreviews()
  // }

  getGameData() {
    const searchPath = "/games/" + this.state.searchGame;
    fetch(searchPath, {
      method: 'GET',
      mode: 'cors',
      headers: {
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log('review info ', json.body) //NAUGHTY CONSOLE LOG HERE
        this.setState({ gameInfo: json.body });

      }).catch(error => {
        console.log("Sorry the following error occurred: ", error)
        alert("Sorry not found, try again")
      });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      searchGame: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.getGameData();
    this.setState({
      searchGame: ""
    })
  }

  render() {


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

          {this.state.gameInfo.map(game => {
            return (
              <li key={game.id}>
                <img src={game.cover.url} />
                <br />
                <h2>{game.name}</h2>
                <p>{game.summary}</p>
                About:
                <h4>User Rating:         {Math.round(game.rating)}</h4>
                <h4>Critics Rating:      {Math.round(game.aggregated_rating)}
                </h4>
                {/* <p>Alternate name: {game.alternative_names.map(name => name)}</p> */}
                <p>Genres:{game.genres}</p>
                <p>Themes: {game.themes}</p>
                <p>Game Modes: {game.game_modes}</p>
                {/* Screenshot: {game.screenshots} */}

                <br />
              </li>
            )
          }
          )}

        </ul>
      </div>
    )
  }
}

export default Search;
