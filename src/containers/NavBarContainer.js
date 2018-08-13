import { connect } from "react-redux";
import HomeNavBar from "../components/HomeNavBar";

const mapStateToProps = reduxState => {
  return {
    userAuthState: reduxState.authState,
    introTrigger: reduxState.introTrigger
  };
};


export default connect(
  mapStateToProps,
  null,
  null,
  {
    // https://github.com/reduxjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
    pure: false
  }
)(HomeNavBar);