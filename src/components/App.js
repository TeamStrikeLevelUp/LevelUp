import React from "react";
import Search from "./Search";
// import Header from "./Header";
// import NavBar from "./NavBar";
// import Main from "./Main";
// import Footer from "./Footer";

import '../../static/styles/index.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Level Up n00bs!</h1>
        <br />
        <br />
        <Search />
      </div>
    );
  }
}

export default App;
