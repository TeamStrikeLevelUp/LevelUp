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
      <li>
        <Link to="/news">Gaming News</Link>
      </li>

      <li>
        <Link to="/top-games">Top Games</Link>
      </li>

      <li className="main-nav__item">
        <Link to="/forum">Community</Link>
      </li>
      <li className="main-nav__item">
        <Link to="/twitch">Twitch Streams</Link>
      </li>
      <li className="main-nav__item">
        <Link to="/dashboard">Profile</Link>
      </li>
      <li>
        <a href="/signup">Log In/Sign Up</a>
      </li>
    </ul>
  );
}

export default HomeNavBar;
