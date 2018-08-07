function gameFavourite(reduxState = [], action) {

  switch (action.type) {
    case "RECEIVE_GAMEFAVOURITES":

      return action.payload;

    default:
      return reduxState;
  }
}

export default gameFavourite;
