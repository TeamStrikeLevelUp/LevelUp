import React from "react";

import "../../styles/index.scss";
import "../../styles/components/homepage.scss";

class Homepage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="homepage">
        <div className="homepage__main">
          <h2 className="homepage__main--title">Welcome to Level Up</h2>
          <h4 className="homepage__main--tour">Take a tour of Level Up</h4>
          <div className="homepage__main--featured">
            <div className="homepage__main--featured--selection">
              <div className="homepage__main--featured--selection--game">
                <h4>Featured Game: Fortnite</h4>
              </div>
              <div className="homepage__main--featured--selection--user">
                <h4>Featured User: Ahmed1</h4>
              </div>
              <div className="homepage__main--featured--selection--forum">
                <h4>Featured Forum: Kingsway</h4>
              </div>
              <div className="homepage__main--featured--selection--news">
                <h4>Featured News: IGN</h4>
              </div>
              <div className="homepage__main--featured--selection--twitch">
                <h4>Featured Stream: Twitch Streamer</h4>
              </div>
            </div>
          </div>
          <div className="homepage__main--upcoming-releases">
            <h4>LIST OF UPCOMING RELEASES WITH LINKS/TRAILER ONCLICK</h4>
          </div>
          <div className="homepage__main--top10">
            <h4>Top 10 List</h4>
          </div>
        </div>
        <div className="homepage__side">
          <div className="homepage__side--poll">
            <form>
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
                  <input type="submit" value=" Vote " />
                  <input type="submit" value=" View " />
                </div>
              </div>
            </form>
          </div>
          <div className="homepage__side--twitter">
            <h4>TWITTER FEED</h4>
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
