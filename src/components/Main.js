import React, { Component } from 'react';
// import Searchbar from './Searchbar';
import Profile from './Profile';
import Navigation from './Navigation';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "1009610"
        }
    }

    handleProfileChange = profileName => {
        // This state change will force Profile component to be re-rendered
        this.setState({ name: profileName });
    }

    render() {
        return (
            <div>
                <div>

                    <Navigation type={`Hero`} handleProfileChange={this.handleProfileChange} {...this.state}/>

                </div>
                <div className="container">
                    {/* <div className="row">
                        <Searchbar handleProfileChange={this.handleProfileChange} />
                    </div> */}
                    <div className="row">
                        <Profile profileName={this.state.name} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;