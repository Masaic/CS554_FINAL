import React, { Component } from 'react';
import './general.css';
import ComicDetail from './ComicDetail.js';
import ComicList from './ComicList.js';
import './general.css'

class Comics extends Component {
    constructor(props) {
        super(props);
        console.log('contructor');
        let url = this.props.pathName;
        let urlArr = url.split('/');
        let pageNum = undefined;
        let comicId = undefined;
        let target = undefined;

        if (url.indexOf('list') === -1) {
            comicId = urlArr[urlArr.length - 1];
            target = 'detail';
        } else {
            pageNum = parseInt(urlArr[urlArr.length - 1]);
            pageNum = url === '/comics/list' || url === '/comics/list/' ? 1 : pageNum;
            target = 'list';
        }
        this.state = {
            target: target,
            curPage: pageNum,
            comicId: comicId,
        };
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;
        this.handleDetail.bind(this);
    }


    handleProfileChange = () => {
        // This state change will force Profile component to be re-rendered
        // this.setState({ title: profileTitle });
        console.log(1);
    }

    handleDetail = async(tid) => {
        console.log('comics.handleDetail',tid);
        await this.setState({
            target:'detail',
            comicId: tid,
            curPage: undefined
        });
        // console.log('comics state:', this.state);
    }

    handlePage = async(pageNum) => {
        console.log('comics.handlePage', pageNum);
        await this.setState({
            target: 'list',
            comicId: undefined,
            curPage: pageNum
        });
        // console.log('comics state:', this.state);
    }
    
    render() {
        //console.log("Comic.js rendered");
        let isDetail = this.state.target === 'detail';
        return (
            <div>
            { 
                isDetail ?(
                    <ComicDetail handlePage = {this.handlePage} id = {this.state.comicId}/>
                )
                :(
                    <ComicList pathName = {this.props.pathName} curPage = {this.state.curPage} handleDetail = {this.handleDetail}/>
                )
            }
            </div>
        );
    }
}

export default Comics;