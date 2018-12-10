import React, {Component} from 'react';
import './general.css';
import Comics from './Comics';
import Navigation from './Navigation';



class ComicMain extends Component {
    handleProfileChange() {
        console.log(1);
        this.state = {
            id: undefined
        };
    }

    render() {
        return (
            <div>
                <Navigation  isComic = "true" type={`Comic`} handleProfileChange = {this.handleProfileChange} {...this.state} />
                <Comics pathName = {this.props.location.pathname} />
            </div>     
        );
    }  
}

export default ComicMain;