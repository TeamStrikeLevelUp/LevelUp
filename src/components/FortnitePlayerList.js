import React from "react";
import FortniteUser1 from "./FortniteUser1";
import FortniteUser2 from "./FortniteUser2";
import FortniteUser3 from "./FortniteUser3";


class FortnitePlayerList extends React.Component {
  constructor() {
    super();

    this.state = {
      ninja: {},
      viniciusAmazing: {},
      terry5L: {}
    }
  }

  componentDidMount() {
    fetch("/api/fortnite/ninja")
      .then(response => response.json())
      .then(data => {
        this.setState({
          ninja: data
        })
      })

    fetch("/api/fortnite/ViniciusAmazing")
      .then(response => response.json())
      .then(data => {
        this.setState({
          viniciusAmazing: data
        })
        console.log(this.state.viniciusAmazing);
      })

    fetch("/api/fortnite/Terry 5L")
      .then(response => response.json())
      .then(data => {
        this.setState({
          terry5L: data
        })
        console.log(this.state.terry5L);
      })
  }
  render() {
    console.log(this.state.ninja);

    return <div className="playerlist">


      <FortniteUser1 ninja={this.state.ninja} />



      <FortniteUser2 viniciusAmazing={this.state.viniciusAmazing} />


      <FortniteUser3 terry5L={this.state.terry5L} />
    </div>
  }
}

export default FortnitePlayerList;