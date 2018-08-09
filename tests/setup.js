import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import mockFetch from "jest-fetch-mock";

global.fetch = mockFetch;

Enzyme.configure({ adapter: new Adapter() });
