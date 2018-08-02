import React from "react";
import SearchContainer from "../containers/SearchContainer";
import TwitchContainer from "../components/TwitchContainer";
import ForumLinks from "../components/ForumLinks";

class HomeRoute extends React.Component {
    render() {
        return (
            <div className="home">
                <div>Home route comp here.</div>
                <SearchContainer />
                <TwitchContainer />
                <ForumLinks />
            </div>
        );
    }
}

export default HomeRoute;
