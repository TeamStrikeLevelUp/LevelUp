import { connect } from "react-redux";
import Search from "../components/Search";
import {
  fetchGameInfoFromAPI,
  fetchGenreData,
  fetchThemeData,
  addFavouriteToDB,
  fetchGameFavourite
} from "../actions";

const mapStateToProps = reduxState => {
  return {
    gameData: reduxState.gameInfo,
    themeData: reduxState.themeInfo,
    genreData: reduxState.genreInfo,
    userAuthState: reduxState.authState,
    gameFavourite: reduxState.gameFavourite

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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
