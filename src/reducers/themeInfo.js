function themeInfo(reduxState = [], action) {

  switch (action.type) {
    case "RECEIVE_THEMEDATA":
      return action.payload;

    default:
      return reduxState;
  }
}

export default themeInfo;
