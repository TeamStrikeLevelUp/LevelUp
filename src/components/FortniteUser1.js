import React from "react";

import "../../styles/components/fortnite.scss";
import "../../styles/index.scss";

class FortniteUser1 extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.fetchFortniteStats(event)
  }

  render() {
    if (!this.props.ninja.totals) return null;
    return (
      <ul className="playerlist__wrapper">
        <li className="playerlist__player">
          <h2 className="hover" onClick={(event) => this.handleClick(event.target.innerText)}>{this.props.ninja.username}</h2>
          <h3>{this.props.ninja.platform.toUpperCase()}</h3>
          <p className="playlist__player--stats" >Solo 1st Places: {this.props.ninja.stats.placetop1_solo}</p>
          <p className="playlist__player--stats">Total Wins: {this.props.ninja.totals.wins}</p>
          <p className="playlist__player--stats">Total Score: {this.props.ninja.totals.score}</p>
        </li>
      </ul>
    )
  }
}

export default FortniteUser1;