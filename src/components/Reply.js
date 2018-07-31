import React from "react";

class Reply extends React.Component {

    constructor() {
        super();
      }

    render(){
        return(
            <div>
            <p> {this.props.reply.title} : {this.props.reply.body} </p>
             </div>
        )
    }
}



export default Reply;