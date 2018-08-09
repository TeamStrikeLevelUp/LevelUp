import React from "react";
import { Link } from 'react-router-dom';

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
    this.replyHandler = this.replyHandler.bind(this)


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
      .then(json => this.setState({ posts: json }));
  }

  inputHandler(event) {
    this.setState({ input: event.target.value })
  }

  searchHandler(event) {
    event.preventDefault();

    fetch(`/api/post/${this.props.match.params.id}/search/${this.state.input}`)
      .then(response => response.json())
      .then(json => this.setState({ posts: json }));
  }

  titleHandler(event) {
    this.setState({ title: event.target.value })
  }

  bodyHandler(event) {
    this.setState({ body: event.target.value })
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
    }

    fetch("/api/post", {
      method: "post",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(json => this.setState({ posts: json }))



    this.setState({ body: "", title: "" })
  }


  render() {

    if (!this.state.forum.id) return null

    return (
      <div className="community">
        <header className="community__header">
          <h1 className="community__heading">Community Forums</h1>
          <form className="game-search__form">
            <input
              className="game-search__field"
              placeholder="search for posts"
              value={this.state.input}
              onChange={this.inputHandler} />
            <button
              className="button button-primary"
              onClick={this.searchHandler}> Search </button>
          </form>
        </header>
        <div className="forums">
          <h4>Thread: {this.state.forum.title}</h4>
          <h5>Category: {this.state.forum.category}</h5>
          {this.state.posts.map((post, index) => {
            let date = String(new Date(post.created)).substring(0, 24)
            return (
              <div key={post.id} className="forum">
                <Link className="forum__link" to={`/posts/${post.id}`}>
                  <div className="forum__link--text">
                    {post.title}
                  </div>
                  <div className="forum__details">
                    <div className="forum__total-post">
                      <svg className="icon-comments" aria-hidden="true" focusable="false">
                        <use xlinkHref="#icon-comments" />
                      </svg>
                      {this.state["totalPost-" + post.id]} Threads</div>
                    {/* <div className="forum__latest-post"><strong className="forum__latest-post--heading">Posted By: </strong><Link className="profile__links" to={`/profile/${post.gamer_name}`}> {post.gamer_name} </Link> - On: {date}</div> */}
                  </div>
                </Link>
              </div>
            )
          })
          }
        </div>
        {/* </div>
      <div> */}




        {/* <p>Title: {this.state.forum.title}</p>
        <p>Category: {this.state.forum.category}</p> */}


        {/* <form>
          <input placeholder="search for posts" value={this.state.input} onChange={this.inputHandler} />
          <button onClick={this.searchHandler}> search </button>
        </form> */}


        {/* {this.state.posts.map((post, index) => {
          let date = String(new Date(post.created)).substring(0, 24)
          return (
            <div key={post.id}>
              <Link className="forum__links" to={`/posts/${post.id}`}>Title: {post.title} - Posted By: <Link className="profile__links" to={`/profile/${post.gamer_name}`}> {post.gamer_name} </Link> - On: {date}</Link>
            </div>

          )
        })} */}

        <div style={{ display: this.props.userAuthState ? 'none' : '' }} > login to post </div>

        <form style={{ display: this.props.userAuthState ? '' : 'none' }}>
          <input placeholder="title" value={this.state.title} onChange={this.titleHandler} />
          <input placeholder="body" value={this.state.body} onChange={this.bodyHandler} />
          <button onClick={this.replyHandler}> reply </button>
        </form>


      </div>
    );
  }
}

export default Forums;
