import { connect } from "react-redux";
import Search from "../components/Search";
import {
  fetchGameInfoFromAPI,
  fetchGenreData,
  fetchThemeData
} from "../actions";

const mapStateToProps = reduxState => {
  console.log("redux gameData", reduxState.gameInfo);
  return {
    gameData: reduxState.gameInfo,
    themeData: reduxState.themeInfo,
    genreData: reduxState.genreInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGameInfo: searchGame => {
      dispatch(fetchGenreData()),
        dispatch(fetchThemeData()),
        dispatch(fetchGameInfoFromAPI(searchGame));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
