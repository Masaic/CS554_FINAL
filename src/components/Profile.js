import React, { Component } from 'react';
import axios from 'axios';
import { Link, Element} from 'react-scroll';
import Loading from './Loading.js';
import './general.css';
import api from '../api';
const CryptoJS = require("crypto-js");
// const querystring = require("querystring");

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: undefined,
            comments: []
        }
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;

    }

    componentWillMount() {
        console.log('here1');
        let ts = new Date().getTime();
        let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
        let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
        // let name = encodeURIComponent(this.props.profileName);
        // console.log(name);
        const response = axios.get(`https://gateway.marvel.com/v1/public/characters/${this.props.profileName}?${script}`);
        response.then((result) =>
            this.setState({ profile: result.data.data.results[0] })
        )
    }

    componentWillReceiveProps(next) {
        console.log('here2');
        let ts = new Date().getTime();
        let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
        let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
        // let name = encodeURIComponent(next.profileName);
        // console.log(name);
        const response = axios.get(`https://gateway.marvel.com/v1/public/characters/${next.profileName}?${script}`);
        response.then((result) =>
            this.setState({ profile: result.data.data.results[0] })
        )
        let comments = api.getCommentsByComicId(next.profileName);
    }

    render() {
        if(!this.state.profile){
            return (
                <div className = "pags">
                    <Loading />
                </div>
            )
        }
        return (
            <div style={{ margin: '0 auto' }}>
                <div>
                <img className="card-img-top card-img" src = {this.state.profile.thumbnail.path+`.`+this.state.profile.thumbnail.extension} alt={this.state.profile.name} />
                </div>
                <Link activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '20px' }}>
                    Go to description
                </Link>

                <Link activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '20px' }}>
                    Go to stories
                </Link>

                <Element name="test7" className="element" id="containerElement" style={{
                    position: 'relative',
                    height: '200px',
                    overflow: 'scroll',
                    marginBottom: '100px'
                }}>

                    <Element name="firstInsideContainer" style={{
                        marginBottom: '200px'
                    }}>
                        {this.state.profile.description}
                </Element>

                    <Element name="secondInsideContainer" style={{
                        marginBottom: '200px'
                    }}>
                        <ul>{this.state.profile.stories.items.map((item, index) => <li key={index}>{item.name}</li>)}</ul>
                </Element>
                </Element>
            </div>
        )
    }

}

export default Profile;