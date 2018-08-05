// Genre & Themes are retrieved via separate fetches
export function fetchGenreData() {
  return function(dispatch, getState) {
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
  return function(dispatch, getState) {
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
  return function(dispatch, getState) {
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
  return function(dispatch, getState) {
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
export function fetchNewsInfoFromAPI(pageNum) {
  return function(dispatch, getState) {
    return fetch(`/newsApi/${pageNum}`)
      .then(response => response.json())
      .then(json => {
        // console.log("fetch news ", json.articles);
        dispatch(setNewsData(json.articles));
      })
      .catch(error => {
        console.log("Sorry the following error occurred: ", error);
      });
  };
}

//search NEWS Data based on User input
export function searchNewsAPI(searchTerm, pageNum) {
  return function(dispatch, getState) {
    console.log(`/searchNews/${searchTerm}-${pageNum}`);
    return fetch(`/searchNews/${searchTerm}/${pageNum}`)
      .then(response => response.json())
      .then(json => {
        dispatch(setNewsData(removeDuplicates(json.articles)));
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
  return function(dispatch, getState) {
    const myNewsData = [];

    newsData.map(newsObject => {
      const myNewsObject = {};
      // Only select news items which have a description
      if (!newsObject.description) {
        return;
      }

      // API data is very bitty so we need to check if it exists or not so we don't display empty fields, renaming keys
      if (newsObject.author) {
        myNewsObject["author"] = newsObject.author;
      }
      myNewsObject["description"] = newsObject.description;

      myNewsObject["date"] = formatTime(newsObject.publishedAt);

      myNewsObject["title"] = newsObject.title;

      myNewsObject["url"] = newsObject.url;

      if (!newsObject.urlToImage.includes("placeholder")) {
        myNewsObject["image"] = newsObject.urlToImage;
      }

      myNewsData.push(myNewsObject);
    });
    console.log("mynewsdata", myNewsData);
    dispatch(receiveNewsData(removeDuplicates(myNewsData)));
    // dispatch(receiveNewsData(newsData));
  };
}

// Time passed since news article was published
function formatTime(date) {
  let displayTime;
  const now = new Date();
  const myDate = new Date(date);
  const diff = now - myDate;
  const days = Math.floor(diff / 3600000 / 24);
  const hours = Math.floor((diff % 86400000) / 3600000) + 1; //UTC timezone
  const minutes = Math.floor(((diff % 86400000) % 3600000) / 60000);

  //If the data is more than 2 weeks old, then just display the PublishedAt date

  if (days >= 1) {
    displayTime = days + "d ";
  } else if (hours === 24) {
    displayTime = "1d";
  } else {
    displayTime = `${days !== 0 ? days + "d " : ""}${
      hours !== 0 ? hours + "h " : ""
    }${minutes !== 0 ? minutes + "m " : ""}`;
  }

  return displayTime;
}

//function to call Reducer and set auth in redux.state
export function receiveAuthState(auth) {
  return {
    type: "RECEIVE_AUTHSTATE",
    payload: auth
  };
}

// API data coming out contains duplicates-remove those with the same title OR same description

function removeDuplicates(newsSearch) {
  const myNewsData = newsSearch.reduce((acc, newsObject) => {
    if (!acc[newsObject.title]) {
      acc[newsObject.title] = newsObject;
    }
    return acc;
  }, {});

  const cleanNewsData = Object.values(myNewsData).reduce((acc, newsObject) => {
    if (!acc[newsObject.description]) {
      acc[newsObject.description] = newsObject;
    }
    return acc;
  }, {});

  return Object.values(cleanNewsData);
}
