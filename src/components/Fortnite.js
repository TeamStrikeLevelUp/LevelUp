import React from "react";

class Fortnite extends React.Component {
  constructor() {
    super();
  }

  fetchFortniteData(username, platform) {}

  render() {
    return (
      <div className="fortnite">
        <div className="fortnite__option">
          <form>
            <select>
              <option>PS4</option>
              <option>Xbox</option>
              <option>PC</option>
            </select>
            <input type="search" />
            <button>Search</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Fortnite;
