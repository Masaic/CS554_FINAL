import React, {Component} from 'react';
import imgNA from '../images/imgNA.jpg';
import './general.css';


class ComicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info
        }
        console.log(this.state.info);
    }

    render() {
        let imgSrc = this.state.info.images.length !== 0 ? `${this.state.info.images[0].path}.${this.state.info.images[0].extension}` : imgNA;
        return (
            <div>
                <div>
                    <img className = "detail-img" src = {imgSrc}/>
                </div>
            </div>
        );
    };
}

export default ComicDetail;