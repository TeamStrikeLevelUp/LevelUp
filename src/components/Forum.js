import React from "react";
import Posts from "./Posts";

class Forum extends React.Component {
  constructor() {
    super();
    this.state={posts:[]}
  }

  handleClick() {

    fetch(`/api/post/${this.props.forum.id}`)
        .then(response => response.json())
        .then(json => this.setState({posts:json}));

  }

  render() {
    return (
      <div>
        <h2 onClick={() => this.handleClick(this.props.forum.id)}>
          {this.props.forum.title}
        </h2>
        <Posts posts={this.state.posts} />

      </div>
    );
  }
}

export default Forum;
