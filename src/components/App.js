import React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import Search from "./Search";
import HomeRoute from "../routes/HomeRoute";
import Forums from "./Forums";
import Posts from "./Posts"
import ForumLinks from "./ForumLinks";

// import NavBar from "./NavBar";
// import Main from "./Main";
// import Footer from "./Footer";

import '../../static/styles/index.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Level Up n00bs!</h1>
        <Switch>
          <Route exact path="/" render={() => <HomeRoute />} />
          <Route path="/search" render={() => <Search />} />
          <Route path="/forum/:id" component={Forums} />
          <Route path="/posts/:id" component={Posts} />
          <Route path="/forum" render={() => <ForumLinks  />} />
        </Switch>
      </div>
    );
  }
}

export default App;
