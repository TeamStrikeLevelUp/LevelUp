import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import HomeRoute from "../routes/HomeRoute";
import SearchContainer from "../containers/SearchContainer";
import NewsContainer from "../containers/NewsContainer";
import Header from "../components/Header";
import TwitchRoute from "../routes/TwitchRoute";
import SearchGamesRoute from "../routes/SearchGamesRoute";
import ForumsRoute from "../routes/ForumsRoute";
import DashboardRoute from "../routes/DashboardRoute";
import NewsRoute from "../routes/NewsRoute";
import TopGamesRoute from "../routes/TopGamesRoute";
import PostsContainer from "../containers/PostsContainer";
import ForumsContainer from "../containers/ForumsContainer";
import Profile from "../components/Profile";

import "../../styles/index.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/homepage" render={() => <HomeRoute />} />
          <Route exact path="/search" render={() => <SearchContainer />} />
          <Route exact path="/news" render={() => <NewsContainer />} />
          <Route path="/dashboard" render={() => <DashboardRoute />} />
          <Route path="/forum/:id" component={ForumsContainer} />
          <Route path="/search" render={() => <SearchGamesRoute />} />
          <Route path="/twitch" render={() => <TwitchRoute />} />
          <Route path="/posts/:id" component={PostsContainer} />
          <Route path="/forum" render={() => <ForumsRoute />} />
          <Route path="/news" render={() => <NewsRoute />} />
          <Route path="/top-games" render={() => <TopGamesRoute />} />
          <Route path="/profile/:id" component={Profile} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
