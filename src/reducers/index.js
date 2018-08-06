import { combineReducers } from "redux";
import gameInfo from "./gameInfo";
import themeInfo from "./themeInfo";
import genreInfo from "./genreInfo";
import newsInfo from "./newsInfo";
import authState from "./authState";
import userInfo from "./userInfo";
import favouriteInfo from "./favouriteInfo";

export default combineReducers({
  gameInfo,
  themeInfo,
  genreInfo,
  newsInfo,
  authState,
  userInfo,
  favouriteInfo
});
