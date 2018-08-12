import React from "react";
import "../../../styles/components/retro.scss";
import "../../../styles/index.scss";

class DashboardRetro extends React.Component {
  constructor() {
    super();

  }
  render() {
    return (
      <div className="retro__wrapper">
        <div className="retro__headings">
          <h2>Leve1Up Retro Zone</h2>
          <p>Enjoy our collection of classic games & characters!</p>
        </div>
        <div className="retro__area">
          <div className="retro__pacman">
            <h4 className="retro__game-title">Pacman</h4>
            <img className="pacman__gif" src="/static/images/pacman__gif.gif" />
            <iframe src="https://www.silvergames.com/en/pacman/iframe" width="450" height="500"></iframe>
          </div>
          <div className="retro__street-fighter">
            <h4 className="retro__game-title">Street Fighter 2</h4>
            <img className="fighter__gif" src="/static/images/streetfighter__gif.gif" />
            <iframe src="//www.retrogames.cc/embed/10042-street-fighter-ii-champion-edition-yyc-bootleg-set-2-920313-etc-bootleg.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
          </div>
          <div className="retro__super-mario">
            <h4 className="retro__game-title">Super Mario</h4>
            <img className="mario__gif" src="/static/images/mario&luigi__gif.gif" />
            <iframe src="//www.retrogames.cc/embed/16847-super-mario-world-usa.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" autoPlay="false"></iframe>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardRetro;