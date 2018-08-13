import React from "react";
import cx from "classnames";

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

  render() {
    return (
      <div className="dashboard__account">
        <div className="dashboard__account--item">
          <h3 className="dashboard__account--heading">Moderated Posts</h3>
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

export default AdminDashboardAccount;
