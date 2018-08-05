import { connect } from "react-redux";
import News from "../components/News";
import { fetchNewsInfoFromAPI, searchNewsAPI } from "../actions";

const mapStateToProps = reduxState => {
  return {
    newsData: reduxState.newsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNewsData: pageNum => {
      dispatch(fetchNewsInfoFromAPI(pageNum));
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
