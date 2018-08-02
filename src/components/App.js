import React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import HomeRoute from "../routes/HomeRoute";
import SearchContainer from "../containers/SearchContainer";
import Forums from "./Forums";
import Posts from "./Posts";
import ForumLinks from "./ForumLinks";

// import Header from "./Header";
import DashboardRoute from "../routes/DashboardRoute";
// import NavBar from "./NavBar";
// import Main from "./Main";
// import Footer from "./Footer";

import "../../static/styles/index.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Level Up !</h1>
        <Switch>
          <Route exact path="/homepage" render={() => <HomeRoute />} />
          <Route exact path="/search" render={() => <SearchContainer />} />
          <Route exact path="/dashboard" render={() => <DashboardRoute />} />
          <Route path="/forum/:id" component={Forums} />
          <Route path="/posts/:id" component={Posts} />
          <Route path="/forum" render={() => <ForumLinks />} />
        </Switch>
      </div>
    );
  }
}

export default App;
