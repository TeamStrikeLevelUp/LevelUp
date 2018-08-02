import { combineReducers } from "redux";
import gameInfo from "./gameInfo";
import themeInfo from "./themeInfo";
import genreInfo from "./genreInfo";
import authState from "./authState";

export default combineReducers({
  gameInfo,
  themeInfo,
  genreInfo,
  authState
});
