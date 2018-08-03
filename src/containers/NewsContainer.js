import { connect } from "react-redux";
import News from "../components/News";
import { fetchNewsInfoFromAPI, searchNewsAPI } from "../actions";

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
    },
    searchNewsData: searchTerm => {
      dispatch(searchNewsAPI(searchTerm));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
