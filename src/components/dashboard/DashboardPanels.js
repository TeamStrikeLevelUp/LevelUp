import React from 'react';
import { Link } from 'react-router-dom';

class DashboardPanels extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            userStats: "",
            gamer_rank: "",
            gamer_info: "",
            fortniteUserData: {},
            userPosts: []
        }
        this.gamerRank = this.gamerRank.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.fetchUserPosts = this.fetchUserPosts.bind(this);
    }

    componentDidMount() {
        const userData = initialUser;
        this.setState({
            user: userData,
        });

        if (userData) { this.props.setAuthState(userData) };

        // Fetch Twitch favourites if not in redux.state
        if (userData && this.props.fetchTwitchFavourite) {
            if (this.props.twitchFavourite.length === 0) {
                this.props.fetchTwitchFavourite(userData.userId);
            }
        }

        // Fetch user info
        this.fetchUserInfo(userData);
        this.fetchUserPosts(userData);


        // Games Info
        if (userData && this.props.fetchGameFavourite) {
            this.props.fetchGameFavourite(userData.userId);
        }

        this.gamerRank();

        // Fetch user data && Fortnite data
        //     let tempData;
        //     this.props.fetchGamerInfo(userData.userId).then(data1 => fetch(`/api/fortnite/${data1.profile.fortnitename}`))
        //         .then(response => response.json())
        //         .then(data2 => {
        //             this.setState({
        //                 fortniteUserData: data2
        //             })
        //         })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            // Gamer rank
            const level = this.state.userStats.gamer_level;
            this.gamerRank(level);
        }
    }

    fetchUserInfo(userData) {
        fetch(`/api/profile/${userData.username}`)
            .then(response => response.json())
            .then(json => {
                this.setState({ userStats: json })
            });
    }

    fetchUserPosts(userData) {
        fetch(`/api/userposts/${userData.userId}`)
            .then(response => response.json())
            .then(json => {
                this.setState({ userPosts: json.slice(0, 5) })
            });
    }

    gamerRank(level) {
        if (level < 10) {
            this.setState({ gamer_rank: "Noob" });
        } else if (level < 20) {
            this.setState({ gamer_rank: "Challenger" });
        } else if (level < 30) {
            this.setState({ gamer_rank: "Champion" });
        } else {
            this.setState({ gamer_rank: "Legend" });
        }
    }

    render() {

        const { twitchFavourite, gameFavourite } = this.props;
        const { userStats, gamer_rank, userPosts } = this.state;

        return (
            <div className="dashboard__panels">
                {/* Level */}
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Level</h3>
                    <div className="dashboard__panels--points">{userStats.gamer_level}</div>
                    <p className="dashboard__panels--text dashboard__panels--text--large">Your LevelUp rank is <strong className="rank__level">{gamer_rank}</strong></p>
                    <p className="dashboard__panels--text">This shows your overall rank related with the games you play and your levelUp points.</p>
                </div>

                {/* Total posts */}
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Total Posts</h3>
                    <div className="dashboard__panels--points">{userStats.totalposts}</div>
                    <p className="dashboard__panels--text">This shows the total amount of post in all forums.</p>
                </div>

                {/* Last posts */}
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Last 5 posts</h3>
                    <div className="dashboard__panels--latest-post">
                        <ul className="dashboard__panels--latest-posts-list">
                            {
                                userPosts.length > 0
                                    ? userPosts.map(post => {
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

                {/* Fortnite */}
                <div className="dashboard__panels--item">
                    <div className="dashboard__fortnite">
                        <h3 className="dashboard__panels--heading">Fortnite Stats</h3>
                        {this.state.fortniteUserData.totals ?
                            <div className="dashboard__panels--points">

                                <h5 className="dashboard__panels--fortnite-user">{this.state.fortniteUserData.username}</h5>
                                <h5 className="dashboard__panels--fortnite-platform">{this.state.fortniteUserData.platform.toUpperCase()}</h5>
                                <h5 className="dashboard__panels--fortnite-platform">{this.state.fortniteUserData.totals.wins > 50 ? "Level: FORTIFIED" : "Level: Bricklayer"}</h5>




                                <p className="dashboard__panels--fortnite-para">Total Wins: {this.state.fortniteUserData.totals.wins}</p>
                                <p className="dashboard__panels--fortnite-para">Total Kills: {this.state.fortniteUserData.totals.kills}</p>
                                <p className="dashboard__panels--fortnite-para">Score: {this.state.fortniteUserData.totals.score}</p>
                            </div> :
                            null}
                    </div>
                </div>

                {/* Twitch Favs */}
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Twitch Favourites Players</h3>
                    <ul className="dashboard__panels--twitch-list">
                        {
                            twitchFavourite.map(fav => {
                                return (
                                    <li key={fav.twitch_name}>
                                        <img src={fav.twitch_image} className="dashboard__panels--twitch-list--img" />
                                        {fav.twitch_name}</li>
                                )
                            })
                        }
                    </ul>
                    <p className="dashboard__panels--text">Twitch users added to Favourites will show up here.</p>
                </div>

                {/* Fav games */}
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Favourite Games</h3>
                    <ol className="dashboard__panels--twitch-list">
                        {
                            gameFavourite.map(fav => {
                                return (
                                    <li key={fav.title}>{fav.title}</li>
                                )
                            })
                        }
                    </ol>
                    <p className="dashboard__panels--text">Games added to Favourites will show up here.</p>
                </div>
            </div>
        )
    }
}

export default DashboardPanels;