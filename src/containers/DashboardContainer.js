import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";
import {
  receiveAuthState,
  fetchGamerInfo,
  receiveUserData,
  fetchTwitchFavourite,
  fetchGameFavourite,
  searchClickedGame,
  setTwitchStreamer
} from "../actions/index";

const mapStateToProps = reduxState => {
  return {
    userAuthState: reduxState.authState,
    userDataStore: reduxState.userData,
    favouriteData: reduxState.favouriteInfo,
    twitchFavourite: reduxState.twitchFavourite,
    gameFavourite: reduxState.gameFavourite,
    gameToSearch: reduxState.gameToSearch,
    twitchStreamer: reduxState.twitchStreamer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthState: user => dispatch(receiveAuthState(user)),
    setUserData: userData => dispatch(receiveUserData(userData)),
    fetchGamerInfo: gamerId => dispatch(fetchGamerInfo(gamerId)),
    fetchTwitchFavourite: userId => dispatch(fetchTwitchFavourite(userId)),
    fetchGameFavourite: userId => dispatch(fetchGameFavourite(userId)),
    searchClickedGame: game => dispatch(searchClickedGame(game)),
    setTwitchStreamer: (streamer) => 
        dispatch(setTwitchStreamer(streamer))
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    // https://github.com/reduxjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
    pure: false
  }
)(Dashboard);
