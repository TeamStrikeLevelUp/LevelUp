function gameInfo(reduxState = [], action) {

  switch (action.type) {
    case "RECEIVE_GAMEDATA":

      return action.payload;

    default:
      return reduxState;
  }
}

export default gameInfo;
