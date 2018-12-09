import React, { Component } from 'react';
import imgNA from '../images/imgNA.jpg';
import './general.css';


class ComicItem extends Component {
    constructor(props) {
        super(props);

        let imgSrc = props.info.images.length > 0 ? `${props.info.images[0].path}.${props.info.images[0].extension}` : imgNA;
        this.state = {
            info: props.info,
            src: imgSrc
        };
        //console.log(this.state.info);
        
    }

    render() {
        return (
            <div className = "mx-auto one-card">
                <div className="card card-config">
                    <img className="card-img-top card-img" src = {this.state.src} alt={this.state.info.title} />
                    <div className="card-body ">
                        <h5 className="card-title card-intro">{this.state.info.title}</h5>
                        <a href = {`/comics/detail/${this.state.info.id}`} className="btn btn-primary">Check details</a>
                    </div>
                </div>

            </div>
        );
    }
}


export default ComicItem;

