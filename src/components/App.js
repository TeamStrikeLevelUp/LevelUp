import React from "react";
import { Switch, Route } from "react-router-dom";

import Forums from "./Forums";
import Posts from "./Posts";

import Header from "../components/Header";

import HomeRoute from "../routes/HomeRoute";
import TwitchRoute from "../routes/TwitchRoute";
import SearchGamesRoute from "../routes/SearchGamesRoute";
import ForumsRoute from "../routes/ForumsRoute";
import DashboardRoute from "../routes/DashboardRoute";
import PostsContainer from "../containers/PostsContainer";

import "../../styles/index.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/homepage" render={() => <HomeRoute />} />
          <Route path="/search" render={() => <SearchGamesRoute />} />
          <Route path="/dashboard" render={() => <DashboardRoute />} />
          <Route path="/twitch" render={() => <TwitchRoute />} />

          <Route path="/forum/:id" component={Forums} />
          <Route path="/posts/:id" component={PostsContainer} />
          <Route path="/forum" render={() => <ForumsRoute />} />
        </Switch>
      </div>
    );
  }
}

export default App;
