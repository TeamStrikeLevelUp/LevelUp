import React from "react";
import ForumLinks from "../components/ForumLinks";
import { Switch, Link, Route } from "react-router-dom";


class ForumsRoute extends React.Component {
  constructor() {
    super();
    this.state = { input:"", forums: [] };
    this.inputHandler=this.inputHandler.bind(this);
    this.searchHandler=this.searchHandler.bind(this);
  }

  componentDidMount() {
    fetch(`/api/forum`)
      .then(response => response.json())
      .then(json => this.setState({ forums: json }));
  }


  inputHandler(event){
    this.setState({input:event.target.value})
  }

  searchHandler(event){
    event.preventDefault();

    fetch(`/api/forum/search/${this.state.input}`)
      .then(response => response.json())
      .then(json => this.setState({ forums: json }));


  }

  render() {
    return (
      <div>
        <form>
        <input placeholder="search for game" value={this.state.input} onChange={this.inputHandler} />
       <button onClick={this.searchHandler}> search </button>
        </form>
       
        <ForumLinks forums={this.state.forums} />
      </div>
    );
  }
}

export default ForumsRoute;
