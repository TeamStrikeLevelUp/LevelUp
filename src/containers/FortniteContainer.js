import { connect } from "react-redux";
import Fortnite from "../components/Fortnite";
import { fetchFortniteStats, setFortniteStats } from "../actions"

const mapStateToProps = reduxState => {
  return {
    fortniteData: reduxState.fortniteStats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFortniteStats: (searchUser) => {
      dispatch(fetchFortniteStats(searchUser))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fortnite)
