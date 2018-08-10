import React from "react";

import "../../styles/components/fortnite.scss";
import "../../styles/index.scss";

function FortniteUser2({ viniciusAmazing }) {
  if (!viniciusAmazing.totals) return null
  return (
    <ul className="playerlist__wrapper">
      <li className="playerlist__player">
        <h2>{viniciusAmazing.username}</h2>
        <h3>{viniciusAmazing.platform.toUpperCase()}</h3>
        <p>Solo 1st Places: {viniciusAmazing.stats.placetop1_solo}</p>
        <p>Total Wins: {viniciusAmazing.totals.wins}</p>
        <p>Total Score: {viniciusAmazing.totals.score}</p>
      </li>
    </ul >
  )
}


export default FortniteUser2;