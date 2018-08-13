import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/components/navbar.scss";
import "../../styles/index.scss";

class HomeNavBar extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { userAuthState } = this.props;
    return (
      <ul className="main-nav">
        <li className="main-nav__item">
          <NavLink
            className="main-nav__item"
            activeClassName="is-active"
            to="/homepage"
          >
            Home
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink
            className="main-nav__item"
            activeClassName="is-active"
            to="/search"
          >
            Search Games
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink
            className="main-nav__item"
            activeClassName="is-active"
            to="/news"
          >
            Gaming News
          </NavLink>
        </li>

        <li className="main-nav__item">
          <NavLink
            className="main-nav__item"
            activeClassName="is-active"
            to="/the-fort"
          >
            The Fort
          </NavLink>
        </li>

        <li className="main-nav__item">
          <NavLink
            className="main-nav__item"
            activeClassName="is-active"
            to="/forum"
          >
            Community
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink
            className="main-nav__item"
            activeClassName="is-active"
            to="/twitch"
          >
            Twitch
          </NavLink>
        </li>
        <li className="main-nav__item">
          {userAuthState ? (
            <NavLink
              className="main-nav__item"
              activeClassName="is-active"
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          ) : null}
        </li>

        <li className="main-nav__item">
          {!userAuthState ? <a href="/login">Log In</a> : null}
        </li>
        <li className="main-nav__item">
          {!userAuthState ? <a href="/signup">Sign Up</a> : null}
        </li>
        <li className="main-nav__item">
          {userAuthState ? <a href="/logout">Logout</a> : null}
        </li>
      </ul>
    );
  }
}

export default HomeNavBar;
