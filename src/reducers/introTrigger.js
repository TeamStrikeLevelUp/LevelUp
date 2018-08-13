function introTrigger(reduxState = false, action) {
  switch (action.type) {
    case "TRIGGER_INTRO":
      return action.payload;
    default:
      return reduxState;
  }
}

export default introTrigger;