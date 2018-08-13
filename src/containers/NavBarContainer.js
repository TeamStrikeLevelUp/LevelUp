import { connect } from "react-redux";
import HomeNavBar from "../components/HomeNavBar";
import { tourOff } from "../actions";

const mapStateToProps = reduxState => {
  return {
    userAuthState: reduxState.authState,
    introTrigger: reduxState.introTrigger
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleBlur: () => dispatch(tourOff())
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    // https://github.com/reduxjs/react-redux/blob/master/docs/troubleshooting.md#my-views-arent-updating-when-something-changes-outside-of-redux
    pure: false
  }
)(HomeNavBar);