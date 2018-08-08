import React from "react";
import { Link } from 'react-router-dom';
import '../../styles/components/forums.scss';

class ForumLinks extends React.Component {
  constructor() {
    super();
    this.state = {
      totalPost: null,
      forumId: 1
    }
    this.fetchTotalPostsInForum = this.fetchTotalPostsInForum.bind(this);
  }

  componentDidMount() {
    this.fetchTotalPostsInForum(this.state.forumId);
  }

  postsCounter() {
    // this.props.totalPost
  }

  fetchTotalPostsInForum(id) {
    fetch(`/api/post/${this.state.forumId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        console.log('response', response)
        return response.json();
      })
      .then(json => {
        console.log('json', json.length)
        // this.setState({ totalPost: json })
      })
      .catch(error => console.log("error", error.message))
  }

  render() {
    return (
      <div className="forums">
        <h4>Forums</h4>
        {this.props.forums.map((forum, index) => {
          return (
            <div key={forum.id} className="forum">
              <Link className="forum__link" to={`/forum/${forum.id}`}>
                <div className="forum__link--text">
                  {forum.title}
                </div>
                <div className="forum__details">
                  <div className="forum__total-post">
                    <svg className="icon-comments" aria-hidden="true" focusable="false">
                      <use xlinkHref="#icon-comments" />
                    </svg>
                    17 Comments</div>
                  <div className="forum__latest-post">Latest: Help plz...</div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ForumLinks;
