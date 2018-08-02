import { connect } from "react-redux";
import Posts from "../components/Posts"


const mapStateToProps = (reduxState, ownProps) => {
    return {
      match: ownProps.match,
    userAuthState: reduxState.authState
    };
  };

export default connect(
    mapStateToProps,
    null
  )(Posts);