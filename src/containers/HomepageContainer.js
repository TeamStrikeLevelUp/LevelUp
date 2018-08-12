import { connect } from "react-redux";
import Homepage from "../components/Homepage"
import {setTwitchStreamer, fetchTopTwitchers, searchClickedGame} from "../actions";


const mapStateToProps = (reduxState) => {
    return {
    userAuthState: reduxState.authState,
    twitchStreamer: reduxState.twitchStreamer,
    topTwitchers: reduxState.topTwitchers,
    gameToSearch: reduxState.gameToSearch
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      setTwitchStreamer: (streamer) => {
        dispatch(setTwitchStreamer(streamer))
      },
      fetchTopTwitchers: () => { dispatch(fetchTopTwitchers()) },
      searchClickedGame: (game) => {
        dispatch(searchClickedGame(game))
      }
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Homepage);