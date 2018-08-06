import React from 'react';
import cx from 'classnames';

class DashboardAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            gamer_info: null,
            toggler: false,
            selectedFile: ""
        }
        this.togglerHandler = this.togglerHandler.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
    }

    componentDidMount() {
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

    togglerHandler() {
        this.setState({
            toggler: !this.state.toggler
        })
    }

    fileChangedHandler(event) {
        this.setState({
            selectedFile: event.target.value
        })
    }

    uploadHandler(e) {
        e.preventDefault();
        const gamer_id = this.props.userAuthState.userId;
        const avatar = this.state.selectedFile;
        fetch("/api/account/avatar", {
            method: "POST",
            body: JSON.stringify({ gamer_id, avatar }),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    toggler: !this.state.toggler
                })
                // TODO: Add avatar to redux.state for autoreload icon
                window.location.reload();
            }

        });
    }

    render() {
        const togglerClasses = cx('dashboard__avatar--form ', {
            'dashboard__avatar--form--visible': this.state.toggler
        });
        return (
            <div className="dashboard__account">
                <div className="dashboard__account--item">
                    <h3 className="dashboard__account--heading">Account</h3>
                    {this.state.gamer_info ?
                        <div>
                            <div className="dashboard__avatar">
                                <img className="dashboard__avatar--image" src={this.state.gamer_info.profile.avatar} alt="{this.state.gamer_info.profile.gamer_name}" />
                                <div className="dashboard__avatar--toggle" onClick={this.togglerHandler}>Update avatar</div>
                                <form className={togglerClasses}>
                                    <input
                                        className="dashboard__avatar--input"
                                        type="text"
                                        onChange={this.fileChangedHandler}
                                        placeholder="New avatar URL" />
                                    <button
                                        className="dashboard__avatar--submit"
                                        onClick={this.uploadHandler}>Upload!</button>
                                </form>
                            </div>
                            <p className="dashboard__account--text"><strong>Gamer ID: </strong>{this.state.gamer_info.profile.gamer_id}</p>
                            <p className="dashboard__account--text"><strong>Name: </strong>{this.state.gamer_info.profile.gamer_name}</p>
                            <div className="dashboard__account--points"><strong>Level: </strong>{this.state.gamer_info.profile.gamer_level}</div>
                            <p className="dashboard__account--text"><strong>Total Posts: </strong>{this.state.gamer_info.profile.totalposts}</p>
                            <p className="dashboard__account--text"><strong>Email: </strong>{this.state.gamer_info.profile.email}</p>
                            <p className="dashboard__account--text"><strong>Description: </strong>{this.state.gamer_info.profile.description}</p>
                        </div>
                        : ""}

                </div>
            </div>
        )
    }
}

export default DashboardAccount;