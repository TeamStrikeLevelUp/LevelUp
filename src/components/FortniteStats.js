import React from "react";

import "../../styles/components/fortnite.scss";
import "../../styles/index.scss";

function FortniteStats({ stat }) {
  if (!stat.totals) return null
  console.log(stat);

  return (
    <ul>
      <li className="fortnite__userstats" key={stat.uid}>
        <h3>{stat.username}</h3>
        <h5>{stat.platform.toUpperCase()}</h5>
        <img src={stat.stats.hoursplayed >= 250 ? "/static/images/fortnite-high-level.jpeg" : "/static/images/fortnite-low-level.jpeg"} />
        <h2 className="fortnite__userstats--titles">Solo Stats</h2>
        <p>1st Place Finishes: {stat.stats.placetop1_solo}</p>
        <p>Solo Kills: {stat.stats.kills_solo}</p>
        <h2 className="fortnite__userstats--titles">Duo Stats</h2>
        <p>1st Place Finishes: {stat.stats.placetop1_duo}</p>
        <p>Duo Kills: {stat.stats.kills_duo}</p>
        <h2 className="fortnite__userstats--titles">Squad Stats</h2>
        <p>1st Place Finishes: {stat.stats.placetop1_squad}</p>
        <p>Squad Kills: {stat.stats.kills_squad}</p>
        <h2 className="fortnite__userstats--titles">Total Skills</h2>
        <p>Total Kills: {stat.totals.kills}</p>
        <p>Total Wins: {stat.totals.wins}</p>
        <p>Total Matches: {stat.totals.matchesplayed}</p>
        <p>Total Hours: {stat.totals.hoursplayed}</p>
        <p>Win rate: {stat.totals.winrate}</p>
        <p>Total Score: {stat.totals.score}</p>
      </li>
    </ul>
  )
}

export default FortniteStats;