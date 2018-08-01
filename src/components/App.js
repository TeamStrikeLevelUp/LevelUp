import React from "react";
import SearchContainer from "../containers/SearchContainer";
// import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import HomeRoute from "../routes/HomeRoute";
// import NavBar from "./NavBar";
// import Main from "./Main";
// import Footer from "./Footer";

// import '../../static/styles/index.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Level Up n00bs!</h1>
        <Switch>
          <Route exact path="/" render={() => <HomeRoute />} />
          <Route exact path="/search" render={() => <SearchContainer />} />
        </Switch>
      </div>
    );
  }
}

export default App;
