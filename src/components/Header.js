import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <img src="/static/images/logo.png" className="header__logo-image" />
      </div>
      <div className="header__logo-2">
        <img src="/static/images/logo2.png" className="header__logo-image-2" />
      </div>
    </div>
  );
}

export default Header;
