import React from "react";
import Forum from "./Forum";

class Forums extends React.Component{

    constructor() {
        super();
        this.state={forums:[]}
      }

      componentDidMount(){

        fetch(`api/forum`)
        .then(response => response.json())
        .then(json => this.setState({forums:json}));

      }


    render(){
        if (!this.state.forums[0]) return null;
        return(
            <div>
                {this.state.forums.map((forum,index)=>{
                    return (
                        <Forum key={forum.id} forum={forum} />
                    )
                })}
            </div>
        )
    }
}

export default Forums;