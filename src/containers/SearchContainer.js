import { connect } from "react-redux";
import Search from "../components/Search";
import {
  fetchGameInfoFromAPI,
  fetchGenreData,
  fetchThemeData,
  addFavouriteToDB,
  fetchGameFavourite,
  searchClickedGame
} from "../actions";

const mapStateToProps = reduxState => {
  return {
    gameData: reduxState.gameInfo,
    themeData: reduxState.themeInfo,
    genreData: reduxState.genreInfo,
    userAuthState: reduxState.authState,
    gameFavourite: reduxState.gameFavourite,
    gameToSearch: reduxState.gameToSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReferenceData: () => {
      dispatch(fetchGenreData());
      dispatch(fetchThemeData());
    },

    fetchGameInfo: searchGame => {
      dispatch(fetchGameInfoFromAPI(searchGame));
    },
    addToFavourite: (favInfo) => {
      dispatch(addFavouriteToDB(favInfo))
    },
    fetchGameFavourites: (userId) => {
      dispatch(fetchGameFavourite(userId))
    },
    searchClickedGame: (game) => {
      dispatch(searchClickedGame(game))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
