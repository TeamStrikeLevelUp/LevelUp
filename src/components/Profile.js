import React from "react";
import { Link } from "react-router-dom";

import "../../styles/components/dashboard.scss";
import cx from 'classnames';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      twitchFavourites: [],
      gamerFavourites: [],
      fortniteUserData: {},
      gamerRank: "",
      posts: [],
      replies: [],
      level:0
    };

    this.searchGame = this.searchGame.bind(this);
    this.searchTwitch = this.searchTwitch.bind(this);
    this.gamerRank = this.gamerRank.bind(this)
    this.gamerLevel=this.gamerLevel.bind(this)
  }

  componentDidMount() {

    //fetch gamer profile
    fetch(`/api/profile/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(profile => {
        this.gamerLevel(profile.totalposts)
        //fetch tiwtch favourites
        fetch(`/api/twitchfavourites/${profile.gamer_id}`)
          .then(
            response =>
              response.ok ? response.json() : Promise.reject(response)
          )
          .then(twitchFavourites => {
            this.setState({ twitchFavourites });
          })
          .catch(error => {
            console.log("Sorry the following error occurred: ", error);
          });

          //fetch favourtie games
        fetch(`/api/favourites/${profile.gamer_id}`)
          .then(response => response.json())
          .then(gamerFavourites => {
            this.setState({ gamerFavourites });
          })
          .catch(error => {
            console.log("Sorry the following error occurred: ", error);
          });

          //fetch fornite info
        fetch(`/api/fortnite/${profile.fortnitename}`)
          .then(response => response.json())
          .then(fortniteUserData => {
            this.setState({
              fortniteUserData
            });
          });

          //set a level based on posts
        const g_level = profile.totalposts;
        switch (g_level) {
          case g_level < 10:
            this.setState({ gamerRank: "Noob" });
            break;
          case g_level < 20:
            this.setState({ gamerRank: "Challenger" });
            break;
          case g_level < 30:
            this.setState({ gamerRank: "Champion" });
            break;
          default:
            this.setState({ gamerRank: "Legend" });
        }

        //fetch posts and replies
        fetch(`/api/gamer/post/${profile.gamer_id}`)
          .then(response => response.json())
          .then(json => {
            this.setState({ posts: json.posts, replies: json.replies });
          });

        this.setState({ profile });
      });
  }

  searchGame(event, title) {
    this.props.searchClickedGame(title);
  }

  searchTwitch(event, title) {
    console.log("title: ", title);
    this.props.setTwitchStreamer(title);
  }

  gamerLevel(totalposts){
    
    let level= parseInt(totalposts/5);
    if(level >100)
      level=100
    this.setState({level})
  }

  gamerRank() {
    const g_level = this.state.profile.totalposts;
    console.log(this.state.profile.totalposts)

    if (g_level < 10) {
        return "Noob";
    } else if (g_level < 20) {
        return "Challenger";
    } else if (g_level < 30) {
        return "Champion";
    } else {
        return "Legend";
    }
}

  render() {
    // const { twitchFavourite, gameFavourite, userDataStore } = this.props;
    // const { userStats, userPosts } = this.state;
    // console.log("fort", this.state.fortniteUserData);

    return (
        <div className="dashboard__panels">

        {/* gamer info */}
        <div className="dashboard__panels--item">
        <h3> <i> Gamer ID: </i> {this.state.profile.gamer_name} </h3>
        <img className="profile--image" src={this.state.profile.avatar} />
        <p> <i> Story: </i> {this.state.profile.description} </p>

        </div>
            {/* Level */}
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Level</h3>
                <div className="dashboard__panels--points">
                    {this.state.level}
                </div>
                <p className="dashboard__panels--text dashboard__panels--text--large">
                    Your LevelUp rank is{" "}
                    <strong className="rank__level">{this.gamerRank()}</strong>
                </p>
                <p className="dashboard__panels--text">
                    This shows your overall rank related with the games you play and
                    your levelUp points.
          </p>
            </div>

            {/* Total posts */}
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Total Posts</h3>
                <div className="dashboard__panels--points">
                    {this.state.profile.totalposts}
                </div>
                <p className="dashboard__panels--text">
                    This shows the total amount of post in all forums.
          </p>
            </div>

            {/* Last posts */}
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Last 5 posts</h3>
                <div className="dashboard__panels--latest-post">
                    <ul className="dashboard__panels--latest-posts-list">
                        {
                            this.state.posts.length > 0
                                ? this.state.posts.map(post => {
                                    return (
                                        <li className="dashboard__panels--latest-posts-item" key={post.title}>
                                            <Link to={"/posts/" + post.id}>
                                                <div style={{ fontSize: 9 + "px" }}>{post.created}</div>
                                                {post.title}
                                            </Link>
                                        </li>
                                    )
                                })
                                : ""
                        }
                    </ul>
                </div>
                <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.</p>
            </div>



            {/* Twitch Favs */}
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Twitch Favourites Players</h3>
                <ul className="dashboard__panels--twitch-list">
                    {this.state.twitchFavourites.map(fav => {
                        return (
                            <li key={fav.twitch_name}>
                                <Link to="/twitch">
                                    <img
                                        src={fav.twitch_image}
                                        className="dashboard__panels--twitch-list--img"
                                        onClick={event =>
                                            this.searchTwitch(event, fav.twitch_name)
                                        }
                                    />
                                </Link>
                                {fav.twitch_name}{" "}
                            </li>
                        );
                    })}
                </ul>
                <p className="dashboard__panels--text">
                    Twitch users added to Favourites will show up here.
          </p>
            </div>

            {/* Fav games */}
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Favourite Games</h3>
                <ol className="dashboard__panels--twitch-list">
                    {this.state.gamerFavourites.map(fav => {
                        return (
                            <li
                                onClick={event => this.searchGame(event, fav.title)}
                                key={fav.title}
                            >
                                {" "}
                                <Link to="/search"> {fav.title} </Link>{" "}
                            </li>
                        );
                    })}
                </ol>
                <p className="dashboard__panels--text">
                    Games added to Favourites will show up here.
                    </p>
            </div>


            {/* fortnite */}
            <div className="dashboard__panels--item">
                <div>
                    <h3 className="dashboard__panels--heading">Fortnite</h3>
                    {this.state.fortniteUserData.totals ? (
                        <div className="dashboard__fortnite">
                            <h5 className="dashboard__panels--fortnite-user">
                                {this.state.fortniteUserData.username}
                            </h5>
                            <h5 className="dashboard__panels--fortnite-platform">
                                {this.state.fortniteUserData.platform.toUpperCase()}
                            </h5>
                            <h5 className="dashboard__panels--fortnite-platform">
                                {this.state.fortniteUserData.totals.wins > 50
                                    ? "Level: FORTIFIED"
                                    : "Level: Bricklayer"}
                            </h5>

                            <p className="dashboard__panels--fortnite-para">
                                Total Wins: {this.state.fortniteUserData.totals.wins}
                            </p>
                            <p className="dashboard__panels--fortnite-para">
                                Total Kills: {this.state.fortniteUserData.totals.kills}
                            </p>
                            <p className="dashboard__panels--fortnite-para">
                                Score: {this.state.fortniteUserData.totals.score}
                            </p>
                        </div>
                    ) : <h5 className="dashboard__panels--text">Enter your Fortnite username in the account section to see your Fortnite stats right here!</h5>}
                </div>
            </div>

        </div >
    );
}
  
}

export default Profile;
