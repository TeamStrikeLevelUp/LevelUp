import React from "react";

class AdminDashboardPanels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      posts: {}
    };
  }

  componentDidMount() {
    // Get initialUser variable from global scope declared in index.hbs
    const userData = initialUser;
    this.setState({
      user: userData
    });
    if (userData) {
      this.props.setAuthState(userData);
    }

    fetch("/api/reviewposts")
      .then(response => response.json())
      .then(json => this.setState({ posts: json }));
  }

  deleteHandler(event, post) {
    console.log("event:", event, "post:", post);
    const reviewDelete = {
      id: post.id
    };
    fetch(`/api/review-delete/${post.id}`, {
      method: "post",
      body: JSON.stringify(reviewDelete),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        res.json(data);
      })
      .then()
      .catch(e => e);
  }

  render() {
    console.log("this.state.posts:", this.state.posts);
    if (this.state.posts) {
      return (
        <div className="dashboard__account">
          <div className="dashboard__account--item">
            <h3 className="dashboard__account--heading">Review</h3>
            <div className="dashboard__account--boxes">
              <div className="dashboard__account--box">
                {Object.keys(this.state.posts).map(post => {
                  return (
                    <div>
                      <p>
                        {this.state.posts[post].title}:{" "}
                        {this.state.posts[post].body}
                      </p>
                      <p>
                        posted by {this.state.posts[post].gamer_name} in{" "}
                        {this.state.posts[post].forum_title}
                      </p>
                      <button
                        onClick={event =>
                          this.deleteHandler(event, this.state.posts[post])
                        }
                      >
                        Delete Post
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AdminDashboardPanels;
