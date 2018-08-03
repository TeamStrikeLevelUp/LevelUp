import { connect } from "react-redux";
import Forums from "../components/Forums"


const mapStateToProps = (reduxState, ownProps) => {
    return {
      match: ownProps.match,
    userAuthState: reduxState.authState
    };
  };

export default connect(
    mapStateToProps,
    null
  )(Forums);