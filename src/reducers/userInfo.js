function userInfo(reduxState = [], action) {
  switch (action.type) {
    case "RECEIVE_USERDATA":
      return action.payload;

    default:
      return reduxState;
  }
}

export default userInfo;
