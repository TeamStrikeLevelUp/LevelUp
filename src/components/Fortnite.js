import React from "react";
import FortniteStats from "./FortniteStats";
import FortnitePlayerList from "./FortnitePlayerList";

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
          <div className="fortnite__title-container">
            <h1 className="fortnite__title">Welcome to The Fort</h1>
            <h3 className="fortnite__title-tagline">How Fortified are you?</h3>
            <h4 className="fortnite__title-para">Compare your scores with the best players around!</h4>
          </div>
          <div className="fortnite__option">
            <form className="fortnite__option-form" onSubmit={this.handleSubmit}>
              <input className="fortnite__option-input" onChange={this.handleChange} type="search" value={this.state.searchUser} placeholder="Search username..." />
              <button className="fortnite__button">Search</button>
            </form>
          </div>
          <div>
            <FortniteStats stat={this.props.fortniteData} />
          </div>
        </div>
        <div className="fortnite__playerlist">
          <FortnitePlayerList />
        </div>
      </div>
    );
  }
}

export default Fortnite;
