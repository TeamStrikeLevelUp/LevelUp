import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/navbar.scss";
import "../../styles/index.scss";

function HomeNavBar() {
  return (
    <ul className="main-nav">
      <li className="main-nav__item">
        <Link to="/homepage">Home</Link>
      </li>
      <li className="main-nav__item">
        <Link to="/search">Search Games</Link>
      </li>
      <li className="main-nav__item">
        <Link to="/news">Gaming News</Link>
      </li>

      <li className="main-nav__item">
        <Link to="/the-fort">The Fort</Link>
      </li>

      <li className="main-nav__item">
        <Link to="/forum">Community</Link>
      </li>
      <li className="main-nav__item">
        <Link to="/twitch">Twitch</Link>
      </li>
      <li className="main-nav__item">
        <Link to="/dashboard">Profile</Link>
      </li>
      <li className="main-nav__item">
        <a href="/login">Log In</a>
      </li>
      <li className="main-nav__item">
        <a href="/signup">Sign Up</a>
      </li>
      <li className="main-nav__item">
        <Link to="/logout">Logout</Link>
      </li>
    </ul>
  );
}

export default HomeNavBar;
