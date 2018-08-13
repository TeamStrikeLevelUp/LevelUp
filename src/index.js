import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { BrowserRouter } from "react-router-dom";

import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; //Redux chrome ext
import { Provider } from "react-redux";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  { authState: initialUser },
  composeWithDevTools(applyMiddleware(thunkMiddleware))
); //Redux chrome extension :)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
