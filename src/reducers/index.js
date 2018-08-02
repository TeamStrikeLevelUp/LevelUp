import { combineReducers } from "redux";
import gameInfo from "./gameInfo";
import themeInfo from "./themeInfo";
import genreInfo from "./genreInfo";
import newsInfo from "./newsInfo";

export default combineReducers({
  gameInfo,
  themeInfo,
  genreInfo,
  newsInfo
});
