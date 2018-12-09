import React, {Component} from 'react';
import ',/general.css';

class PaginationComics extends Component {
    constructor(props) {
        super(props);
        let urlArr = this.props.locayion.pathname.split('/');
        this.state = {
            curPage: urlArr[urlArr.length - 1]
        }
    }

    return
}