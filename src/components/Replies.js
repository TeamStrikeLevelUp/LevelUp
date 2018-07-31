import React from "react";
import Reply from "./Reply";

class Replies extends React.Component {
  constructor() {
    super();
  }

 

  render() {
      if(!this.props.replies[0]) return null
    return (
      <div>
       {this.props.replies.map((reply, index)=>{
           return(
               <Reply key={index} reply={reply} />
           )
       })}
        
      </div>
    );
  }
}

export default Replies;
