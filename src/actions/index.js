// Genre & Themes are retrieved via separate fetches
export function fetchGenreData() {
  return function (dispatch, getState) {
    const searchPath = `/genres/`;

    fetch(searchPath)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveGenreData(json.body));
      })
      .catch(error => {
        console.log("Sorry the following error occurred: ", error);
      });
  };
}
// Genre & Themes are retrieved via separate fetches
export function fetchThemeData() {
  return function (dispatch, getState) {
    const searchPath = `/themes/`;

    fetch(searchPath)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveThemeData(json.body));
      })
      .catch(error => {
        console.log("Sorry the following error occurred: ", error);
      });
  };
}
//Main Game Data fetch - calls helper function to sanitise data
export function fetchGameInfoFromAPI(searchPath) {
  return function (dispatch, getState) {
    return fetch(searchPath)
      .then(response => response.json())
      .then(json => {
        dispatch(setGameData(json.body));
      })
      .catch(error => {
        console.log("Sorry the following error occurred: ", error);
      });
  };
}

//function to call Reducer and set Genre data in redux.state
export function receiveGenreData(genreData) {
  return {
    type: "RECEIVE_GENREDATA",
    payload: genreData
  };
}

//function to call Reducer and set Theme in redux.state
export function receiveThemeData(themeData) {
  return {
    type: "RECEIVE_THEMEDATA",
    payload: themeData
  };
}

//Picks out data from API and sets it in an app-wide usable format
//{igdbId:<gameID>,cover_img:<cover pic>,name:game Title,description,genres:[genres ],themes:[themes],user_rating:number,critic_rating:number,screenshot:[array of imgs]}

export function setGameData(gameData) {
  return function (dispatch, getState) {
    let myGameData = [];

    gameData.map(gameObject => {
      let myGameObject = {};
      let themeArray = [];
      let screenArray = [];
      let genreArray = [];

      // Only select games which have a description
      if (!gameObject.summary) {
        return;
      }

      myGameObject["igdbId"] = gameObject.id;

      // API data is very bitty so we need to check if it exists or not so we don't display empty fields
      if (gameObject.cover) {
        myGameObject["cover_img"] =
          "//images.igdb.com/igdb/image/upload/t_cover_big/" +
          gameObject.cover.cloudinary_id;
      }

      myGameObject["name"] = gameObject.name;

      myGameObject["description"] = gameObject.summary;

      if (gameObject.genres) {
        gameObject.genres.map(genre => {
          getState().genreInfo.map(genreObject => {
            if (genre === genreObject["id"]) {
              genreArray.push(genreObject["name"] + " ");
            }
          });
        });
        myGameObject["genres"] = [...genreArray];
      }

      if (gameObject.themes) {
        gameObject.themes.map(theme => {
          getState().themeInfo.map(themeObject => {
            if (themeObject["id"] === theme) {
              themeArray.push(themeObject["name"] + " ");
            }
          });
        });
        myGameObject["themes"] = [...themeArray];
      }

      if (gameObject.rating) {
        myGameObject["user_rating"] = Math.round(gameObject.rating);
      }

      if (gameObject.aggregated_rating) {
        myGameObject["critic_rating"] = Math.round(
          gameObject.aggregated_rating
        );
      }

      if (gameObject.screenshots) {
        gameObject.screenshots.map(screenshotObject => {
          screenArray.push(
            "https://images.igdb.com/igdb/image/upload/t_screenshot_big/" +
            screenshotObject["cloudinary_id"]
          );
        });

        myGameObject["screenshot"] = screenArray;
      }

      if (gameObject.videos) {
        myGameObject["video"] =
          "https://www.youtube.com/embed/" +
          gameObject.videos[0].video_id +
          "?&autoplay=1";
      }

      myGameData.push(myGameObject);
    });

    //No results found
    if (myGameData.length === 0) {
      myGameData = "No results found";
    }

    dispatch(receiveGameData(myGameData));
  };
}

//function to call Reducer and set game data in redux.state
export function receiveGameData(gameData) {
  return {
    type: "RECEIVE_GAMEDATA",
    payload: gameData
  };
}

//Main NEWS Data fetch - calls helper function to sanitise data
export function fetchNewsInfoFromAPI() {
  return function (dispatch, getState) {
    return fetch("/newsApi/")
      .then(response => response.json())
      .then(json => {
        dispatch(setNewsData(json.articles));
      })
      .catch(error => {
        console.log("Sorry the following error occurred: ", error);
      });
  };
}

//search NEWS Data based on User input
export function searchNewsAPI(searchTerm) {
  console.log("searchTerm", searchTerm);
  return function (dispatch, getState) {
    return fetch(`/searchNews/${searchTerm}`)
      .then(response => response.json())
      .then(json => {
        dispatch(setNewsData(json.articles));
      })
      .catch(error => {
        console.log("Sorry the following error occurred: ", error);
      });
  };
}

//function to call Reducer and set news data in redux.state
export function receiveNewsData(newsData) {
  return {
    type: "RECEIVE_NEWSDATA",
    payload: newsData
  };
}

export function setNewsData(newsData) {
  return function (dispatch, getState) {
    const myNewsData = [];

    newsData.map(newsObject => {
      const myNewsObject = {};

      // API data is very bitty so we need to check if it exists or not so we don't display empty fields
      if (newsObject.author) {
        myNewsObject["author"] = newsObject.author;
      }
      myNewsObject["description"] = newsObject.description;

      myNewsObject["date"] = "Published " + formatDate(newsObject.publishedAt);

      myNewsObject["title"] = newsObject.title;

      myNewsObject["url"] = newsObject.url;

      if (newsObject.urlToImage) {
        myNewsObject["image"] = newsObject.urlToImage;
      }
      myNewsData.push(myNewsObject);
    });
    // console.log(myNewsData);
    dispatch(receiveNewsData(myNewsData));
  };
}
// Makes Dates look presentable
function formatDate(date) {
  let myDate = new Date(date);

  const prettyDate = myDate.toDateString().substring(4, myDate.length);
  const minutes = ("0" + myDate.getMinutes()).slice(-2);
  const hours = myDate.getHours();

  myDate = prettyDate.split(" ");
  const month = myDate[0];
  const day = parseInt(myDate[1]);
  const year = myDate[2];
  let suffix = "";
  switch (day) {
    case 1:
    case 21:
    case 31:
      suffix = "st";
      break;
    case 2:
    case 22:
      suffix = "nd";
      break;
    case 3:
    case 23:
      suffix = "rd";
      break;
    default:
      suffix = "th";
      break;
  }
  return `${day}${suffix} ${month} ${year} at ${hours}:${minutes} `;
}

//function to call Reducer and set auth in redux.state
export function receiveAuthState(auth) {
  return {
    type: "RECEIVE_AUTHSTATE",
    payload: auth
  };
}

// fetch to grab fortnite user statistics
export function fetchFortniteStats(username) {
  console.log("fortnite username", username)
  return function (dispatch, getState) {
    return fetch(`/api/fortnite/${username}`)
      .then(response => response.json())
      .then(data => {
        dispatch(setFortniteStats(data))
      })
      .catch(e => {
        alert("Sorry, we could not find your Fortnite data", e)
      })
  }
}

// set fortnite data into redux state
export function setFortniteStats(userData) {
  return {
    type: "RECEIVE_FORTNITE_DATA",
    payload: userData
  };
}

