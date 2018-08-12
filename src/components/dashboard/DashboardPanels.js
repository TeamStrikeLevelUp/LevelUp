import React from "react";
import { Link } from "react-router-dom";


class DashboardPanels extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            userStats: "",
            gamer_rank: "",
            gamer_info: "",
            fortniteUserData: {},
            posts: [],
            replies: []
        };
        this.gamerRank = this.gamerRank.bind(this);
        this.searchGame = this.searchGame.bind(this);
        this.searchTwitch = this.searchTwitch.bind(this);
    }

    componentDidMount() {
        const userData = initialUser;
        this.setState({
            user: userData
        });

        if (userData) {
            this.props.setAuthState(userData);
        }

        // Fetch Twitch favourites if not in redux.state
        if (userData && this.props.fetchTwitchFavourite) {
            if (this.props.twitchFavourite.length === 0) {
                this.props.fetchTwitchFavourite(userData.userId);
            }
        }

        // Fetch user info
        fetch(`/api/profile/${userData.username}`)
            .then(response => response.json())
            .then(json => this.setState({ userStats: json }));

        // fetch user posts
        fetch(`/api/gamer/post/${userData.userId}`)
            .then(response => response.json())
            .then(json => {

                this.setState({ posts: json.posts, replies: json.replies });
            });

        // Gamer rank
        this.gamerRank();

        // Games Info
        if (userData && this.props.fetchGameFavourite) {
            this.props.fetchGameFavourite(userData.userId);
        }

        // Fetch user data && Fortnite data
        let tempData;
        this.props
            .fetchGamerInfo(userData.userId)
            .then(data1 => fetch(`/api/fortnite/${data1.profile.fortnitename}`))
            .then(response => response.json())
            .then(data2 => {
                this.setState({
                    fortniteUserData: data2
                });
            });
    }

    gamerRank() {
        // const g_level = this.state.userStats.gamer_level;
        const g_level = this.state.userStats.totalposts;
        switch (g_level) {
            case g_level < 10:
                this.setState({ gamer_rank: "Noob" });
                break;
            case g_level < 20:
                this.setState({ gamer_rank: "Challenger" });
                break;
            case g_level < 30:
                this.setState({ gamer_rank: "Champion" });
                break;
            default:
                this.setState({ gamer_rank: "Legend" });
        }
    }

    searchGame(event, title) {
        this.props.searchClickedGame(title);
    }

    searchTwitch(event, title) {
        console.log("title: ", title);
        this.props.setTwitchStreamer(title);
    }

    render() {
        const { twitchFavourite, gameFavourite, userDataStore } = this.props;
        const { userStats, gamer_rank } = this.state;
        // console.log("fort", this.state.fortniteUserData);
        return (
            <div className="dashboard__panels">
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Level</h3>
                    <div className="dashboard__panels--points">
                        {userStats.gamer_level}
                    </div>
                    <p className="dashboard__panels--text dashboard__panels--text--large">
                        Your LevelUp rank is{" "}
                        <strong className="rank__level">{gamer_rank}</strong>
                    </p>
                    <p className="dashboard__panels--text">
                        This shows your overall rank related with the games you play and
                        your levelUp points.
          </p>
                </div>
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Total Posts</h3>
                    <div className="dashboard__panels--points">
                        {userStats.totalposts}
                    </div>
                    <p className="dashboard__panels--text">
                        This shows the total amount of post in all forums.
          </p>
                </div>
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Twitch Favourites</h3>
                    <ul className="dashboard__panels--twitch-list">
                        {twitchFavourite.map(fav => {
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
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Favourite Games</h3>
                    <ol className="dashboard__panels--twitch-list">
                        {gameFavourite.map(fav => {
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
                <div className="dashboard__panels--item">
                    <div className="dashboard__fortnite">
                        <h3 className="dashboard__panels--heading">Fortnite</h3>
                        {this.state.fortniteUserData.totals ? (
                            <div className="dashboard__panels--points">
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
                        ) : null}
                    </div>
                </div>
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Latest Posts</h3>
                    {/* <div className="dashboard__panels--points" /> */}

                    <div className="dashboard__panels--text">
                        {this.state.posts.map((post, index) => {
                            if (index > 2) return null;
                            return <p key={post.id}> <Link to={`/posts/${post.id}`}> {post.title} </Link> </p>;
                        })}
                    </div>

                    <h3 className="dashboard__panels--heading">Latest Replies</h3>

                    <div className="dashboard__panels--text">
                        {this.state.replies.map((reply, index) => {
                            if (index > 2) return null;
                            return <p key={reply.id}> <Link to={`/posts/${reply.parent_id}`}> {reply.title} </Link> </p>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardPanels;
