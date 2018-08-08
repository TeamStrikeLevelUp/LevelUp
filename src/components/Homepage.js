import React from "react";
import {Link} from 'react-router-dom';
let shuffle = require("shuffle-array");

import "../../styles/index.scss";
import "../../styles/components/homepage.scss";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state={gamer:{},game:{}, forum:{}, choice:{}, voteResults:[], viewMode:false, topForum:[],
    topGames:[
      "The Elder Scrolls V: Skyrim","Fallout 4","Grand Theft Auto V","Fortnite", "The Witcher 3: Wild Hunt",
      "No Man's Sky","Octopath Traveler","Monster Hunter: World","The Legend of Zelda: Breath of the Wild","Persona 5"
    ]
  }
    this.handleChange=this.handleChange.bind(this);
    this.voteHandler=this.voteHandler.bind(this)
    this.viewHandler=this.viewHandler.bind(this)
  }

  componentDidMount(){
    fetch(`/api/featured`)
    .then(response => response.json())
    .then(json => this.setState({gamer:json.gamer ,game:json.game, forum:json.forum}));

    fetch(`/api/top5forums`)
    .then(response => response.json())
    .then(json => this.setState({topForum:json}));

  }

  handleChange(event){
    
    const choice={
      value:event.target.value,
      title:event.target.id
    }
    this.setState({choice})
  }

  voteHandler(event){
    event.preventDefault();
    
    if(this.state.choice.value){
      if(this.props.userAuthState){

        const newVote={
          value: this.state.choice.value,
          title: this.state.choice.title,
          gamer_id:this.props.userAuthState.userId,
         gamer_name:this.props.userAuthState.username
        }

        fetch("/api/vote", {
          method: "post",
          body: JSON.stringify(newVote),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(function(response) {
            return response.json();
          })
          .then(json => {
            alert(json.msg)
          }).catch(error => {
            alert(error.msg)
          });

      }
      else
       alert("login to vote")
    }
    else
    alert("select a choice to vote")
  }

  viewHandler(event){
    event.preventDefault();

    fetch(`/api/voteresults`)
    .then(response => response.json())
    .then(json =>{ 
      let count=0;
      json.forEach(vote=> count=count+parseInt(vote.count))
      this.setState({voteResults:json, totalVotes:count,viewMode:true});
    });
  }

  render() {
    let topGames=this.state.topGames;
    shuffle(topGames);
    return (
      <div className="homepage">
        <div className="homepage__main">
          <h2 className="homepage__main--title">Welcome to Level Up</h2>
          <h4 className="homepage__main--tour">Take a tour of Level Up</h4>
          <div className="homepage__main--featured">
            <div className="homepage__main--featured--selection">
              <div className="homepage__main--featured--selection--game">
                <h4><i>Featured Game:</i> {this.state.game.title}</h4>
              </div>
              <div className="homepage__main--featured--selection--user">
                <h4><i>Featured User:</i> <Link className="homepage__links" to={`/profile/${this.state.gamer.gamer_name}`}> {this.state.gamer.gamer_name} </Link>  </h4>
              </div>
              <div className="homepage__main--featured--selection--forum">
                <h4><i>Featured Forum:</i> <Link className="homepage__links"  to={`/forum/${this.state.forum.id}`}> {this.state.forum.title} </Link>  </h4>
              </div>
              
              <div className="homepage__main--featured--selection--twitch">
                <h4>Featured Stream: Twitch Streamer</h4>
              </div>
            </div>
          </div>
          <div className="homepage__main--upcoming-releases">
            <h4>LIST OF UPCOMING RELEASES WITH LINKS/TRAILER ONCLICK</h4>
          </div>
          <div className="homepage__main--top5">
            <h4>Top 5 Games</h4>
            <ul>
            {topGames.map((game,index)=>{
              if(index>4) return;
              return(<li>{game}</li>)
            })}
            </ul>
          </div>
          <div>
            <h4  className="homepage__main--top5"> Top 5 Active Forums</h4>
            <ul>
            {this.state.topForum.map(forum=>{
              
              return(<li><Link className="homepage__links"  to={`/forum/${forum.forum_id}`}> {forum.title} </Link> </li>)
            })}
            </ul>
          </div>
        </div>
        <div className="homepage__side">
          <div className="homepage__side--poll">
            <form onChange={this.handleChange}>
              <div>
                <div>
                  <strong>
                    What platform do you prefer to play on the most?
                  </strong>
                </div>
                <input type="radio" name="answer" value="1" id="PC" />
                <label htmlFor="PC">PC</label>
                <input type="radio" name="answer" value="2" id="PS4" />
                <label htmlFor="PS4">PS4</label>
                <input type="radio" name="answer" value="3" id="Xbox" />
                <label htmlFor="Xbox">Xbox One</label>
                <input type="radio" name="answer" value="4" id="Switch" />
                <label htmlFor="Switch">Nintendo Switch</label>
                <input type="radio" name="answer" value="5" id="Mobile" />
                <label htmlFor="Mobile">Mobile</label>
                <input type="radio" name="answer" value="6" id="Other" />
                <label htmlFor="Other">Other</label>
                <div>
                  <button onClick={this.voteHandler} >Vote  </button>
                  <button onClick={this.viewHandler} >View </button>
                </div>
                <div  style={{display: this.state.viewMode ? '' : 'none' }}>
                  <p>Number of Voters: {this.state.totalVotes} </p>
                  {this.state.voteResults.map(vote =>{
                    return <p key={vote.title}> {vote.title} got %{(vote.count/this.state.totalVotes)*100} </p>
                  })}
                </div>
              </div>
            </form>
          </div>
          <div className="homepage__side--twitter">

          <a class="twitter-timeline" href="https://twitter.com/UpUpDwnDwn?ref_src=twsrc%5Etfw">Tweets by UpUpDwnDwn</a> 
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

          </div>
          <div className="homepage__side--social-links">
            <h4>
              SOCIAL MEDIA LINKS -- MAYBE HAVE ROUTE THAT <br /> GOES TO ABOUT
              ME (IT WILL EXPLAIN OUR INTRO DURING DEMO)
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
