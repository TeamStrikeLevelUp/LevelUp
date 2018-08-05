import React from 'react';

class DashboardAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        fetch(`/api/user/${this.props.userAuthState.userId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: Object.assign({}, ...data)
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="dashboard__Account">
                <div className="dashboard__Account--item">
                    <h3 className="dashboard__Account--heading">Account</h3>
                    <img style={{ maxWidth: 150 + "px" }} src={this.state.user.avatar} alt="{this.state.user.gamer_name}" />
                    <p className="dashboard__Account--text"><strong>Gamer ID: </strong>{this.state.user.gamer_id}</p>
                    <p className="dashboard__Account--text"><strong>Name: </strong>{this.state.user.gamer_name}</p>
                    <div className="dashboard__Account--points"><strong>Level: </strong>{this.state.user.gamer_level}</div>
                    <p className="dashboard__Account--text"><strong>Total Posts: </strong>{this.state.user.totalposts}</p>
                    <p className="dashboard__Account--text"><strong>Email: </strong>{this.state.user.email}</p>
                    <p className="dashboard__Account--text"><strong>Description: </strong>{this.state.user.description}</p>
                </div>
            </div>
        )
    }
}

export default DashboardAccount;