import React from "react";
import Search from "../components/Search";

class HomeRoute extends React.Component {
  render() {
    return (
      <div className="home">
        <div>Home goes here</div>
        <Search />
      </div>
    );
  }
}

export default HomeRoute;
