import React from "react";

import "../../../styles/components/fortnite.scss";
import "../../../styles/index.scss";

class FortniteUser2 extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.fetchFortniteStats(event)
  }

  render() {
    if (!this.props.viniciusAmazing.totals) return null
    return (
      <ul className="playerlist__wrapper">
        <li className="playerlist__player">
          <h2 className="hover" onClick={(event) => this.handleClick(event.target.innerText)}>{this.props.viniciusAmazing.username}</h2>
          <h3>{this.props.viniciusAmazing.platform.toUpperCase()}</h3>
          <p className="playlist__player--stats">Solo 1st Places: {this.props.viniciusAmazing.stats.placetop1_solo}</p>
          <p className="playlist__player--stats">Total Wins: {this.props.viniciusAmazing.totals.wins}</p>
          <p className="playlist__player--stats">Total Score: {this.props.viniciusAmazing.totals.score}</p>
        </li>
      </ul>
    )
  }
}


export default FortniteUser2;