import React, {Component} from 'react';
import './general.css';
import Comics from './Comics';
import Navigation from './Navigation';



class ComicMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathName: this.props.location.pathname
        }
        this.handleProfileChange.bind(this);
    }
    
    handleProfileChange = async(path) => {
        console.log('ComicMain.handleSearch:',path);
        await this.setState({
            pathName: path
        });
    }

    render() {
        console.log("comic main 重新render了");
        return (
            <div>
                <Navigation  isComic = "true" type={`Comic`} handleProfileChange = {this.handleProfileChange} {...this.state} />
                <Comics handleProfileChange = {this.handleProfileChange} pathName = {this.state.pathName} />
            </div>     
        );
    }  
}

export default ComicMain;