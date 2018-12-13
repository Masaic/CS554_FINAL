import React, { Component } from 'react';
import axios from 'axios';
import { Link, Element } from 'react-scroll';
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
            comments: [],
            modalIndex: 0
        }
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;
        this.getData = this.getData.bind(this);
        this.renderComments = this.renderComments.bind(this);
        this.getComments = this.getComments.bind(this);
        this.heroRef = React.createRef();
        this.pdf = this.pdf.bind(this);
        this.handleIndexChange = this.handleIndexChange.bind(this);

    }

    // Handle the index of the information shown in the description modal.
    handleIndexChange(index) {
        this.setState({
            modalIndex: index
        });
    }

    getData(heroId) {
        let ts = new Date().getTime();
        let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
        let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
        let profile;
        let comics;
        const response = axios.get(`https://gateway.marvel.com/v1/public/characters/${heroId}?${script}`);
        response.then((result) => {
            // this.setState({ profile: result.data.data.results[0] })
            profile = result.data.data.results[0];
            console.log(profile);
            const comics = axios.get(`https://gateway.marvel.com/v1/public/characters/${heroId}/comics?format=comic&limit=10&${script}`)
            return comics
        }).then((result) => {
            // this.setState({ comics: result.data.data.results }, {profile: profile})
                 comics = result.data.data.results
                 let comments = api.getCommentsByComicId(heroId);
                 return comments
            }).then((comment) => {
                // console.log(comment);
                this.setState({ comments: comment,
                                profile: profile,
                                comics: comics  })
            });
           
    }

    getComments(heroId) {
        let comments = api.getCommentsByComicId(heroId);
        comments.then((comment) => {
            // console.log(comment);
            this.setState({ comments: comment })
        })
    }

    componentWillMount() {
        this.getData(this.props.profileName);
    }

    componentWillReceiveProps(next) {
        this.setState({ user: next.user });
        this.getData(next.profileName);
    }

    renderComments() {
            return (
                <Element name="thridInsideContainer" className = "min-height-profile">
                    <div>
                        {
                            this.state.comments.length === 0 ? (<div className = "font-weight-bold">Comments inavailable</div>) : (
                                <div className = "row passage-center">
                                    {
                                        this.state.comments.map((comment, index) => 
                                            <div key = {index} className = "mx-auto top-20 rounded bg-light comment-detail border shadow bottom-20"> 
                                                <div className = "bg-info text-white font-weight-bold">
                                                    {comment.userEmail}
                                                </div>
                                                <div>
                                                    {comment.comment}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            this.state.user ? 
                            <CommentForm heroId={this.props.profileName} user={this.state.user} rerender={this.getComments}></CommentForm>
                            : null
                        }
                    </div>
                </Element>
            )
       
    }

    async pdf() {
        console.log(this.heroRef.current);
        await api.generatePdf(this.heroRef.current);
    }

    render() {
        if (!this.state.profile) {
            return (
                <div className="pags">
                    <Loading />
                </div>
            )
        }
        // console.log(this.state.profile.stories);
        console.log(this.state.comics);
        return (
            <div>
            <div className="hero-detail" ref = {this.heroRef}>
                <div>
                    <img className="detail-hero-img" src={this.state.profile.thumbnail.path + `.` + this.state.profile.thumbnail.extension} alt={this.state.profile.name} />
                </div>
                <div className="btn-group profile-top-2">
                    <Link className="btn btn-primary text-white font-weight-bold" activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block' }}>
                        Description
                    </Link>

                    <Link className="btn btn-primary text-white font-weight-bold" activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block' }}>
                        Stories
                    </Link>

                    <Link className="btn btn-primary text-white font-weight-bold" activeClass="active" to="thridInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block' }}>
                        Comments
                    </Link>
                    <button className="btn btn-success font-weight-bold" onClick={this.pdf}>Download PDF</button>
                </div>
                <div>
                    <Element name="test7" className="element border bg-light profile-elements" id="containerElement" >
                        <Element className="bg-success rounded shadow" name="firstInsideContainer" >
                            <div className="passage-center">
                                {this.state.profile.description ? this.state.profile.description : (
                                    <div className="font-weight-bold element-center">Description inavailable</div>
                                )}
                            </div>

                        </Element>

                        <Element name="secondInsideContainer">
                            <div className="element-center row">
                                {
                                    this.state.profile.stories.items.length === 0 ? (
                                        <div className="font-weight-bold">Stories inavailable</div>
                                    ) : (   
                                            this.state.comics.map((item, index) => (
                                                <HeroComic key = {index} index = {index} handleIndexChange = {this.handleIndexChange} imgSrc={item.thumbnail.path + `.` + item.thumbnail.extension} title={item.title} description = {item.description}></HeroComic>
                                            ))
                                        )
                                }
                            </div>
                        </Element>
                        {this.renderComments()}
                    </Element>
                </div>
            </div>
            <div className="modal fade" id="comicDescription" tabIndex="-1" role="dialog" aria-labelledby="comicDescriptionTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="comicDescriptionTitle">{this.state.comics[this.state.modalIndex].title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            this.state.comics[this.state.modalIndex].description !== null
                            ?
                            this.state.comics[this.state.modalIndex].description
                            :
                            (<span>Discription inavailable</span>)
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
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