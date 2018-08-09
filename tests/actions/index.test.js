import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";

import {
  addFavouriteToDB,
  addFavTwitchToDB,
  fetchGameFavourite,
  receiveGameFavourites,
  fetchTwitchFavourite,
  receiveTwitchFavourites,
  fetchGenreData,
  fetchThemeData
} from "../../src/actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions - favs", () => {
  beforeEach(() => {
    fetch.resetMocks();
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
        body: {
          id: 1,
          title: "The Adventures of Robin Hood",
          igdb_id: 2301,
          id: 1,
          game_id: 1,
          gamer_id: 1
        }
      })
    );

    const expectedActions = [
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
      expect(store.getActions()).toEqual(expectedActions);
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

    const expectedActions = [
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
      expect(store.getActions()).toEqual(expectedActions);
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

  //Check with Sheila

  it("fetchGenreData calls fetch, returns data and triggers receiveGenreData", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        body: {}
      })
    );

    const expectedActions = [
      {
        type: "RECEIVE_GENREDATA",
        payload: {}
      }
    ];
    const store = mockStore({});

    return store.dispatch(fetchGenreData()).then(data => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(fetch.mock.calls.length).toEqual(1);
    });
  });

  it("fetchThemeData calls fetch, returns data and triggers receiveThemeData", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        body: {}
      })
    );

    const expectedActions = [
      {
        type: "RECEIVE_THEMEDATA",
        payload: {}
      }
    ];
    const store = mockStore({});

    return store.dispatch(fetchThemeData()).then(data => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(fetch.mock.calls.length).toEqual(1);
    });
  });
});

//fetchGameInfoFromAPI, setGameData, receiveGameData
