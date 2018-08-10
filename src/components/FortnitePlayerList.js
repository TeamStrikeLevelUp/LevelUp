import React from "react";
import FortniteUser1 from "./FortniteUser1";
import FortniteUser2 from "./FortniteUser2";
import FortniteUser3 from "./FortniteUser3";

import "../../styles/components/fortnite.scss";
import "../../styles/index.scss";

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
    Promise.all(
      [
        "/api/fortnite/ninja",
        "/api/fortnite/ViniciusAmazing",
        "/api/fortnite/Terry 5L"
      ].map(url => fetch(url))
    )
      .then(results => {
        return Promise.all(
          results.map(res => (res.ok ? res.json() : Promise.reject(res)))
        );
      })
      .then(([ninja, viniciusAmazing, terry5L]) => {
        this.setState({ ninja, viniciusAmazing, terry5L });
      })
      .catch(err => console.log(err));
  }

  render() {

    return <div className="playerlist">


      <FortniteUser1 ninja={this.state.ninja} />



      <FortniteUser2 viniciusAmazing={this.state.viniciusAmazing} />


      <FortniteUser3 terry5L={this.state.terry5L} />
    </div>
  }
}

export default FortnitePlayerList;