// Genre & Themes are retrieved via separate fetches
export function fetchGenreData() {
  return function(dispatch, getState) {
    const searchPath = `/genres/`;

    fetch(searchPath, {
      method: "GET",
      mode: "cors",
      headers: {}
    })
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

    fetch(searchPath, {
      method: "GET",
      mode: "cors",
      headers: {}
    })
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
    return fetch(searchPath, {
      method: "GET",
      mode: "cors"
    })
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
  console.log("genreData", genreData);
  return {
    type: "RECEIVE_GENREDATA",
    payload: genreData
  };
}

//function to call Reducer and set Theme in redux.state
export function receiveThemeData(themeData) {
  console.log("themeData", themeData);
  return {
    type: "RECEIVE_THEMEDATA",
    payload: themeData
  };
}

//Picks out data from API and sets it in an app-wide usable format
//{igdbId:<gameID>,cover_img:<cover pic>,name:game Title,description,genres:[genres ],themes:[themes],user_rating:number,critic_rating:number,screenshot:[array of imgs]}

export function setGameData(gameData) {
  return function(dispatch, getState) {
    console.log("API gameData", gameData);
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
    console.log("mygamedata", myGameData);
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
