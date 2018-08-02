import React from "react";
import ForumLinks from "../components/ForumLinks";
import ForumSearch from "../components/ForumSearch";
import { Switch, Link, Route } from "react-router-dom";


class ForumsRoute extends React.Component {
  constructor() {
    super();
    this.state = { input:"", forums: [] };
    this.inputHandler=this.inputHandler.bind(this)
  }

  componentDidMount() {
    fetch(`/api/forum`)
      .then(response => response.json())
      .then(json => this.setState({ forums: json }));
  }


  inputHandler(event){
    this.setState({input:event.target.value})
    console.log(this.state.input)
  }

  searchHandler(event){
    event.preventDefault();
    
  }

  render() {
    return (
      <div>
        <form>
        <input placeholder="search for game" value={this.state.input} onChange={this.inputHandler} />
       <button> search </button>
        </form>
       
        <ForumLinks forums={this.state.forums} />
      </div>
    );
  }
}

export default ForumsRoute;
