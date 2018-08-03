import React from "react";
import { Link } from "react-router-dom";
import "../../static/styles/components/navbar.scss";
import "../../static/styles/index.scss";

function HomeNavBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        <li>
          <Link to="/search">Search Games</Link>
        </li>
        <li>
          <Link to="/news">Gaming News</Link>
        </li>
        <li>
          <Link to="/forum">Community</Link>
        </li>
        <li>
          <Link to="/twitch">Twitch Me</Link>
        </li>
        <li>
          <Link to="/top-games">Top Games</Link>
        </li>
        <li>
          <Link to="/dashboard">Profile</Link>
        </li>
        <li>
          <a href="/signup">Log In/Sign Up</a>
          d6d0fd37ff5697603da7d3c3523f1a5535295940
        </li>
      </ul>
    </div>
  );
}

export default HomeNavBar;
