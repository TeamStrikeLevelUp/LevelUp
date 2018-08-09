import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";

import {
  fetchTopTwitchers,
  receiveTopTwitchers,
  addFavouriteToDB,
  addFavTwitchToDB,
  fetchGameFavourite,
  receiveGameFavourites,
  fetchTwitchFavourite,
  receiveTwitchFavourites,
  fetchGenreData,
  fetchThemeData,
  fetchGameInfoFromAPI,
  receiveGenreData,
  receiveThemeData,
  setGameData,
  receiveGameData,
  fetchNewsInfoFromAPI,
  searchNewsAPI,
  receiveNewsData,
  setNewsData,
  formatTime,
  receiveAuthState,
  fetchFortniteStats,
  setFortniteStats,
  receiveUserData,
  fetchGamerInfo,
  removeDuplicates
} from "../../src/actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions - favs", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // Fetch on server, sends data to client, maps over it and returns each index. Sends index to action creator.
  it("fetchTopTwitchers calls fetch, returns data and triggers receiveTopTwitchers", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: [
          {
            id: "36769016",
            login: "timthetatman",
            display_name: "TimTheTatman",
            type: "",
            broadcaster_type: "partner",
            description:
              "Gamer, nerd, geek. Streaming mostly FPS/Whatevs/Yolo. Feel welcomed, talk to me, and be yourself. Welcome to the #tatmanarmy, one of the most interactive communities on twitch!",
            profile_image_url:
              "https://static-cdn.jtvnw.net/jtv_user_pictures/timthetatman-profile_image-4cb867e7d0af1448-300x300.jpeg",
            offline_image_url:
              "https://static-cdn.jtvnw.net/jtv_user_pictures/timthetatman-channel_offline_image-dad25649b8d20159-1920x1080.png",
            view_count: 92279803
          }
        ]
      })
    );
    const expectedAction = [
      {
        type: "RECEIVE_TOPTWITCHERS",
        payload: {
          data: [
            {
              id: "36769016",
              login: "timthetatman",
              display_name: "TimTheTatman",
              type: "",
              broadcaster_type: "partner",
              description:
                "Gamer, nerd, geek. Streaming mostly FPS/Whatevs/Yolo. Feel welcomed, talk to me, and be yourself. Welcome to the #tatmanarmy, one of the most interactive communities on twitch!",
              profile_image_url:
                "https://static-cdn.jtvnw.net/jtv_user_pictures/timthetatman-profile_image-4cb867e7d0af1448-300x300.jpeg",
              offline_image_url:
                "https://static-cdn.jtvnw.net/jtv_user_pictures/timthetatman-channel_offline_image-dad25649b8d20159-1920x1080.png",
              view_count: 92279803
            }
          ]
        }
      }
    ];

    const store = mockStore({});

    return store.dispatch(fetchTopTwitchers()).then(data => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("addFavouriteToDB calls fetch with the correct data when adding new fav", () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const action = addFavouriteToDB({
      a: "b"
    });

    action();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/newfavourite/");
    expect(fetch.mock.calls[0][1]).toEqual({
      method: "post",
      body: JSON.stringify({
        a: "b"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  });

  it("addFavTwitchToDB calls fetch with the correct data when adding new fav", () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const action = addFavTwitchToDB({
      a: "b"
    });

    action();

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/addtwitchfavourite/");
    expect(fetch.mock.calls[0][1]).toEqual({
      method: "post",
      body: JSON.stringify({
        a: "b"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  });

  it("fetchGameFavourite calls fetch, returns data and triggers receiveGameFavourites", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: 1,
        title: "The Adventures of Robin Hood",
        igdb_id: 2301,
        id: 1,
        game_id: 1,
        gamer_id: 1
      })
    );

    const expectedAction = [
      {
        type: "RECEIVE_GAMEFAVOURITES",
        payload: {
          id: 1,
          title: "The Adventures of Robin Hood",
          igdb_id: 2301,
          id: 1,
          game_id: 1,
          gamer_id: 1
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(fetchGameFavourite(1)).then(data => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(fetch.mock.calls.length).toEqual(1);
      // expect(fetch.mock.calls[0][0].toEqual(`/api/favourites/1`));
    });
  });

  it("fetchTwitchFavourite calls fetch, returns data and triggers receiveTwitchFavourites", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: 1,
        twitch_name: "The Adventures of Robin Hood",
        gamer_id: 1
      })
    );

    const expectedAction = [
      {
        type: "RECEIVE_TWITCHFAVOURITES",
        payload: {
          id: 1,
          twitch_name: "The Adventures of Robin Hood",
          gamer_id: 1
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(fetchTwitchFavourite(1)).then(data => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(fetch.mock.calls.length).toEqual(1);
    });
  });
});

describe("actions - favs", () => {
  it("receiveGameFavourites returns expected action", () => {
    const action = receiveGameFavourites({
      id: 1,
      title: "The Adventures of Robin Hood",
      igdb_id: 2301,
      id: 1,
      game_id: 1,
      gamer_id: 1
    });

    const expectedAction = {
      type: "RECEIVE_GAMEFAVOURITES",
      payload: {
        id: 1,
        title: "The Adventures of Robin Hood",
        igdb_id: 2301,
        id: 1,
        game_id: 1,
        gamer_id: 1
      }
    };

    expect(action).toEqual(expectedAction);
  });

  it("receiveTwitchFavourites returns expected action", () => {
    const action = receiveTwitchFavourites({
      id: 1,
      twitch_name: "The Adventures of Robin Hood",
      gamer_id: 1
    });

    const expectedAction = {
      type: "RECEIVE_TWITCHFAVOURITES",
      payload: {
        id: 1,
        twitch_name: "The Adventures of Robin Hood",
        gamer_id: 1
      }
    };

    expect(action).toEqual(expectedAction);
  });
});

describe("async actions - genre & theme", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("fetchGenreData calls fetch, returns data and triggers receiveGenreData", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        body: [
          {
            id: 11,
            name: "Real Time Strategy (RTS)"
          },
          {
            id: 9,
            name: "Puzzle"
          }
        ]
      })
    );

    const expectedAction = [
      {
        type: "RECEIVE_GENREDATA",
        payload: [
          {
            id: 11,
            name: "Real Time Strategy (RTS)"
          },
          {
            id: 9,
            name: "Puzzle"
          }
        ]
      }
    ];
    const store = mockStore({});

    return store.dispatch(fetchGenreData()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(fetch.mock.calls.length).toEqual(1);
    });
  });

  it("fetchThemeData calls fetch, returns data and triggers receiveThemeData", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        body: [
          {
            id: 31,
            name: "Drama"
          },
          {
            id: 28,
            name: "Business"
          }
        ]
      })
    );

    const expectedAction = [
      {
        type: "RECEIVE_THEMEDATA",
        payload: [
          {
            id: 31,
            name: "Drama"
          },
          {
            id: 28,
            name: "Business"
          }
        ]
      }
    ];
    const store = mockStore({});

    return store.dispatch(fetchThemeData()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      expect(fetch.mock.calls.length).toEqual(1);
    });
  });

  //Function contains fetch which sends data to another function, which then sends data to action creator function.
  it("fetchGameInfoFromAPI calls fetch, returns data and triggers setGameData", () => {
    fetch.mockResponse(
      JSON.stringify({
        body: [
          {
            id: 7346,
            name: "The Legend of Zelda: Breath of the Wild",
            slug: "the-legend-of-zelda-breath-of-the-wild",
            url:
              "https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild"
          }
        ]
      })
    );

    const expectedAction = [
      {
        type: "RECEIVE_GAMEDATA",
        payload: [
          {
            id: 7346,
            name: "The Legend of Zelda: Breath of the Wild",
            slug: "the-legend-of-zelda-breath-of-the-wild",
            url:
              "https://www.igdb.com/games/the-legend-of-zelda-breath-of-the-wild"
          }
        ]
      }
    ];
    const store = mockStore({});

    console.log(fetchGameInfoFromAPI());

    return store.dispatch(fetchGameInfoFromAPI("/games/zelda")).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe("actions - favs", () => {
  it("receiveGenreData returns expected action", () => {
    const action = receiveGenreData([
      {
        id: 31,
        name: "Drama"
      },
      {
        id: 28,
        name: "Business"
      }
    ]);

    const expectedAction = {
      type: "RECEIVE_GENREDATA",
      payload: [
        {
          id: 31,
          name: "Drama"
        },
        {
          id: 28,
          name: "Business"
        }
      ]
    };

    expect(action).toEqual(expectedAction);
  });

  it("receiveThemeData returns expected action", () => {
    const action = receiveThemeData([
      {
        id: 31,
        name: "Drama"
      },
      {
        id: 28,
        name: "Business"
      }
    ]);

    const expectedAction = {
      type: "RECEIVE_THEMEDATA",
      payload: [
        {
          id: 31,
          name: "Drama"
        },
        {
          id: 28,
          name: "Business"
        }
      ]
    };

    expect(action).toEqual(expectedAction);
  });
});
