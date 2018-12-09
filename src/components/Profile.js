import React, { Component } from 'react';
import axios from 'axios';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
const CryptoJS = require("crypto-js");
// const querystring = require("querystring");

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: undefined
        }
        this.PUBLIC_KEY = `cb14e7ba87e9828d048d677e1d1681dd`;
        this.PRIV_KEY = `aa9b09760131eac24ed73bff8b665e8fa27c8999`;

    }

    componentWillMount() {
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
        let ts = new Date().getTime();
        let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
        let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
        // let name = encodeURIComponent(next.profileName);
        // console.log(name);
        const response = axios.get(`https://gateway.marvel.com/v1/public/characters/${next.profileName}?${script}`);
        response.then((result) =>
            this.setState({ profile: result.data.data.results[0] })
        )
    }

    render() {
        if(!this.state.profile){
            return (
                <div>Loading</div>
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