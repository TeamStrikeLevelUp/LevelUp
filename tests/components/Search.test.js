import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Search from "../../src/components/Search";

const mockProps = {
  gameData: [],
  gameFavourite: [],
  submitSearch: mockSubmitSearch,
  fetchGameInfo: mockFetchGameInfo,
  fetchReferenceData: mockFetchReferenceData
};

describe("Search", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<Search {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();

    // TODO: test gameData = "nothing found"
  });

  it("captures change input and passes it event handler", () => {
    const event = {
      target: {
        value: "grand theft auto"
      }
    };
    const handleChange = jest.fn();
    const wrapper = shallow(<Search {...mockProps} />);
    wrapper.find("input").simulate("change", event);
    expect(handleChange.mock.calls).toEqual([["grand theft auto"]]);
  });

  it("it calls submit handler and passes in searchGame", () => {
    const event = {
      preventDefault: jest.fn()
    };

    const wrapper = shallow(<Search {...mockProps} />);

    wrapper.find("form").simulate("submit", event);

    expect(mockProps.mockSubmitSearch.mock.calls).toEqual([["fifa"]]);
    expect(mockProps.mockSubmitSearch.mock.calls.length).toBe(1);

    // TODO: test fetchReferenceData
    // TODO: test fetchGameInfo
  });
});
