import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/components/navbar.scss";
import "../../styles/index.scss";

class HomeNavBar extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { userAuthState } = this.props;
    return (

      <ul className="main-nav">
        <li className="main-nav__item">
          <Link to="/homepage">Home</Link>
        </li>
        <li className="main-nav__item">
          <NavLink activeClassName="is active" to="/search">Search Games</NavLink>
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
          {!userAuthState ?
            <a href="/login">Log In</a> : null}
        </li>
        <li className="main-nav__item">
          {!userAuthState ?
            <a href="/signup">Sign Up</a> : null}
        </li>
        <li className="main-nav__item">
          {userAuthState ?
            <Link to="/logout">Logout</Link> : null}
        </li>
      </ul>
    );
  }
}

export default HomeNavBar;
