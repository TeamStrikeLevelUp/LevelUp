import React from "react";
import { Link } from "react-router-dom";

import "../../styles/components/forums.scss";
import "../../styles/index.scss";

class Forums extends React.Component {
  constructor() {
    super();
    this.state = { forum: {}, posts: [], input: "", title: "", body: "" };
    this.inputHandler = this.inputHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
    this.bodyHandler = this.bodyHandler.bind(this);
    this.replyHandler = this.replyHandler.bind(this);
    this.fetchTotalPostsInForum = this.fetchTotalPostsInForum.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   //   console.log("next",this.props)
  //   //   console.log("prev",prevProps)

  // }

  componentDidMount() {
    fetch(`/api/forum/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(json => this.setState({ forum: json }));

    fetch(`/api/post/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ posts: json });
        console.log("this.state.posts.j", json.length);
        // if (json.length > 0) {
        return this.fetchTotalPostsInForum(json);
        // }
      });
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("this.state.posts.length", this.state.posts.length)
  //   if (this.state.posts.length > 0) {
  //     this.fetchTotalPostsInForum(this.state.posts.id);
  //   }
  // }

  fetchTotalPostsInForum(posts) {
    posts.map(post => {
      console.log("post.id", post.id);
      fetch(`/api/postsbyparent/${post.id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          console.log("response", response);
          return response.json();
        })
        .then(posts => {
          console.log("posts", posts);
          const postCount = "totalPost-" + post.id;
          this.setState({
            [postCount]: posts.length
          });
          return posts.length;
        })
        .catch(error => console.log("error", error.message));
    });
  }

  inputHandler(event) {
    this.setState({ input: event.target.value });
  }

  searchHandler(event) {
    event.preventDefault();

    fetch(`/api/post/${this.props.match.params.id}/search/${this.state.input}`)
      .then(response => response.json())
      .then(json => this.setState({ posts: json }));
  }

  titleHandler(event) {
    this.setState({ title: event.target.value });
  }

  bodyHandler(event) {
    this.setState({ body: event.target.value });
  }

  replyHandler(event) {
    event.preventDefault();

    if (!this.props.userAuthState) {
      alert("login first");
      return;
    }

    const newPost = {
      title: this.state.title,
      body: this.state.body,
      forum_id: this.state.forum.id,
      gamer_id: this.props.userAuthState.userId,
      gamer_name: this.props.userAuthState.username
    };

    fetch("/api/post", {
      method: "post",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(json => this.setState({ posts: json }));

    this.setState({ body: "", title: "" });
  }

  render() {
    // console.log("next", this.props.forum)
    // console.log("prev", this.props.posts)
    if (!this.state.forum.id) return null;

    return (
      <div className="community">
        <header className="community__header">
          <h1 className="community__heading">Community Forums</h1>
          <form className="game-search__form">
            <input
              className="game-search__field"
              placeholder="Search for posts"
              value={this.state.input}
              onChange={this.inputHandler}
            />
            <button
              className="button button-primary"
              onClick={this.searchHandler}
            >
              {" "}
              Search{" "}
            </button>
          </form>
        </header>
        <div className="forums">
          <div
            className="forums__login"
            style={{ display: this.props.userAuthState ? "none" : "" }}
          >
            {" "}
            <a href="/login">Login to post</a>{" "}
          </div>
          <h3>Forum: {this.state.forum.title}</h3>
          <h4>Category: {this.state.forum.category}</h4>
          {this.state.posts.length ? (
            this.state.posts.map((post, index) => {
              let date = String(new Date(post.created)).substring(0, 24);
              return (
                <div key={post.id} className="forum">
                  <Link className="forum__link" to={`/posts/${post.id}`}>
                    <div className="forum__link--text">{post.title}</div>
                    <div className="forum__details">
                      <div className="forum__total-post">
                        <svg
                          className="icon-comments"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <use xlinkHref="#icon-comments" />
                        </svg>
                        {this.state["totalPost-" + post.id]} Posts
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="forums__no-posts">No thread on this forum yet :/</p>
          )}
        </div>
        <div style={{ display: this.props.userAuthState ? "" : "none" }}>
          <h5 className="form__thread--heading">Post a thread</h5>
          <form className="form__thread">
            <input
              className="form__thread--input"
              placeholder="Thread title"
              value={this.state.title}
              onChange={this.titleHandler}
            />
            <textarea
              className="form__thread--textarea"
              placeholder="Thread body"
              value={this.state.body}
              onChange={this.bodyHandler}
            />
            <button
              className="button button-primary"
              onClick={this.replyHandler}
            >
              {" "}
              Post{" "}
            </button>
          </form>
        </div>

      </div >
    );
  }
}

export default Forums;
