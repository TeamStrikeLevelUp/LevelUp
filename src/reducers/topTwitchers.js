function topTwitchers(reduxState = [], action) {
  //topTwitchers is an array of objects with following keys:
  // {broadcaster_type,description,display_name,id,login,offline_image_url,profile_image_url,type,view_count}
  switch (action.type) {
    case "RECEIVE_TOPTWITCHERS":

      return action.payload;

    default:
      return reduxState;
  }
}

export default topTwitchers;
