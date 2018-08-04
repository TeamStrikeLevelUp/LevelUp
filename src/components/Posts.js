import React from "react";

class Posts extends React.Component {
  constructor() {
    super();
   this.state={replies:[],post:{}, input:"", title:"", body:""}
   this.inputHandler=this.inputHandler.bind(this);
    this.searchHandler=this.searchHandler.bind(this);
    this.titleHandler=this.titleHandler.bind(this);
    this.bodyHandler=this.bodyHandler.bind(this);
    this.replyHandler=this.replyHandler.bind(this)
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

  titleHandler(event){
    this.setState({title:event.target.value})
  }

  bodyHandler(event){
    this.setState({body:event.target.value})
  }

  replyHandler(event){
    event.preventDefault();

    if(!this.props.userAuthState){
      alert("login first");
      return;
    }
    
    const newPost={
      title:this.state.title,
      body:this.state.body,
      parent_id:this.props.match.params.id,
      forum_id:this.state.post.forum_id,
      gamer_id:this.props.userAuthState.userId,
      gamer_name:this.props.userAuthState.username
    }

    fetch("/api/reply", {
      method: "post",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(json => this.setState({replies:json}) )



      this.setState({body:"",title:""})
  }

 

  render() {
    
    if(!this.state.post.id) return null
    let created= String(new Date(this.state.post.created)).substring(0,24)
    return (
      <div>
       <h3> Topic: {this.state.post.title} </h3>
       <h3> {this.state.post.body} </h3>
       <h3> Date Posted: {created} </h3>
       <h3> Posted By: {this.state.post.gamer_name} </h3>

      <form>
        <input placeholder="search for replies" value={this.state.input} onChange={this.inputHandler} />
       <button onClick={this.searchHandler}> search </button>
        </form>


      {this.state.replies.map(reply => {
        let date= String(new Date(reply.created)).substring(0,24)
        return (
          <div key={reply.id}>
        <p>Reply to "{this.state.post.title}": </p>
        <p>Title: {reply.title}</p>
        <p>{reply.body}</p>
        <p>Date Posted: {date}</p>
        </div>
      )
      })}

      <div className={this.props.userAuthState ? "" : "hidden"} > login to reply </div>

      <form className= {this.props.userAuthState ? "hidden" : ""}>
      <input placeholder="title" value={this.state.title} onChange={this.titleHandler} />
      <input placeholder="body" value={this.state.body} onChange={this.bodyHandler} />
      <button onClick={this.replyHandler}> reply </button>
      </form>
        
      </div>
    );
  }
}

export default Posts;
