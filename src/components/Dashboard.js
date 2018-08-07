import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import DashboardPanels from './dashboard/DashboardPanels';
import DashboardAccount from './dashboard/DashboardAccount';
import '../../styles/components/dashboard.scss';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        // Get initialUser variable from global scope declared in index.hbs
        const userData = initialUser;
        this.setState({
            user: userData,
        });
        if (userData) { this.props.setAuthState(userData) };
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="dashboard__sidebar">
                        <div className="dashboard__profile">
                            <img className="dashboard__profile--image" src={this.state.user.avatar ? this.state.user.avatar : "../../static/images/user.jpg"} alt="" />
                            <div className="dashboard__profile--name">
                                {this.state.user.username}
                            </div>
                        </div>
                        <ul className="dashboard__nav">
                            <li className="dashboard__nav--item"><NavLink exact activeClassName="is-active" to="/dashboard">Dashboard</NavLink></li>
                            <li className="dashboard__nav--item"><NavLink activeClassName="is-active" to="/dashboard/account">Account</NavLink></li>
                            <li className="dashboard__nav--item">Forum</li>
                            <li className="dashboard__nav--item">Favorites</li>
                        </ul>
                    </div>
                    <div className="dashboard-content-wrapper">
                        <h2>Welcome back, {this.state.user.username}</h2>
                        <Switch>
                            <Route exact path="/dashboard" component={DashboardPanels} />
                            <Route path="/dashboard/account" render={() => {
                                return <DashboardAccount
                                    setAuthState={this.props.setAuthState}
                                    userAuthState={this.props.userAuthState}
                                    fetchGamerInfo={this.props.fetchGamerInfo}
                                    userDataStore={this.props.userDataStore} />
                            }} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
