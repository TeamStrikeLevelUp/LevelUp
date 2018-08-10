import React from "react";

import "../../styles/components/fortnite.scss";
import "../../styles/index.scss";

function FortniteUser1({ ninja }) {

  if (!ninja.totals) return null;
  return (
    <ul className="playerlist__wrapper">
      <li className="playerlist__player">
        <h2>{ninja.username}</h2>
        <h3>{ninja.platform.toUpperCase()}</h3>
        <p className="playlist__player--stats" >Solo 1st Places: {ninja.stats.placetop1_solo}</p>
        <p className="playlist__player--stats">Total Wins: {ninja.totals.wins}</p>
        <p className="playlist__player--stats">Total Score: {ninja.totals.score}</p>
      </li>
    </ul>
  )
}

export default FortniteUser1;