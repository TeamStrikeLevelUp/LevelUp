import React from "react";

import "../../../styles/components/fortnite.scss";
import "../../../styles/index.scss";

function FortniteStats({ stat }) {
  if (!stat.totals) return null;
  console.log(stat.totals.hoursplayed)
  return (
    <ul className="fortnite__ul">
      <li className="fortnite__userstats" key={stat.uid}>
        <h3 className="fortnite__userstats--username">{stat.username}</h3>
        <h5 className="fortnite__userstats--platform">{stat.platform.toUpperCase()}</h5>
        <img className="fortnite__userstats--image" src={stat.totals.hoursplayed >= 250 ? "/static/images/fortnite-good2__gif.gif" : "/static/images/fortnite-bad__gif.gif"} />
        <br />
        <br />
        <h2 className="fortnite__userstats--titles">Solo Stats</h2>
        <p className="fortnite__userstats--stats">1st Place Finishes: {stat.stats.placetop1_solo}</p>
        <p className="fortnite__userstats--stats">Solo Kills: {stat.stats.kills_solo}</p>
        <br />
        <h2 className="fortnite__userstats--titles">Duo Stats</h2>
        <p className="fortnite__userstats--stats">1st Place Finishes: {stat.stats.placetop1_duo}</p>
        <p className="fortnite__userstats--stats">Duo Kills: {stat.stats.kills_duo}</p>
        <br />
        <h2 className="fortnite__userstats--titles">Squad Stats</h2>
        <p className="fortnite__userstats--stats">1st Place Finishes: {stat.stats.placetop1_squad}</p>
        <p className="fortnite__userstats--stats">Squad Kills: {stat.stats.kills_squad}</p>
        <br />
        <h2 className="fortnite__userstats--titles">Total Skills</h2>
        <p className="fortnite__userstats--stats">Total Kills: {stat.totals.kills}</p>
        <p className="fortnite__userstats--stats">Total Wins: {stat.totals.wins}</p>
        <p className="fortnite__userstats--stats">Total Matches: {stat.totals.matchesplayed}</p>
        <p className="fortnite__userstats--stats">Total Hours: {stat.totals.hoursplayed}</p>
        <p className="fortnite__userstats--stats">Win rate: {stat.totals.winrate}</p>
        <p className="fortnite__userstats--stats">Total Score: {stat.totals.score}</p>
      </li>
    </ul>
  )
}

export default FortniteStats;