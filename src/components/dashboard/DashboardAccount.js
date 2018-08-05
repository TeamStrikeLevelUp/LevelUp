import React from 'react';

class DashboardAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gamer_info: null,
        }
        // this.gamerInfo = this.gamerInfo.bind(this);
    }

    componentDidMount() {
        // fetch(`/api/user/${this.props.userAuthState.userId}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({
        //             user: Object.assign({}, ...data)
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        this.gamerInfo();
    }

    gamerInfo() {
        if (this.props.userAuthState) {
            //fetch gamer_profile
            fetch(`/api/gamer/${this.props.userAuthState.userId}`)
                .then(response => response.json())
                .then(gamerData => {
                    console.log("gamerData", gamerData)
                    this.setState({
                        gamer_info: gamerData
                    });
                })
        };
    }
    render() {
        console.log("this.state.gamer_info", this.state.gamer_info)
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