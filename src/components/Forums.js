import React from "react";
import {Link} from 'react-router-dom';


class Forums extends React.Component {
  constructor() {
    super();
    this.state = { forum: {}, posts:[] };
  }

  componentDidUpdate(prevProps){
    //   console.log("next",this.props)
    //   console.log("prev",prevProps)

  }

  componentDidMount() {


    fetch(`/api/forum/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(json => this.setState({forum:json}));


      fetch(`/api/post/${this.props.match.params.id}`)
        .then(response => response.json())
        .then(json => this.setState({posts:json}));
  }

  render() {
     
    if(!this.state.forum.id) return null
    return (
      <div>
          <p>Title: {this.state.forum.title}</p>
          <p>Category: {this.state.forum.category}</p>

          {this.state.posts.map((post, index) => {
         return (
         <div key={post.id}>
             <Link  to={`/posts/${post.id}`}>{post.title}</Link>
        </div>
            
        )
        })}
        
      </div>
    );
  }
}

export default Forums;
