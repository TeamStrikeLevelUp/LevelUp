import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import {
  tourOff,
  setTwitchStreamer,
  fetchTopTwitchers,
  searchClickedGame,
  triggerIntro
} from "../actions";

const mapStateToProps = reduxState => {
  return {
    userAuthState: reduxState.authState,
    twitchStreamer: reduxState.twitchStreamer,
    topTwitchers: reduxState.topTwitchers,
    introTrigger: reduxState.introTrigger,
    gameToSearch: reduxState.gameToSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    triggerIntro: () => {
      dispatch(triggerIntro());
    },
    setTwitchStreamer: streamer => {
      dispatch(setTwitchStreamer(streamer));
    },
    fetchTopTwitchers: () => {
      dispatch(fetchTopTwitchers());
    },
    searchClickedGame: game => {
      dispatch(searchClickedGame(game));
    },
    handleBlur: () => dispatch(tourOff())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
