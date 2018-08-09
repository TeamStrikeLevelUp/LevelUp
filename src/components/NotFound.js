import React from "react";

import "../../styles/index.scss";
import "../../styles/components/notfound.scss";

//Get username from state and conditionally render it depending on whether user is logged in.

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userAuthState } = this.props;
    console.log("userAuthState:", userAuthState);
    return (
      <div className="notfound">
        <p className="notfound__message">Sorry, it's Game Over.</p>
        <p>404: Page Not Found</p>
        <img
          className="notfound__image"
          src="https://media.giphy.com/media/xdnfWJFRpP8Eo/giphy.gif"
          alt="car
          crash"
        />
      </div>
    );
  }
}

export default NotFound;
