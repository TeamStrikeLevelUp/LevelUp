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
    }

    render() {
        return (
            <div className="dashboar-container">
                Hi {this.state.user.username},
                Dashboard component here.
            </div>
        );
    }
}

export default Dashboard;
