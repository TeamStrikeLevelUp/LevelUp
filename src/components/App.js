import React from "react";
import SearchContainer from "../containers/SearchContainer";
// import Header from "./Header";
// import NavBar from "./NavBar";
// import Main from "./Main";
// import Footer from "./Footer";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Level Up</h1>
        <br />
        <br />
        <SearchContainer />
      </div>
    );
  }
}

export default App;
