import { connect } from "react-redux";
import TwitchSearch from "../components/TwitchSearch";
import {
  addFavTwitchToDB, fetchTwitchFavourite, fetchTopTwitchers
} from "../actions";

const mapStateToProps = reduxState => {

  // console.log("twitchers in container", reduxState.topTwitchers)
  return {
    userAuthState: reduxState.authState,
    twitchFavourite: reduxState.twitchFavourite,
    topTwitchers: reduxState.topTwitchers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToFavourite: (favInfo) => {
      dispatch(addFavTwitchToDB(favInfo))
    },
    fetchTwitchFavourites: (userId) => {
      dispatch(fetchTwitchFavourite(userId))
    },
    fetchTopTwitchers: () => { dispatch(fetchTopTwitchers()) }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwitchSearch);

