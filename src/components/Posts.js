import React from "react";
import Post from "./Post";

class Posts extends React.Component {
  constructor() {
    super();
   
  }

 

  render() {
      if(!this.props.posts[0]) return null
    return (
      <div>
       {this.props.posts.map((post, index)=>{
           return(
               <Post key={index} post={post} />
           )
       })}
        
      </div>
    );
  }
}

export default Posts;
