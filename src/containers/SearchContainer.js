import { connect } from "react-redux";
import Search from "../components/Search";
import { fetchGameInfoFromAPI, fetchReferenceData } from "../actions";

const mapStateToProps = (reduxState) => {
  console.log("redux gameData", reduxState.gameInfo)
  return {
    gameData: reduxState.gameInfo,
    themeData: reduxState.themeInfo,
    genreData: reduxState.genreInfo
  };
};

const mapDispatchToProps = dispatch => {

  return {
    fetchGameInfo: (searchGame) => {
      dispatch(fetchReferenceData(`genres`)),
        dispatch(fetchReferenceData(`themes`)),
        dispatch(fetchGameInfoFromAPI(searchGame))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);