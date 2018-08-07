import React from "react";

function FortniteStats({ stat }) {
  if (!stat.totals) return null
  console.log(stat);

  return (
    <ul>
      <li key={stat.uid}>
        <h3>{stat.username}</h3>
        <h5>{stat.platform.toUpperCase()}</h5>
        <img src={stat.stats.hoursplayed >= 250 ? "/static/images/fortnite-high-level.jpeg" : "/static/images/fortnite-low-level.jpeg"} />
        <h4>Solo Skills</h4>
        <p>1st Place Finishes: {stat.stats.placetop1_solo}</p>
        <p>Top 10 Finishes: {stat.stats.placetop10_solo}</p>
        <p>Solo Kills: {stat.stats.kills_solo}</p>
        <h4>Total Skills</h4>
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