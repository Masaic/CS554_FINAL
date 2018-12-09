import React, { Component } from 'react';
import axios from 'axios';
import './general.css';
import Loading from './Loading.js';
import ComicItem from './ComicItem.js';
import Navigation from './Navigation.js';
import ComicDetail from './ComicDetail.js';
import './general.css'

var CryptoJS = require("crypto-js");

class Comics extends Component {
    constructor(props) {
        super(props);
        console.log('contructor');
        let url = this.props.location.pathname;
        let urlArr = url.split('/');
        let pageNum = -1;
        let comicId = undefined;
        let target = undefined;

        if (url.indexOf('list') === -1) {
            comicId = urlArr[urlArr.length - 1];
            //console.log(url,comicId);
            target = 'detail';
        } else {
            pageNum = parseInt(urlArr[urlArr.length - 1]);
            pageNum = url === '/comics/' || url === '/comics' ? 1 : pageNum;
            target = 'list';
        }
        
        this.state = {
            //user: this.props.user,
            target: target,
            comicList: undefined,
            comicInfo: undefined,
            curPage: pageNum,
            comicId: comicId,
        };
        this.PUBLIC_KEY = `cb14e7ba87e9828d048d677e1d1681dd`;
        this.PRIV_KEY = `aa9b09760131eac24ed73bff8b665e8fa27c8999`;
    }

    componentWillMount() {
        if (!this.isMounted && this.state.target === 'list') this.getComics();
        else if (!this.isMounted)this.getComicDetail();
    }


    handleProfileChange = () => {
        // This state change will force Profile component to be re-rendered
        // this.setState({ title: profileTitle });
        console.log(1);
    }

    

    async getComics() {
        try {
            let ts = new Date().getTime();
            let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
            let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
            let skip = ((this.state.curPage - 1) * 12) + '';
            const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?offset=${skip}&limit=12&${script}`);
            this.setState({ comicList: response.data.data.results });
            //console.log(this.state.comicList);
        } catch (e) {
            console.log(e);
        }
    }

    async getComicDetail() {
        try {
            let ts = new Date().getTime();
            let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
            let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
            const response = await axios.get(`https://gateway.marvel.com/v1/public/comics/${this.state.comicId}?${script}`);
            this.setState({ comicInfo: response.data.data.results[0]});
        } catch (e) {
            console.log(e);
        }
    }
    
    render() {
        console.log("Comic.js rendered");
        let noInfo = (this.state.target === 'list' && this.state.comicList === undefined )|| (this.state.target === 'detail' && this.state.comicInfo === undefined);
        let isDetail = this.state.target === 'detail';
        let pagination = null;
        let nextPage = `/comics/list/${this.state.curPage + 1}`;
        let prevPage = `/comics/list/${this.state.curPage - 1}`;
        if (this.state.curPage === 1) {
            pagination = (
                <div>
                    <ul className = "pagination">
                        <li className = "page-item">
                            <a className = "page-link" href = {nextPage}>Next</a>
                        </li>                      
                    </ul>
                </div>
            );
        } else {
            pagination = (
                <div>
                    <ul className = "pagination">
                        <li className = "page-item">
                            <a className = "page-link" href = {prevPage}>Privious</a>
                        </li>
                        <li className = "page-item">
                            <a className = "page-link" href = {nextPage}>Next</a>
                        </li>
                    </ul>
                </div>
            );
        }


        return (
            <div>
            {
                noInfo ? (
                    <div>
                        <div>
                            <Navigation  isComic = "true" type={`Comic`} handleProfileChange={this.handleProfileChange} />
                        </div>
                        <Loading />
                    </div>
                ): 
                    isDetail ?(
                        <div>
                            <div>
                                <Navigation  isComic = "true" type={`Comic`} handleProfileChange={this.handleProfileChange} />
                            </div>
                            <ComicDetail info = {this.state.comicInfo}/>
                        </div>
                    )
                    :(
                        <div>
                            <div>
                                <Navigation  isComic = 'true' type={`Comic`} handleProfileChange={this.handleProfileChange} />
                            </div>
                            <div className = "card-list-config row">
                                {
                                    this.state.comicList.map((arr, index) => {
                                        return (
                                            <ComicItem info = {arr} key = {index} />
                                        );
                                    })
                                }
                            </div>
                            <div className = "pags">
                                { pagination } 
                            </div>
                        </div>
                    )
            }
            </div>
        );
    }
}

export default Comics;