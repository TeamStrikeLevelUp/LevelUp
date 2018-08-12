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
)(HomeNavBar);