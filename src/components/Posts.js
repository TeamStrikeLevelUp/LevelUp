import React from "react";
import { Link } from 'react-router-dom';
import '../../styles/components/posts.scss';
import "../../styles/components/forums.scss";


class Posts extends React.Component {
  state = {
    replies: [],
    post: {},
    input: "",
    title: "",
    body: "",
    editId: 0,
    editMode: false
  };

  componentDidMount() {
    Promise.all(
      [
        `/api/reply/${this.props.match.params.id}`,
        `/api/parentpost/${this.props.match.params.id}`
      ].map(url => fetch(url))
    )
      .then(results => {
        return Promise.all(
          results.map(res => (res.ok ? res.json() : Promise.reject(res)))
        );
      })
      .then(([replies, post]) => {
        this.setState({ replies, post, loaded: true });
        this.fetchAvatar(replies);
      })
      .catch(err => console.log(err));
  }

  inputHandler = event => {
    this.setState({ input: event.target.value });
  };

  searchHandler = event => {
    event.preventDefault();

    fetch(`/api/reply/${this.props.match.params.id}/search/${this.state.input}`)
      .then(response => response.json())
      .then(json => this.setState({ replies: json }));
  };

  titleHandler = event => {
    this.setState({ title: event.target.value });
  };

  bodyHandler = event => {
    this.setState({ body: event.target.value });
  };

  replyHandler = event => {
    event.preventDefault();

    if (!this.props.userAuthState) {
      alert("login first");
      return;
    }

    if (!this.state.editMode) {
      const newPost = {
        title: this.state.title,
        body: this.state.body,
        parent_id: this.props.match.params.id,
        forum_id: this.state.post.forum_id,
        gamer_id: this.props.userAuthState.userId,
        gamer_name: this.props.userAuthState.username
      };

      fetch("/api/reply", {
        method: "post",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          return response.json();
        })
        .then(json => this.setState({ replies: json }));

      this.setState({ body: "", title: "" });
    }
    else {
      const editObj = {
        newTitle: this.state.title,
        newBody: this.state.body,
        post_id: this.state.editId,
        forum_id: this.state.post.forum_id
      }

      fetch("/api/post-edit", {
        method: "POST",
        body: JSON.stringify(editObj),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function (response) {
          return response.json()
        })
        .then(data => {
          this.setState({ replies: data })
        })
        .catch(e => e);

      this.setState({ editMode: false })

    }
  };

  editHandler = (event, reply) => {
    event.preventDefault();
    this.setState({
      title: reply.title,
      body: reply.body,
      editId: reply.id,
      editMode: true
    });
    window.scrollTo(75, 75);
  };

  fetchAvatar = (posts) => {
    posts.map(post => {
      console.log("post.gamer_id", post.gamer_id)
      fetch(`/api/getgameravatar/${post.gamer_id}`)
        .then(response => response.json())
        .then(json => {
          const avatar = "avatar-" + post.gamer_id;
          this.setState({ [avatar]: json.avatar })
        });
    })
  }

  render() {
    // console.log("this.state.post", this.state.post);
    if (!this.state.post.id) return null
    let created = String(new Date(this.state.post.created)).substring(0, 24);
    const avatarState = "avatar-" + this.state.post.gamer_id;
    return (
      <div className="post__container">
        <header className="community__header">
          <form className="game-search__form">
            <input className="game-search__field" placeholder="Search for replies" value={this.state.input} onChange={this.inputHandler} />
            <button className="button button-primary" onClick={this.searchHandler}> Search </button>
          </form>
        </header>
        <div className="login-link" style={{ display: this.props.userAuthState ? 'none' : '' }} > <a href="/login">Login to post</a> </div>
        <h1><span className="topic">Topic:</span> {this.state.post.title} </h1>
        <div className="post__details">
          <div> Date Posted: {created} </div>
          {/* <div> Posted By:     </div> */}
        </div>
        <div className="post__content">
          <div className="post__content--author">
            <img className="post__details--icon post__details--icon-big" src={this.state[avatarState]} alt="" />
            <Link className="profile__links" to={`/profile/${this.state.post.gamer_name}`}> {this.state.post.gamer_name} </Link>
          </div>
          <p> {this.state.post.body} </p>
        </div>

        <div className="post__form--wrapper" style={{ display: this.props.userAuthState ? '' : 'none' }}>
          <h5 className="form__thread--heading">Post a comment</h5>
          <form className="form__thread">
            <input className="form__thread--input" placeholder="Comment title" value={this.state.title} onChange={this.titleHandler} />
            <textarea className="form__thread--textarea" placeholder="Write your comment here" value={this.state.body} onChange={this.bodyHandler} />
            <button className="button button-primary" onClick={this.replyHandler}> Post a comment </button>
          </form>
        </div>

        <div className="replies">
          <h3 className="replies__heading">{this.state.replies.length} comments: </h3>
          {this.state.replies.map(reply => {
            let date = String(new Date(reply.created)).substring(0, 24)
            return (
              <div className="reply" key={reply.id}>
                <div className="reply__content">
                  <div className="reply__content--author">
                    <img className="post__details--icon" src={this.state["avatar-" + reply.gamer_id]} alt="" />
                    <Link className="profile__links" to={`/profile/${reply.gamer_name}`}> {reply.gamer_name} </Link>
                  </div>
                  <div>
                    <h4 className="reply__title">{reply.title}</h4>
                    <span className="reply__date">Date Posted: {date}</span>
                    <p>{reply.body}</p>
                    {this.props.userAuthState ? (
                      this.props.userAuthState.userId === reply.gamer_id ? (
                        <button onClick={event => this.editHandler(event, reply)}>
                          Edit post
                        </button>
                      ) : null
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Posts;
