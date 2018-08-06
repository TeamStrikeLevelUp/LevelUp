function favouriteInfo(reduxState = {}, action) {

  switch (action.type) {
    case "RECEIVE_FAVOURITEDATA":

      return action.payload;

    default:
      return reduxState;
  }
}

export default favouriteInfo;
