import React from "react";

class AdminDashboardAccount extends React.Component {
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

    fetch("/api/deletedposts")
      .then(response => response.json())
      .then(json => this.setState({ posts: json }));
  }

  blockHandler(event, post) {
    console.log("event:", event, "post:", post);
    const reviewBlock = {
      id: post.id
    };
    fetch(`/api/review-block/${post.id}`, {
      method: "post",
      body: JSON.stringify(reviewBlock),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        res.json(data);
      })
      .then
      // set state user is "blocked".
      ()
      .catch(e => e);
  }

  render() {
    console.log("POSTS:", this.state.posts);
    return (
      <div className="dashboard__account">
        <div className="dashboard__account--item">
          <h3 className="dashboard__account--heading">Moderated Posts</h3>
          <div className="review__posts">
            {Object.keys(this.state.posts).map(post => {
              return (
                <div className="review__post" key={this.state.posts[post].id}>
                  <p>
                    {this.state.posts[post].title}:{" "}
                    {this.state.posts[post].body}
                  </p>
                  <p>
                    posted by {this.state.posts[post].gamer_name} in{" "}
                    {this.state.posts[post].forum_title}
                  </p>
                  <button
                    className="button button-edit"
                    onClick={event =>
                      this.blockHandler(event, this.state.posts[post])
                    }
                  >
                    Block User
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboardAccount;
