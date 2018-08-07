import { connect } from "react-redux";
import Search from "../components/Search";
import {
  fetchGameInfoFromAPI,
  fetchGenreData,
  fetchThemeData,
  addFavouriteToDB
} from "../actions";

const mapStateToProps = reduxState => {
  console.log("Gamer Favourite info in Search Container ", reduxState.favouriteInfo)

  return {
    gameData: reduxState.gameInfo,
    themeData: reduxState.themeInfo,
    genreData: reduxState.genreInfo,
    userAuthState: reduxState.authState,
    favouriteData: reduxState.favouriteInfo

  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReferenceData: () => {
      dispatch(fetchGenreData()), dispatch(fetchThemeData());
    },

    fetchGameInfo: searchGame => {
      dispatch(fetchGameInfoFromAPI(searchGame));
    },
    addToFavourite: (favInfo) => {
      dispatch(addFavouriteToDB(favInfo))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
