import React from "react";



class Game extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { game } = this.props;
    return (
      <ul>
        {Object.keys(game).map(currentItem => {
          return currentItem
          //game//[currentItem]

        })}
      </ul>
    )
  }//
}
export default Game;


// {this.state.gameInfo.map(game => {
//   return (
//     Object.keys(game).map(currentItem => {
//       return (game[currentItem])
//     }))
// })}