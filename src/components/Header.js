import React from "react";
import "../../styles/components/header.scss";
import NavBarContainer from "../containers/NavBarContainer";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <h2>Level Up</h2>
        <NavBarContainer />
      </div>
    </div>
  );
}

export default Header;
