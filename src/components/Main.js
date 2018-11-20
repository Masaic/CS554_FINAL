import React, { Component } from 'react';
import Searchbar from './Searchbar';
import Profile from './Profile';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "no name"
        }
    }

    handleProfileChange = profileName => {
        // This state change will force Profile component to be re-rendered
        this.setState({ name: profileName });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Searchbar handleProfileChange={this.handleProfileChange} />
                </div>
                <div className="row"
                    >
                    <Profile profileName={this.state.name} />
                </div>
            </div>
        );
    }
}

export default Main;