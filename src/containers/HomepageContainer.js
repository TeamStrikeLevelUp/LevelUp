import { connect } from "react-redux";
import Homepage from "../components/Homepage"


const mapStateToProps = (reduxState) => {
    return {
    userAuthState: reduxState.authState
    };
  };

export default connect(
    mapStateToProps,
    null
  )(Homepage);