import React from "react";
import TwitchSearch from "./TwitchSearch";

class TwitchContainer extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <TwitchSearch />
      </div>
    );
  }
}

export default TwitchContainer;
