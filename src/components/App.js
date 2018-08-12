import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import HomeRoute from "../routes/HomeRoute";
import NewsContainer from "../containers/NewsContainer";
import Header from "../components/Header";
import TwitchRoute from "../routes/TwitchRoute";
import SearchGamesRoute from "../routes/SearchGamesRoute";
import ForumsRoute from "../routes/ForumsRoute";
import DashboardRoute from "../routes/DashboardRoute";
import NewsRoute from "../routes/NewsRoute";
import FortniteRoute from "../routes/FortniteRoute";
import PostsContainer from "../containers/PostsContainer";
import ForumsContainer from "../containers/ForumsContainer";
import Profile from "../components/Profile";
import ProfileContainer from "../containers/ProfileContainer";
import NotFoundContainer from "../containers/NotFoundContainer";

import "../../styles/index.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <HomeRoute />} />
          <Route exact path="/homepage" render={() => <HomeRoute />} />
          <Route exact path="/search" render={() => (
            <SearchGamesRoute />)} />
          <Route exact path="/news" render={() => <NewsContainer />} />
          <Route path="/dashboard" render={() => <DashboardRoute />} />
          <Route path="/forum/:id" component={ForumsContainer} />
          <Route path="/search" render={() => <SearchGamesRoute />} />
          <Route path="/twitch" render={() => <TwitchRoute />} />
          <Route path="/posts/:id" component={PostsContainer} />
          <Route path="/forum" render={() => <ForumsRoute />} />
          <Route path="/news" render={() => <NewsRoute />} />
          <Route path="/the-fort" render={() => <FortniteRoute />} />
          <Route path="/retroclub" render={() => <RetroRoute />} />
          <Route path="/profile/:id" component={ProfileContainer} />
          <Route component={NotFoundContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
