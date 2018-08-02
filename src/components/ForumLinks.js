import React from "react";
import {Link} from 'react-router-dom';

class ForumLinks extends React.Component {
  constructor() {
    super();
    this.state = { forums: [] };
  }

  // componentDidMount() {
  //   fetch(`/api/forum`)
  //     .then(response => response.json())
  //     .then(json => this.setState({ forums: json }));
  // }

  render() {
    
    return (
      <div>
        {this.props.forums.map((forum, index) => {
         return (
         <div key={forum.id}>
             <Link  to={`/forum/${forum.id}`}>{forum.title}</Link>
        </div>
            
        )
        })}
      </div>
    );
  }
}

export default ForumLinks;
