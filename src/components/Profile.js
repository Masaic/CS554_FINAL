import React, { Component } from 'react';
import axios from 'axios';
import { Link, Element} from 'react-scroll';
import Loading from './Loading.js';
import './general.css';
import cookie from 'react-cookies';
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
        this.getData = this.getData.bind(this);

    }

    getData(heroId) {
        let ts = new Date().getTime();
        let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
        let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
        const response = axios.get(`https://gateway.marvel.com/v1/public/characters/${heroId}?${script}`);
        response.then((result) =>
            this.setState({ profile: result.data.data.results[0] })
        )
        let comments = api.getCommentsByComicId(heroId);
        comments.then((comment)=>{
            console.log(comment);
            // if(comment){
            //     this.setState()
            // }
        })
    }

    componentWillMount() {
        console.log('here1');
        this.getData(this.props.profileName);
        // let ts = new Date().getTime();
        // let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
        // let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
        // // let name = encodeURIComponent(this.props.profileName);
        // // console.log(name);
        // const response = axios.get(`https://gateway.marvel.com/v1/public/characters/${this.props.profileName}?${script}`);
        // response.then((result) =>
        //     this.setState({ profile: result.data.data.results[0] })
        // )
        // let comments = api.getCommentsByComicId(this.props.profileName);
        // comments.then((comment)=>{
        //     console.log(comment);
        // })
    }

    componentWillReceiveProps(next) {
        console.log('here2');
        this.getData(next.profileName);
        // let ts = new Date().getTime();
        // let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
        // let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
        // // let name = encodeURIComponent(next.profileName);
        // // console.log(name);
        // const response = axios.get(`https://gateway.marvel.com/v1/public/characters/${next.profileName}?${script}`);
        // response.then((result) =>
        //     this.setState({ profile: result.data.data.results[0] })
        // )
        // let comments = api.getCommentsByComicId(next.profileName);
        // console.log(comments);
    }

    render() {
        if(!this.state.profile){
            return (
                <div className = "pags">
                    <Loading />
                </div>
            )
        }
        console.log(this.state.profile.stories);
        return (
            <div className = "hero-detail">
                <div>
                <img className="detail-hero-img" src = {this.state.profile.thumbnail.path+`.`+this.state.profile.thumbnail.extension} alt={this.state.profile.name} />
                </div>
                <div className = "btn-group profile-top-2">
                    <Link className = "btn btn-primary text-white font-weight-bold" activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block' }}>
                        Description
                    </Link>

                    <Link className = "btn btn-primary text-white font-weight-bold" activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block'}}>
                        Stories
                    </Link>

                    <Link className = "btn btn-primary text-white font-weight-bold" activeClass="active" to="thridInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block' }}>
                        Comments
                    </Link>
                </div>
                <div>
                <Element name="test7" className="element profile-elements" id="containerElement" >
                        <Element className = "bg-success" name="firstInsideContainer" >
                            <div className = "passage-center">
                                {this.state.profile.description ? this.state.profile.description : (
                                    <div className = "font-weight-bold">Description inavailable</div>
                                )}
                            </div>
                            
                        </Element>

                        <Element name="secondInsideContainer" className = "bg-warning">
                        <div className = "passage-center">
                            {
                               this.state.profile.stories.items.length === 0 ? (
                                    <div className = "font-weight-bold">Stories inavailable</div>
                                ) : (
                                    <div>{this.state.profile.stories.items.map((item, index) => (
                                        <div key = {index}>
                                            <span>{item.name}</span>
                                        </div>
                                    ))}</div>
                                    )
                          }
                        </div>
                       
                            
                        </Element>

                        <Element name="thridInsideContainer" className = " min-height-profile">
                            <div className = "bg-info">
                                test-comment-panel
                                <ul>{this.state.comments.map((comment, index) => <li key={index}>{comment.name}</li>)}</ul>
                            </div>
                        </Element>
                    </Element>
                </div>

                
            </div>
        )
    }

}

export default Profile;


/* 

style={{
    position: 'relative',
    height: '200px',
    overflow: 'scroll',
    marginBottom: '100px'
}}

*/