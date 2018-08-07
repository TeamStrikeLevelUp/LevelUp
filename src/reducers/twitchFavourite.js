function twitchFavourite(reduxState = [], action) {

  switch (action.type) {
    case "RECEIVE_TWITCHFAVOURITES":
      console.log("reducer", action.payload)
      return action.payload;

    default:
      return reduxState;
  }
}

export default twitchFavourite;
