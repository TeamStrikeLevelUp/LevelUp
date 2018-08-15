import React from "react";
import cx from "classnames";

class AdminDashboardForum extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "",
      allGames: [],
      selectedGameid: null,
      isMultiPlayer: false,
      forumName: ""
    };
    this.selectHanlder = this.selectHanlder.bind(this);
    this.forumNameHandler = this.forumNameHandler.bind(this);
    this.gameSelector = this.gameSelector.bind(this);
    this.tickHandler = this.tickHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/allgames`)
      .then(response => response.json())
      .then(json => {
        this.setState({ allGames: json });
      });
  }

  forumNameHandler(event) {
 
    this.setState({ forumName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

   
      const tempObj = {
        title: this.state.forumName,
        gameId: this.state.selectedGameid,
        category: this.state.category,
        mp: this.state.isMultiPlayer,
        gamerId: this.props.userAuthState.userId,
        gamerName: this.props.userAuthState.username
      };
   
      fetch(`/api/newforum`, {
        method: "post",
        body: JSON.stringify(tempObj),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(data => {
          ;
        })
        .then()
        .catch(e => e);

        this.setState({forumName:"", category:""})

  }

  selectHanlder(event) {
    this.setState({ category: event.target.value });
  }

  gameSelector(event) {
    this.setState({ selectedGameid: event.target.value });
  }

  tickHandler(event) {
    this.setState({ isMultiPlayer: event.target.checked });
  }

  render() {
    console.log("user auth", this.props.userAuthState);

    return (
      <div className="dashboard__account">
        <div className="dashboard__account--item">
          <h3 className="dashboard__account--heading">Create Forum</h3>
          <div className="dashboard__account--boxes">
            <div className="dashboard__account--box">
              <form onSubmit={this.handleSubmit}>
                <input
                  placeholder="forum name"
                  value={this.state.forumName}
                  onChange={this.forumNameHandler}
                  required
                />
                <select onChange={this.selectHanlder}>
                  <option value={null}>--selec a category--</option>
                  <option value="games">Games</option>
                  <option value="other">Other</option>
                </select>
                {this.state.category === "games" ? (
                  <div>
                    <label> Has MultiPlayer mode? </label>
                    <input onChange={this.tickHandler} type="checkbox" />
                    <select onChange={this.gameSelector}>
                      {this.state.allGames.map(game => {
                        return <option value={game.id}>{game.title}</option>;
                      })}
                    </select>
                  </div>
                ) : null}
                <button>Create Forum</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboardForum;
