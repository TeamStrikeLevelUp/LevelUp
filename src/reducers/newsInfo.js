function newsInfo(reduxState = [], action) {
  switch (action.type) {
    case "RECEIVE_NEWSDATA":
      return action.payload;
    default:
      return reduxState;
  }
}

export default newsInfo;
