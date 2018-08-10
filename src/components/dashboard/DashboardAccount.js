import React from 'react';
import cx from 'classnames';

class DashboardAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            gamer_info: null,
            togglerAvatar: false,
            togglerFortnite: false,
            togglerEmail: false,
            selectedFile: "",
            fortniteName: "",
            email: "",
            togglerDesc: false,
            desc: ""
        }
        this.togglerAvatarHandler = this.togglerAvatarHandler.bind(this);
        this.uploadAvatarHandler = this.uploadAvatarHandler.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);

        this.togglerFortniteHandler = this.togglerFortniteHandler.bind(this);
        this.uploadFortniteHandler = this.uploadFortniteHandler.bind(this);
        this.fortniteChangedHandler = this.fortniteChangedHandler.bind(this);

        this.togglerEmailHandler = this.togglerEmailHandler.bind(this);
        this.emailChangedHandler = this.emailChangedHandler.bind(this);
        this.uploadEmailHandler = this.uploadEmailHandler.bind(this);

        this.togglerDescHandler = this.togglerDescHandler.bind(this);
        this.descChangedHandler = this.descChangedHandler.bind(this);
        this.uploadDescHandler = this.uploadDescHandler.bind(this);
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

    // Avatar
    togglerAvatarHandler() {
        this.setState({
            togglerAvatar: !this.state.togglerAvatar
        })
    }

    fileChangedHandler(event) {
        this.setState({
            selectedFile: event.target.value
        })
    }

    uploadAvatarHandler(e) {
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
                    togglerAvatar: !this.state.togglerAvatar
                })
                // TODO: Add avatar to redux.state for autoreload icon
                window.location.reload();
            }

        });
    }

    // Fortnite username
    togglerFortniteHandler() {
        this.setState({
            togglerFortnite: !this.state.togglerFortnite
        })
    }

    fortniteChangedHandler(event) {
        this.setState({
            fortniteName: event.target.value
        })
    }

    uploadFortniteHandler(e) {
        e.preventDefault();
        const gamer_id = this.props.userAuthState.userId;
        const fortniteName = this.state.fortniteName;
        fetch("/api/account/fortnitename", {
            method: "POST",
            body: JSON.stringify({ gamer_id, fortniteName }),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    togglerFortnite: !this.state.togglerFortnite
                })
                // TODO: Add fortniteName to redux.state for autoreload icon
                window.location.reload();
            }

        });
    }

    // Email 
    togglerEmailHandler() {
        this.setState({
            togglerEmail: !this.state.togglerEmail
        })
    }

    emailChangedHandler(event) {
        this.setState({
            email: event.target.value
        })
    }

    uploadEmailHandler(e) {
        e.preventDefault();
        const gamer_id = this.props.userAuthState.userId;
        const email = this.state.email;
        fetch("/api/account/emailupdate", {
            method: "POST",
            body: JSON.stringify({ gamer_id, email }),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    togglerEmail: !this.state.togglerEmail
                })
                // TODO: Add email to redux.state for autoreload icon
                window.location.reload();
            }

        });
    }
    // Description  
    togglerDescHandler() {
        this.setState({
            togglerDesc: !this.state.togglerDesc
        })
    }

    descChangedHandler(event) {
        this.setState({
            desc: event.target.value
        })
    }

    uploadDescHandler(e) {
        e.preventDefault();
        const gamer_id = this.props.userAuthState.userId;
        const desc = this.state.desc;
        fetch("/api/account/description", {
            method: "POST",
            body: JSON.stringify({ gamer_id, desc }),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    togglerDesc: !this.state.togglerDesc
                })
                // TODO: Add desc to redux.state for autoreload icon
                window.location.reload();
            }

        });
    }

    render() {
        const togglerAvatarClasses = cx('dashboard__avatar--form ', {
            'dashboard__avatar--form--visible': this.state.togglerAvatar
        });
        const fortniteClasses = cx('dashboard__fortnite--form ', {
            'dashboard__fortnite--form--visible': this.state.togglerFortnite
        });
        const emailClasses = cx('dashboard__email--form ', {
            'dashboard__email--form--visible': this.state.togglerEmail
        });
        const descClasses = cx('dashboard__desc--form ', {
            'dashboard__desc--form--visible': this.state.togglerDesc
        });

        // console.log("userDataStore", userDataStore);
        return (
            <div className="dashboard__account">
                <div className="dashboard__account--item">
                    <h3 className="dashboard__account--heading">Account</h3>
                    {this.state.gamer_info ?
                        <div className="dashboard__account--boxes">
                            <div className="dashboard__account--box">
                                <div className="dashboard__avatar">
                                    <img
                                        className="dashboard__avatar--image"
                                        src={this.state.gamer_info.profile.avatar}
                                        alt="{this.state.gamer_info.profile.gamer_name}" />
                                    <div className="dashboard__avatar--toggle" onClick={this.togglerAvatarHandler}>
                                        <div className="button__edit">
                                            <svg aria-hidden="true" focusable="false">
                                                <use xlinkHref="#button-edit" />
                                            </svg>
                                            edit
                                        </div>
                                    </div>
                                    <form className={togglerAvatarClasses}>
                                        <input
                                            className="dashboard__input dashboard__avatar--input"
                                            type="text"
                                            onChange={this.fileChangedHandler}
                                            placeholder="New avatar URL" />
                                        <button
                                            className="button button-primary"
                                            onClick={this.uploadAvatarHandler}>Upload!</button>
                                    </form>
                                    <div className="dashboard__account--name"><strong>{this.state.gamer_info.profile.gamer_name}</strong></div>
                                </div>
                            </div>

                            <div className="dashboard__account--box">
                                <div className="dashboard__account--text"><strong>Gamer ID: </strong>{this.state.gamer_info.profile.gamer_id}</div>
                                {/* <div className="dashboard__account--points"><strong>Level: </strong>{this.state.gamer_info.profile.gamer_level}</div> */}

                                {/* Fortnite Name */}
                                <div className="dashboard__fortnite dashboard__account--text">
                                    <div className="dashboard__fortnite--toggle" onClick={this.togglerFortniteHandler}>
                                        <strong>Fortnite Name: </strong>
                                        {this.state.gamer_info.profile.fortnitename}
                                        <div className="button__edit">
                                            <svg aria-hidden="true" focusable="false">
                                                <use xlinkHref="#button-edit" />
                                            </svg>
                                            edit
                                        </div>
                                    </div>

                                    <form className={fortniteClasses}>
                                        <input
                                            className="dashboard__input dashboard__fortnite--input"
                                            type="text"
                                            onChange={this.fortniteChangedHandler}
                                            placeholder="Add your Fortnite username" />
                                        <button
                                            className="button button-primary"
                                            onClick={this.uploadFortniteHandler}>Add!</button>
                                    </form>
                                </div>

                                {/* Email */}
                                <div className="dashboard__account--email dashboard__account--text">

                                    <div className="dashboard__fortnite--toggle" onClick={this.togglerEmailHandler}>
                                        <strong>Email: </strong>{this.state.gamer_info.profile.email}
                                        <div className="button__edit">
                                            <svg aria-hidden="true" focusable="false">
                                                <use xlinkHref="#button-edit" />
                                            </svg>
                                            edit
                                        </div>
                                    </div>

                                    <form className={emailClasses}>
                                        <input
                                            className="dashboard__input dashboard__email--input"
                                            type="text"
                                            onChange={this.emailChangedHandler}
                                            placeholder="Add your email" />
                                        <button
                                            className="button button-primary"
                                            onClick={this.uploadEmailHandler}>Update!</button>
                                    </form>
                                </div>

                                {/* Description */}
                                <div className="dashboard__account--desc dashboard__account--text">
                                    <div className="dashboard__fortnite--toggle" onClick={this.togglerDescHandler}>
                                        <strong>Description: </strong>{this.state.gamer_info.profile.description}
                                        <div className="button__edit">
                                            <svg aria-hidden="true" focusable="false">
                                                <use xlinkHref="#button-edit" />
                                            </svg>
                                            edit
                                        </div>
                                    </div>

                                    <form className={descClasses}>
                                        <textarea
                                            className="dashboard__input dashboard__desc--input"
                                            type="text"
                                            onChange={this.descChangedHandler}
                                            placeholder="Add your description" />
                                        <button
                                            className="button button-primary"
                                            onClick={this.uploadDescHandler}>Update!</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        : ""}

                </div>
            </div>
        )
    }
}

export default DashboardAccount;