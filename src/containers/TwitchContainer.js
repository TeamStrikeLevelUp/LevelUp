import { connect } from "react-redux";
import TwitchSearch from "../components/TwitchSearch";
import {
  addFavTwitchToDB, fetchTwitchFavourite, fetchTopTwitchers
} from "../actions";

const mapStateToProps = reduxState => {
  console.log("twitch faves in twitch container", reduxState.twitchFavourite)

  return {

    userAuthState: reduxState.authState,
    twitchFavourite: reduxState.twitchFavourite

  };
};

const mapDispatchToProps = dispatch => {

  return {
    addToFavourite: (favInfo) => {
      dispatch(addFavTwitchToDB(favInfo)) //This might need to be different
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

