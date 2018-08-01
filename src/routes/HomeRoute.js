import React from "react";
import Search from "../components/Search";
import TwitchContainer from "../components/TwitchContainer";
import ForumLinks from "../components/ForumLinks";

class HomeRoute extends React.Component {
    render() {
        return (
            <div className="home">
                <div>Home route comp here.</div>
                <Search />
                <TwitchContainer />
                <ForumLinks />
            </div>
        );
    }
}

export default HomeRoute;
