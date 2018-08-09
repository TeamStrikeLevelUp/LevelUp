import React from "react";
import { Link } from "react-router-dom";

class Forums extends React.Component {
  constructor() {
    super();
    this.state = { forum: {}, posts: [], input: "", title: "", body: "" };
    this.inputHandler = this.inputHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
    this.bodyHandler = this.bodyHandler.bind(this);
    this.replyHandler = this.replyHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    //   console.log("next",this.props)
    //   console.log("prev",prevProps)
  }

  componentDidMount() {
    fetch(`/api/forum/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(json => this.setState({ forum: json }));

    fetch(`/api/post/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(json => this.setState({ posts: json }));
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
    const { userAuthState } = this.props;

    console.log("userAuthState", userAuthState);

    if (!this.state.forum.id) return null;

    return (
      <div>
        <p>Title: {this.state.forum.title}</p>
        <p>Category: {this.state.forum.category}</p>

        <form>
          <input
            placeholder="search for posts"
            value={this.state.input}
            onChange={this.inputHandler}
          />
          <button onClick={this.searchHandler}> search </button>
        </form>

        {this.state.posts.map((post, index) => {
          let date = String(new Date(post.created)).substring(0, 24);
          return (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>
                Title: {post.title} - Posted By: {post.gamer_name} - On: {date}
              </Link>
            </div>
          );
        })}

        <div style={{ display: this.props.userAuthState ? "none" : "" }}>
          {" "}
          login to post{" "}
        </div>

        <form style={{ display: this.props.userAuthState ? "" : "none" }}>
          <input
            placeholder="title"
            value={this.state.title}
            onChange={this.titleHandler}
          />
          <input
            placeholder="body"
            value={this.state.body}
            onChange={this.bodyHandler}
          />
          <button onClick={this.replyHandler}> reply </button>
        </form>
      </div>
    );
  }
}

export default Forums;
