import React, { Component } from 'react';
import axios from 'axios';
import { Link, Element} from 'react-scroll';
import Loading from './Loading.js';
import CommentForm from './commentForm.js';
import './general.css';
import api from '../api';
import HeroComic from './HeroComic.js';
const CryptoJS = require("crypto-js");
// const querystring = require("querystring");

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: undefined,
            comics: [],
            user: props.user,
            comments: []
        }
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;
        this.getData = this.getData.bind(this);
        this.renderComments = this.renderComments.bind(this);
        this.getComments = this.getComments.bind(this);
        this.heroRef = React.createRef();
        this.pdf = this.pdf.bind(this);

    }

    getData(heroId) {
        let ts = new Date().getTime();
        let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
        let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
        const response = axios.get(`https://gateway.marvel.com/v1/public/characters/${heroId}?${script}`);
        response.then((result) =>
            this.setState({ profile: result.data.data.results[0] })
        )
        const comics = axios.get(`https://gateway.marvel.com/v1/public/characters/${heroId}/comics?format=comic&limit=10&${script}`);
        comics.then((result) =>
            this.setState({ comics: result.data.data.results })
        )
        this.getComments(heroId);
    }

    getComments(heroId) {
        let comments = api.getCommentsByComicId(heroId);
        comments.then((comment)=>{
            // console.log(comment);
            this.setState({comments: comment})
        })
    }

    componentWillMount() {
        this.getData(this.props.profileName);
    }

    componentWillReceiveProps(next) {
        this.setState({user:next.user});
        this.getData(next.profileName);
    }

    renderComments(){
        if(this.state.user){
            return (
                <Element name="thridInsideContainer" className = " min-height-profile">
                            <div className = "bg-info">
                                test-comment-panel
                                <ul>{this.state.comments.map((comment, index) => <li key={index}>{comment.userEmail}:<br />{comment.comment}</li>)}</ul>
                                <CommentForm heroId = {this.props.profileName} user = {this.state.user} rerender = {this.getComments}></CommentForm>
                            </div>
                </Element>
            )
        }else{
            return (
                <Element name="thridInsideContainer" className = " min-height-profile">
                            <div className = "bg-info">
                                test-comment-panel
                                <ul>{this.state.comments.map((comment, index) => <li key={index}>{comment.userEmail}:<br />{comment.comment}</li>)}</ul>
                            </div>
                </Element>
            )
        }
    }

    async pdf() {
        await api.generatePdf(this.heroRef.current);
    }

    render() {
        if(!this.state.profile){
            return (
                <div className = "pags">
                    <Loading />
                </div>
            )
        }
        // console.log(this.state.profile.stories);
        return (
            <div className = "hero-detail" ref = {this.heroRef}>
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
                    <button className = "btn btn-success font-weight-bold" onClick = {this.pdf}>Download PDF</button>
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
                        <div className = "passage-center row">
                            {
                               this.state.profile.stories.items.length === 0 ? (
                                    <div className = "font-weight-bold">Stories inavailable</div>
                                ) : (
                                    this.state.comics.map((item, index) => (
                                        <HeroComic imgSrc={item.thumbnail.path+`.`+item.thumbnail.extension} title={item.title}></HeroComic>
                                        // <div key = {index}>
                                        //     <span>{item.name}</span>
                                        // </div>
                                    ))
                                    )
                          }
                        </div>
                       
                        </Element>

                        {this.renderComments()}

                        {/* <Element name="thridInsideContainer" className = " min-height-profile">
                            <div className = "bg-info">
                                test-comment-panel
                                <ul>{this.state.comments.map((comment, index) => <li key={index}>{comment.name}</li>)}</ul>
                            </div>
                        </Element> */}
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