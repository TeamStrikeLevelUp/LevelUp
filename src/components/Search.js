import React from "react";

// import Header from "./Header";
// import NavBar from "./NavBar";
// import Main from "./Main";
// import Footer from "./Footer";

class Search extends React.Component {

  constructor() {
    super();
  }

  // componentDidMount() {
  //   this.getreviews()
  // }

  // getreviews() {
  //   fetch("https://api-endpoint.igdb.com/reviews/?fields=title,review_rating,content,positive_points,negative_points", {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'user-key': '96651c2677f60060f3a91ef002c2a419 ',
  //       'Accept': 'application/json'

  //     }
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log('review info ', json)
  //     })

  // }


  render() {
    return (
      <div>
        <h1>Find your Game here</h1>
        <br />
        <br />

      </div>
    );
  }
}

export default Search;
