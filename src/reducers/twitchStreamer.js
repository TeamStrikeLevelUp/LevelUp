function twitchStreamer(reduxState = "Shroud", action) {
    switch (action.type) {
      case "SET_TWITCH_STREAMER":
        return action.payload;
      default:
        return reduxState;
    }
  }
  
  export default twitchStreamer;