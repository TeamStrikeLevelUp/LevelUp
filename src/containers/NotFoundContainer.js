import { connect } from "react-redux";
import NotFound from "../components/NotFound";

const mapStateToProps = reduxState => {
  return {
    userAuthState: reduxState.authState
  };
};

export default connect(
  mapStateToProps,
  null
)(NotFound);
