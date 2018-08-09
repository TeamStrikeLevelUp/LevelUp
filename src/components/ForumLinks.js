import React from "react";
import { Link } from 'react-router-dom';
import '../../styles/components/forums.scss';

class ForumLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPost: null,
      forumId: 1
    }
    this.fetchTotalPostsInForum = this.fetchTotalPostsInForum.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forums && nextProps.forums.length && !this.props.forums.length) {
      this.fetchTotalPostsInForum(nextProps.forums);
    }
  }

  fetchTotalPostsInForum(forums) {
    console.log("1");
    forums.map(forum => {
      console.log("2");
      fetch(`/api/post/${forum.id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          return response.json();
        })
        .then(posts => {
          console.log("3");
          const post = "totalPost-" + forum.id;
          this.setState({
            [post]: posts.length
          });
          return posts.length;
        })
        .catch(error => console.log("error", error.message))

    })
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
                    {this.state["totalPost-" + forum.id]} Comments</div>
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
