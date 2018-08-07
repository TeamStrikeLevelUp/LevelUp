function twitchFavourite(reduxState = [], action) {

  switch (action.type) {
    case "RECEIVE_TWITCHFAVOURITES":

      return action.payload;

    default:
      return reduxState;
  }
}

export default twitchFavourite;
