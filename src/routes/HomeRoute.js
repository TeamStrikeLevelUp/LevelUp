import React from "react";
import Search from "../components/Search";
import TwitchContainer from "../components/TwitchContainer";

class HomeRoute extends React.Component {
  render() {
    return (
      <div className="home">
        <div>Home goes here</div>
        <Search />
        <TwitchContainer />
      </div>
    );
  }
}

export default HomeRoute;
