import React from "react";

//Convert component into a class, get username from state

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userAuthState } = this.props;
    console.log("userAuthState:", userAuthState);
    return (
      <div>
        <p>{userAuthState}</p>
        <p>Sorry username, Game Over.</p>
      </div>
    );
  }
}

// function NotFound() {
//   return (
//     <div>
//       <p>Sorry username, Game Over.</p>
//     </div>
//   );
// }

export default NotFound;
