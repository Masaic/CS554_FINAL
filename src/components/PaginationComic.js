import React, {Component} from 'react';
import './general.css';

class PaginationComics extends Component {
    constructor(props) {
        super(props);
        let pageNum = this.props.curPage;
        let startNum = pageNum % 5 == 0 ? pageNum - 4 : pageNum - pageNum % 5 + 1;
        this.state = {
            curPage: pageNum,
            startPage: startNum,
        }
    }

    render() {
        return (
            <nav>
                <ul className = "pagination">
                    {
                        this.state.curPage !== 1 ? 
                        <li className = "page-item">
                            <a className = "page-link" href = {`/comics/list/${(this.state.curPage - 1) + ''}`}>Previous</a>
                        </li>
                        : null
                    }
                    <li className = {this.state.startPage === this.state.curPage? "page-item active" : "page-item"}><a className = "page-link" href = {`/comics/list/${this.state.startPage}`}>{this.state.startPage}</a></li>
                    <li className = {this.state.startPage + 1 === this.state.curPage? "page-item active" : "page-item"}><a className = "page-link" href = {`/comics/list/${this.state.startPage + 1}`}>{this.state.startPage + 1}</a></li>
                    <li className = {this.state.startPage + 2 === this.state.curPage? "page-item active" : "page-item"}><a className = "page-link" href = {`/comics/list/${this.state.startPage + 2}`}>{this.state.startPage + 2}</a></li>
                    {
                        this.state.startPage === 3596 ? null : (<li className = {this.state.startPage + 3 === this.state.curPage? "page-item active" : "page-item"}><a className = "page-link" href = {`/comics/list/${this.state.startPage + 3}`}>{this.state.startPage + 3}</a></li>)
                    }
                    {
                        this.state.startPage === 3596 ? null : (<li className = {this.state.startPage + 4 === this.state.curPage? "page-item active" : "page-item"}><a className = "page-link" href = {`/comics/list/${this.state.startPage + 4}`}>{this.state.startPage + 4}</a></li>)
                    }
                    
                    {
                        this.state.curPage !== 3598 ? 
                        <li className = "page-item">
                            <a className = "page-link" href = {`/comics/list/${(this.state.curPage + 1) + ''}`}>Next</a>
                        </li>
                        : null
                    }
                </ul>
            </nav>
        );
    }
}

export default PaginationComics;