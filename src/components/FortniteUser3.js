import React from "react";

import "../../styles/components/fortnite.scss";
import "../../styles/index.scss";

class FortniteUser3 extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.fetchFortniteStats(event)
  }

  render() {
    if (!this.props.terry5L.totals) return null
    return (
      <ul className="playerlist__wrapper">
        <li className="playerlist__player">
          <h2 className="hover" onClick={(event) => this.handleClick(event.target.innerText)}>{this.props.terry5L.username}</h2>
          <h3>{this.props.terry5L.platform.toUpperCase()}</h3>
          <p className="playlist__player--stats">Solo 1st Places: {this.props.terry5L.stats.placetop1_solo}</p>
          <p className="playlist__player--stats">Total Wins: {this.props.terry5L.totals.wins}</p>
          <p className="playlist__player--stats">Total Score: {this.props.terry5L.totals.score}</p>
        </li>
      </ul>
    )
  }
}


export default FortniteUser3;