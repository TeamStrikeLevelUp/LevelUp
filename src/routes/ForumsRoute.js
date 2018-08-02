import React from "react";
import ForumLinks from "../components/ForumLinks";
import ForumSearch from "../components/ForumSearch";
import { Switch, Link, Route } from "react-router-dom";

class ForumsRoute extends React.Component {
  render() {
    return (
      <div>
        <ForumLinks />
      </div>
    );
  }
}

export default ForumsRoute;
