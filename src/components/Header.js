import React from "react";
import HomeNavBar from "../components/HomeNavBar";
import "../../styles/components/header.scss";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <h2>Leve1Up</h2>
        <HomeNavBar />
      </div>
    </div>
  );
}

export default Header;
