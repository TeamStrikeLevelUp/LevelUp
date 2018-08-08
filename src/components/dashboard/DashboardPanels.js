import React from 'react';

class DashboardPanels extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            userStats: "",
            gamer_rank: ""
        }
        this.gamerRank = this.gamerRank.bind(this);
    }

    componentDidMount() {
        const userData = initialUser;
        this.setState({
            user: userData,
        });

        console.log("userData.userId", userData)
        if (userData) { this.props.setAuthState(userData) };
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

        // Gamer rank
        this.gamerRank();
    }

    gamerRank() {
        const g_level = this.state.userStats.gamer_level;
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

    render() {
        const { twitchFavourite, gameFavourite } = this.props;
        const { userStats, gamer_rank } = this.state;
        return (
            <div className="dashboard__panels">
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Level</h3>
                    <div className="dashboard__panels--points">{userStats.gamer_level}</div>
                    <p className="dashboard__panels--text dashboard__panels--text--large">Your LevelUp rank is <strong className="rank__level">{gamer_rank}</strong></p>
                    <p className="dashboard__panels--text">This shows your overall rank related with the games you play and your levelUp points.</p>
                </div>
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Total Posts</h3>
                    <div className="dashboard__panels--points">{userStats.totalposts}</div>
                    <p className="dashboard__panels--text">This shows the total amount of post in all forums.</p>
                </div>
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Twitch Favourites</h3>
                    <ol className="dashboard__panels--twitch-list">
                        {
                            twitchFavourite.map(fav => {
                                return (
                                    <li key={fav.twitch_name}>{fav.twitch_name}</li>
                                )
                            })
                        }
                    </ol>
                </div>
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Forum</h3>
                    <div className="dashboard__panels--points">50</div>
                    <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                </div>
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Twitch</h3>
                    <div className="dashboard__panels--points">340</div>
                    <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                </div>
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Video Game</h3>
                    <div className="dashboard__panels--points">20</div>
                    <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                </div>
            </div>
        )
    }
}

export default DashboardPanels;