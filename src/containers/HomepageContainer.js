import { connect } from "react-redux";
import Homepage from "../components/Homepage"
import {setTwitchStreamer, fetchTopTwitchers} from "../actions";


const mapStateToProps = (reduxState) => {
    return {
    userAuthState: reduxState.authState,
    twitchStreamer: reduxState.twitchStreamer,
    topTwitchers: reduxState.topTwitchers
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
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