import React, { Component } from 'react';
import axios from 'axios';
import './general.css';
import ComicItem from './comicItem.js';
import Navigation from './Navigation';
import './general.css'
import { NavLink } from 'react-router-dom';
var CryptoJS = require("crypto-js");

class comicList extends Component {
    constructor(props) {
        super(props);
        let url = this.props.location.pathname;
        console.log(url);
        let urlArr = url.split('/');
        let pageNum = parseInt(urlArr[urlArr.length - 1]);
        pageNum = url === '/comics/' || url === '/comics' ? 1 : pageNum;
        this.state = {
            comicList: undefined,
            curPage: pageNum,
            title: "no title"
        }
        this.PUBLIC_KEY = `cb14e7ba87e9828d048d677e1d1681dd`;
        this.PRIV_KEY = `aa9b09760131eac24ed73bff8b665e8fa27c8999`;
    }

    handleProfileChange = profileTitle => {
        // This state change will force Profile component to be re-rendered
        this.setState({ title: profileTitle });
    }

    componentWillMount() {
        this.getComics();
    }

    async getComics() {
        try {
            let ts = new Date().getTime();
            let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
            let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
            let skip = ((this.state.curPage - 1) * 12) + '';
            const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?offset=${skip}&limit=12&${script}`);
            this.setState({ comicList: response.data.data.results });
        } catch (e) {
            console.log(e);
        }
    }
    
    render() {
       console.log(this.state.comicList);
        let pagination = null;
        let nextPage = `/comics/${this.state.curPage + 1}`;
        let prevPage = `/comics/${this.state.curPage - 1}`;
        if (this.state.curPage === 1) {
            pagination = (
                <div>
                    <ul className = "pagination">
                        <li className = "page-item">
                            <a className = "page-link" href = {nextPage}>Next page</a>
                        </li>
                        
                    </ul>
                </div>
            );
        } else {
            pagination = (
                <div>
                    <ul className = "pagination">
                        <li className = "page-item">
                            <a className = "page-link" href = {prevPage}>Privious page</a>
                        </li>
                        <li className = "page-item">
                            <a className = "page-link" href = {nextPage}>Next page</a>
                        </li>
                    </ul>
                </div>
            );
        }
        let temp = null;
        if (this.state.comicList === undefined) {
            return (
                <div>
                    <div>
                        <Navigation type={`Comic`} handleProfileChange={this.handleProfileChange} />
                    </div>
                    Still loading info.
                </div>
            );
        }
        return (
            
            <div>
                <div>
                    <Navigation type={`Comic`} handleProfileChange={this.handleProfileChange} />
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
                <div className = "justify-content-center">
                    { pagination } 
                </div>
               
            </div>
        );
    }
}

export default comicList;