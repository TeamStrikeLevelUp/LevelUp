import React from 'react';

class DashboardAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            gamer_info: null
        }
    }

    componentDidMount() {
        console.log("this.props", this.props)
        // Get initialUser variable from global scope declared in index.hbs
        const userData = initialUser;
        this.setState({
            user: userData,
        });
        if (userData) { this.props.setAuthState(userData) };

        if (userData) {
            this.props.fetchGamerInfo(userData.userId)
                .then(data => {
                    this.setState({
                        gamer_info: data
                    });
                });

        }
    }

    render() {

        return (
            <div className="dashboard__Account">
                <div className="dashboard__Account--item">
                    <h3 className="dashboard__Account--heading">Account</h3>
                    {this.state.gamer_info ?
                        <div>
                            <img style={{ maxWidth: 150 + "px" }} src={this.state.gamer_info.profile.avatar} alt="{this.state.gamer_info.profile.gamer_name}" />
                            <p className="dashboard__Account--text"><strong>Gamer ID: </strong>{this.state.gamer_info.profile.gamer_id}</p>
                            <p className="dashboard__Account--text"><strong>Name: </strong>{this.state.gamer_info.profile.gamer_name}</p>
                            <div className="dashboard__Account--points"><strong>Level: </strong>{this.state.gamer_info.profile.gamer_level}</div>
                            <p className="dashboard__Account--text"><strong>Total Posts: </strong>{this.state.gamer_info.profile.totalposts}</p>
                            <p className="dashboard__Account--text"><strong>Email: </strong>{this.state.gamer_info.profile.email}</p>
                            <p className="dashboard__Account--text"><strong>Description: </strong>{this.state.gamer_info.profile.description}</p>
                        </div>
                        : ""}

                </div>
            </div>
        )
    }
}

export default DashboardAccount;