import React, { Component } from 'react';
import axios from 'axios';
import './general.css';
import ComicItem from './comicItem.js';
import Navigation from './Navigation';
var CryptoJS = require("crypto-js");

class comicList extends Component {
    constructor(props) {
        super(props);
        let url = this.props.location.pathname;
        let urlArr = url.split('/');
        let pageNum = parseInt(urlArr[urlArr.length - 1]);
        
        this.state = {
            comicList: undefined,
            curPage: pageNum,
        }
        this.PUBLIC_KEY = `cb14e7ba87e9828d048d677e1d1681dd`;
        this.PRIV_KEY = `aa9b09760131eac24ed73bff8b665e8fa27c8999`;
    }

    async componentWillMount() {
        await this.getComics();
        console.log(this.state.comicList);
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
        let nextPage = `/comicList/${parseInt(this.state.curPage) + 1}`;
        let prevPage = `/comicList/${parseInt(this.state.curPage) - 1}`;
        if (this.state.curPage === '1') {
            pagination = (
                <div>
                    <a className = "pagination" href = {nextPage} className = 'btn btn-primary'>Next page</a>
                </div>
            );
        } else {
            pagination = (
                <div>
                    <a className = "pagination" href = { prevPage } className = 'btn btn-primary'>Previous page</a>
                    <a className = "pagination" href = { nextPage } className = 'btn btn-primary'>Next page</a> 
                </div>
            );
        }
        let temp = null;
        if (this.state.comicList === undefined) {
            return (
                <div>
                    <div>
                        <Navigation handleProfileChange={this.handleProfileChange} />
                    </div>
                    Still loading info.
                </div>
            );
        }
        return (
            
            <div>
                <div>
                    <Navigation handleProfileChange={this.handleProfileChange} />
                </div>
                <div>
                    {
                        this.state.comicList.map((arr, index) => {
                            return (
                                <ComicItem info = {arr} key = {index} />
                            );
                        })
                    } 
                </div>
                <div>
                { pagination }  
                </div>
            </div>
        );
    }
}

export default comicList;