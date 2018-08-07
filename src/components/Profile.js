import React from "react";


class Profile extends React.Component {

    constructor(){
        super()
        this.state={profile:{}}
    }

    componentDidMount(){
     fetch(`/api/profile/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(json => this.setState({profile: json}));
    }

    render(){
        console.log(this.state.profile)
        return(
            <div>
                name: {this.state.profile.gamer_name}
            </div>
        )
    }

}

export default Profile;