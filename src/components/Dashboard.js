import React from 'react';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        const userData = JSON.parse(document.querySelector('#data').innerHTML);
        this.setState({
            user: userData
        })
        if (userData) { this.props.setAuthState(userData) };
    }

    render() {
        return (
            <div className="dashboard-container">
                Hi {this.state.user.username},
                Dashboard component here
            </div>
        );
    }
}

export default Dashboard;
