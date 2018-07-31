import React from "react";

class Forum extends React.Component {
  constructor() {
    super();
  }

  handleClick(event) {

    fetch(`/api/post/${this.props.forum.id}`)
        .then(response => response.json())
        .then(json => console.log(json));

  }

  render() {
    return (
      <div>
        <p onClick={() => this.handleClick(this.props.forum.id)}>
          {this.props.forum.title}
        </p>
      </div>
    );
  }
}

export default Forum;
