import React from "react";

import "../../styles/components/fortnite.scss";
import "../../styles/index.scss";

function FortniteUser3({ terry5L }) {
  if (!terry5L.totals) return null
  return (
    <ul className="playerlist__wrapper">
      <li className="playerlist__player">
        <h2>{terry5L.username}</h2>
        <h3>{terry5L.platform.toUpperCase()}</h3>
        <p>Solo 1st Places: {terry5L.stats.placetop1_solo}</p>
        <p>Total Wins: {terry5L.totals.wins}</p>
        <p>Total Score: {terry5L.totals.score}</p>
      </li>
    </ul>
  )
}



export default FortniteUser3;