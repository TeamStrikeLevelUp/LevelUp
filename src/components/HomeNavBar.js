import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/components/navbar.scss";
import "../../styles/index.scss";
import introJs from "intro.js";


class HomeNavBar extends React.Component {
  constructor() {
    super()

    this.intro = this.intro.bind(this);
  }

  intro() {
    if (this.props.introTrigger) {
      introJs().start();
    }
  }

  render() {
    const { userAuthState } = this.props;

    // intro tour starter function
    this.intro();
    return (

      <ul className="main-nav">
        <li className="main-nav__item">
          <NavLink data-tooltipClass="animated tada homepage-tour" data-step="1" data-intro="Check out our homepage to find the hottest content on the site today." className="main-nav__item" activeClassName="is-active" to="/homepage">Home</NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink data-tooltipClass="animated fadeIn homepage-tour" data-step="2" data-intro="Search for your favourite games here. You'll find ratings, trailers and much more." className="main-nav__item" activeClassName="is-active" to="/search">Search Games</NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink data-tooltipClass="animated bounceIn homepage-tour" data-step="3" data-intro="Wondering whats trending in the industry? Check out the latest news right here." className="main-nav__item" activeClassName="is-active" to="/news">Level Up News</NavLink>
        </li>

        <li className="main-nav__item">
          <NavLink data-tooltipClass="animated lightSpeedIn homepage-tour" data-step="4" data-intro="Fancy yourself decent at the world's most popular game? Compare your skills with the best of the rest in The Fort." className="main-nav__item" activeClassName="is-active" to="/the-fort">The Fort</NavLink>
        </li>

        <li className="main-nav__item">
          <NavLink data-tooltipClass="animated rotateIn homepage-tour" data-step="5" data-intro="See what the Level Up community is talking about in our forums. Find the latest tips, secrets, and opinions straight from our vibrant community." className="main-nav__item" activeClassName="is-active" to="/forum">Community</NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink data-tooltipClass="animated zoomIn homepage-tour" data-step="6" data-intro="Not sure whether to buy that latest game? Decide by seeing them in action, live, played around the world on Twitch here." className="main-nav__item" activeClassName="is-active" to="/twitch">Twitch</NavLink>
        </li>
        <li className="main-nav__item">
          {userAuthState.userId ?
            <NavLink className="main-nav__item" activeClassName="is-active" to="/dashboard">Dashboard</NavLink> : null}
        </li>

        <li className="main-nav__item">
          {!userAuthState.userId ?
            <a href="/login">Log In</a> : null}
        </li>
        <li className="main-nav__item">
          {!userAuthState.userId ?
            <a data-tooltipClass="animated infinite pulse homepage-tour" data-step="7" data-intro="Liked what you saw? What are you waiting for! Sign up here and start levelling up!" href="/signup">Sign Up</a> : null}
        </li>
        <li className="main-nav__item">
          {userAuthState.userId ?
            <a href="/logout">Logout</a> : null}
        </li>
      </ul>
    );
  }
}

export default HomeNavBar;
