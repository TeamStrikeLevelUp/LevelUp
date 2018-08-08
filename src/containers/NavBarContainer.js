import { connect } from "react-redux";
import HomeNavBar from "../components/HomeNavBar";

const mapStateToProps = reduxState => {
  return {
    userAuthState: reduxState.authState,
  };
};


export default connect(
  mapStateToProps,
)(HomeNavBar);