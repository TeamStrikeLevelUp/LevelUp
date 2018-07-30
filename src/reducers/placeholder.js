function placeholder(reduxState = {}, action) {
  switch (action.type) {
    case "RECEIVE_PLACEHOLDER":
      return action.placeholder;

    default:
      return reduxState;
  }
}

export default placeholder;
