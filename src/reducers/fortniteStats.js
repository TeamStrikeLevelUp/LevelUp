function fortniteStats(reduxState = {}, action) {
  switch (action.type) {
    case "RECEIVE_FORTNITE_DATA":
      return action.payload;

    default:
      return reduxState;
  }
}

export default fortniteStats;