import { connect } from "react-redux";
import Profile from "../components/Profile"
import {setTwitchStreamer, searchClickedGame} from "../actions";


const mapStateToProps = (reduxState, ownProps) => {
    return {
    twitchStreamer: reduxState.twitchStreamer,
    gameToSearch: reduxState.gameToSearch,
    props: ownProps
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      setTwitchStreamer: (streamer) => {
        dispatch(setTwitchStreamer(streamer))
      },
      searchClickedGame: (game) => {
        dispatch(searchClickedGame(game))
      }
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile);