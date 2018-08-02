import { connect } from "react-redux";
import News from "../components/News";
import { fetchNewsInfoFromAPI } from "../actions";

const mapStateToProps = reduxState => {
  console.log(reduxState.newsData);
  return {
    newsData: reduxState.newsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewsData: () => {
      dispatch(fetchNewsInfoFromAPI());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
