import { combineReducers } from "redux";
import gameInfo from "./gameInfo";
import themeInfo from "./themeInfo";
import genreInfo from "./genreInfo";
import newsInfo from "./newsInfo";
import authState from "./authState";
import fortniteStats from "./fortniteStats";
import userInfo from "./userInfo";
import gameFavourite from "./gameFavourite";
import twitchFavourite from "./twitchFavourite";
import topTwitchers from "./topTwitchers";
import twitchStreamer from "./twitchStreamer";

export default combineReducers({
  gameInfo,
  themeInfo,
  genreInfo,
  newsInfo,
  authState,
  fortniteStats,
  userInfo,
  gameFavourite,
  twitchFavourite,
  topTwitchers,
  twitchStreamer
});
