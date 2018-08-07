import { connect } from "react-redux";
import TwitchSearch from "../components/TwitchSearch";
import {
  addFavTwitchToDB, fetchTwitchFavourite
} from "../actions";

const mapStateToProps = reduxState => {

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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwitchSearch);

