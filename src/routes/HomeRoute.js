import React from "react";
import ForumLinks from "../components/ForumLinks";

class HomeRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home">
                <div>Home route comp here.</div>
                <ForumLinks />
            </div>
        );
    }
}

export default HomeRoute;
