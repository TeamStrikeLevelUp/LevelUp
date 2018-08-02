import React from "react";

class Posts extends React.Component {
  constructor() {
    super();
   this.state={replies:[],post:{}, input:""}
   this.inputHandler=this.inputHandler.bind(this);
    this.searchHandler=this.searchHandler.bind(this);
  }

  componentDidMount(){
    fetch(`/api/reply/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(json => this.setState({replies: json}));

    fetch(`/api/parentpost/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(json => this.setState({post:json}) );

  }


  inputHandler(event){
    this.setState({input:event.target.value})
  }

  searchHandler(event){
    event.preventDefault();

    fetch(`/api/reply/${this.props.match.params.id}/search/${this.state.input}`)
      .then(response => response.json())
      .then(json => this.setState({replies:json}));


  }

 

  render() {
    console.log(this.props.userAuthState)
    if(!this.state.post.id) return null
     
    return (
      <div>
       <h3> Topic: {this.state.post.title} </h3>
       <h3> {this.state.post.body} </h3>
       <h3> Date Posted: {this.state.post.created} </h3>

      <form>
        <input placeholder="search for replies" value={this.state.input} onChange={this.inputHandler} />
       <button onClick={this.searchHandler}> search </button>
        </form>


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
