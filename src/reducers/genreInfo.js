function genreInfo(reduxState = [], action) {

  switch (action.type) {
    case "RECEIVE_GENREDATA":
      return action.payload;

    default:
      return reduxState;
  }
}

export default genreInfo;
