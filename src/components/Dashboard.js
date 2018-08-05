import React from 'react';
import '../../styles/components/dashboard.scss';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.gamerInfo=this.gamerInfo.bind(this)
    }

    componentDidMount() {
        // Get initialUser variable from global scope declared in index.hbs
        const userData = initialUser; // JSON.parse(document.querySelector('#data').innerHTML);
        this.setState({
            user: userData
        })
        if (userData) { this.props.setAuthState(userData) };
    }

    gamerInfo(){
        if(this.props.userAuthState){
          //fetch gamer_profile
          fetch(`/api/gamer/${this.props.userAuthState.userId}`)
          .then(response => response.json())
          .then(json => console.log("----gamer_profile----",json));
    
          //fetch replies by gamer
          fetch(`/api/gamer/post/${this.props.userAuthState.userId}`)
          .then(response => response.json())
          .then(json => console.log("----gamer_posts----",json));
    
        }
    
        else
          alert("not logged")
    
      }

    render() {
        return (
            <div className="dashboard">
             <button onClick={this.gamerInfo}> gamer info </button>
                <div className="dashboard__container">
                    <div className="dashboard__sidebar">
                        <div className="dashboard__profile">
                            <img className="dashboard__profile--image" src="../../static/images/user.jpg" alt="" />
                            <div className="dashboard__profile--name">
                                {this.state.user.username}
                            </div>
                        </div>
                        <ul className="dashboard__nav">
                            <li className="dashboard__nav--item">Dashboard</li>
                            <li className="dashboard__nav--item">Account</li>
                            <li className="dashboard__nav--item">Forum</li>
                            <li className="dashboard__nav--item">Favorites</li>
                        </ul>
                    </div>
                    <div className="dashboard-content-wrapper">
                        <h2>Welcome back, {this.state.user.username}</h2>
                        <div className="dashboard__content">
                            <div className="dashboard__content--item">
                                <h3 className="dashboard__content--heading">Points</h3>
                                <div className="dashboard__content--points">250</div>
                                <p className="dashboard__content--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                            </div>
                            <div className="dashboard__content--item">
                                <h3 className="dashboard__content--heading">Total Post</h3>
                                <div className="dashboard__content--points">1750</div>
                                <p className="dashboard__content--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                            </div>
                            <div className="dashboard__content--item">
                                <h3 className="dashboard__content--heading">Messages</h3>
                                <div className="dashboard__content--points">450</div>
                                <p className="dashboard__content--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                            </div>
                            <div className="dashboard__content--item">
                                <h3 className="dashboard__content--heading">Forum</h3>
                                <div className="dashboard__content--points">50</div>
                                <p className="dashboard__content--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                            </div>
                            <div className="dashboard__content--item">
                                <h3 className="dashboard__content--heading">Twitch</h3>
                                <div className="dashboard__content--points">340</div>
                                <p className="dashboard__content--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                            </div>
                            <div className="dashboard__content--item">
                                <h3 className="dashboard__content--heading">Video Game</h3>
                                <div className="dashboard__content--points">20</div>
                                <p className="dashboard__content--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
