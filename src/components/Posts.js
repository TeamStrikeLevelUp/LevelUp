import React from "react";

class Posts extends React.Component {
  constructor() {
    super();
   this.state={replies:[],post:{}}
  }

  componentDidMount(){
    fetch(`/api/reply/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(json => this.setState({replies: json}));

    fetch(`/api/parentpost/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(json => this.setState({post:json}) );

//this.setState({post: json})
  }

 

  render() {
    if(!this.state.post.id) return null
     
    return (
      <div>
       <h3> Topic: {this.state.post.title} </h3>
       <h3> {this.state.post.body} </h3>
       <h3> Date Posted: {this.state.post.created} </h3>
      {this.state.replies.map(reply => {
        return (
          <div key={reply.id}>
        <p>Reply to "{this.state.post.title}": </p>
        <p>Title: {reply.title}</p>
        <p>{reply.body}</p>
        <p>Date Posted: {reply.created}</p>
        </div>
      )
      })}
        
      </div>
    );
  }
}

export default Posts;
