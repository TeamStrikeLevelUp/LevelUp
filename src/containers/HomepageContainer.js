import { connect } from "react-redux";
import Homepage from "../components/Homepage"
import { setTwitchStreamer, fetchTopTwitchers, triggerIntro } from "../actions";


const mapStateToProps = (reduxState) => {
  return {
    userAuthState: reduxState.authState,
    twitchStreamer: reduxState.twitchStreamer,
    topTwitchers: reduxState.topTwitchers,
    introTrigger: reduxState.introTrigger
  };
};

const mapDispatchToProps = dispatch => {
  return {
    triggerIntro: () => {
      dispatch(triggerIntro())
    },
    setTwitchStreamer: (streamer) => {
      dispatch(setTwitchStreamer(streamer))
    },
    fetchTopTwitchers: () => { dispatch(fetchTopTwitchers()) }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);