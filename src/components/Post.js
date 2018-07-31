import React from "react";
import Replies from "./Replies";

class Post extends React.Component {
  constructor() {
    super();
   this.state={replies:[]}
  }

 handleClick(){

    fetch(`/api/reply/${this.props.post.id}`)
    .then(response => response.json())
    .then(json => this.setState({replies:json}));
 }

  render() {
    return (
      <div>
       <h3 onClick={() => this.handleClick(this.props.post.id)} > 
       {this.props.post.title} : {this.props.post.body} </h3>

       <Replies replies={this.state.replies} />
        
      </div>
    );
  }
}

export default Post;
