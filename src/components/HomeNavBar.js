import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/navbar.scss";
import "../../styles/index.scss";

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
          <Link to="/forum">Community</Link>
        </li>
        <li>
          <Link to="/twitch">Twitch Streams</Link>
        </li>
        <li>
          <Link to="/dashboard">Profile</Link>
        </li>
        <li>
          <Link to="/signup">Log In/Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomeNavBar;
