import React from "react";
import { Switch, Route } from "react-router-dom";
import Search from "./Search";
import HomeRoute from "../routes/HomeRoute";

import "../../static/styles/index.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Level Up n00bs!</h1>
        <Switch>
          <Route exact path="/homepage" render={() => <HomeRoute />} />
          {/* <Route exact path="/search" render={() => <Search />} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
