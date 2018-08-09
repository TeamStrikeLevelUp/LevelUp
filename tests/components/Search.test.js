import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Search from "../../src/components/Search";

describe("Search", () => {
  it("matches the snapshot", () => {
    const treew = renderer.create(<Search />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("captures change input and passes it event handler", () => {
    const event = {
      target: {
        value: "grand theft auto"
      }
    };
    const handleChange = jest.fn();
    const wrapper = shallow(<Search handleChange={handleChange} />);
    wrapper.find("input").simulate("change", event);
    expect(handleChange.mock.calls).toEqual([["grand theft auto"]]);
  });

  it("it calls submit handler and passes in searchGame", () => {
    const event = {
      preventDefault: jest.fn()
    };

    const mockSubmitSearch = jest.fn();

    const wrapper = shallow(
      <Search submitSearch={mockSubmitSearch} searchGame={"fifa"} />
    );

    wrapper.find("form").simulate("submit", event);

    expect(mockSubmitSearch.mock.calls).toEqual([["fifa"]]);
    expect(mockSubmitSearch.mock.calls.length).toBe(1);
  });
});
