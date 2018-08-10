function gameToSearch(reduxState = "", action) {
    switch (action.type) {
      case "SEARCH_CLICKED_GAME":
        return action.payload;
      default:
        return reduxState;
    }
  }
  
  export default gameToSearch;