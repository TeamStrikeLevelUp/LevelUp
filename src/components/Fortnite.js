import React from "react";
import FortniteStats from "./FortniteStats";

import "../../styles/components/fortnite.scss";
import "../../styles/index.scss";

class Fortnite extends React.Component {
  constructor() {
    super();

    this.state = {
      searchUser: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchUser: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchFortniteStats(this.state.searchUser)
    this.setState({
      searchUser: ""
    })
  }


  render() {
    return (
      <div className="fortnite">
        <div className="fortnite__search">
          <div className="fortnite__title">
            <h2>Welcome to The Fort</h2>
            <p>How Fortified are you?</p>
            <h4>Check and compare your scores with the best players around!</h4>
          </div>
          <div className="fortnite__option">
            <form className="" onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} type="search" value={this.state.searchUser} placeholder="Search username..." />
              <button>Search</button>
            </form>
          </div>
          <div className="fortnite__userstats">
            <FortniteStats stat={this.props.fortniteData} />
          </div>
        </div>
        <div className="fortnite__playerlist">
          <ul>
            <li>
              <p>Ninja</p>
            </li>
            <li>
              <p>Fnatic_Ettnix</p>
            </li>
            <li>
              <p>Terry 5L</p>
            </li>
            <li>
              <p>dondottah571</p>
            </li>
            <li>
              <p>ViniciusAmazing</p>
            </li>
            <li>
              <p>JeDiiiKniiGhT</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Fortnite;