import React from "react";
// import "../../../styles/components/admin.scss";
// import "../../../styles/components/dashboard.scss";

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
      .then(
        fetch("/api/reviewposts")
          .then(response => response.json())
          .then(json => this.setState({ posts: json }))
      )
      .catch(e => e);
  }

  clearHandler(event, post) {
    const reviewClear = {
      id: post.id
    };
    fetch(`/api/review-clear/${post.id}`, {
      method: "post",
      body: JSON.stringify(reviewClear),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        res.json(data);
      })
      .then(
        fetch("/api/reviewposts")
          .then(response => response.json())
          .then(json => this.setState({ posts: json }))
      )
      .catch(e => e);
  }

  render() {
    console.log("this.state.posts:", this.state.posts);
    if (this.state.posts) {
      return (
        <div className="dashboard__account">
          <div className="dashboard__account--item">
            <h3 className="dashboard__account--heading">Posts to Moderate</h3>
            <div className="dashboard__account--boxes">
              <div className="dashboard__account--box">
                <div className="dashboard__panels--points">
                  {this.state.posts.length}
                </div>
                <div className="review__posts">
                  {Object.keys(this.state.posts).map(post => {
                    return (
                      <div key={this.state.posts[post].id}>
                        <div className="review__post">
                          <p>
                            {this.state.posts[post].title}:{" "}
                            {this.state.posts[post].body}
                          </p>
                          <p>
                            posted by {this.state.posts[post].gamer_name} in{" "}
                            {this.state.posts[post].forum_title}
                          </p>
                        </div>
                        <button
                          className="button button-edit"
                          onClick={event =>
                            this.deleteHandler(event, this.state.posts[post])
                          }
                        >
                          Delete
                        </button>
                        <button
                          className="button button-edit"
                          onClick={event =>
                            this.clearHandler(event, this.state.posts[post])
                          }
                        >
                          No Issue
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default AdminDashboardPanels;
