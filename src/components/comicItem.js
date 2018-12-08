import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import imgNA from '../images/imgNA.jpg';
import './general.css';


class comicItem extends Component {
    constructor(props) {
        super(props);
        let imgSrc = props.info.images.length > 0 ? `${props.info.images[0].path}.${props.info.images[0].extension}` : imgNA;
        this.state = {
            info: props.info,
            src: imgSrc
        };
        console.log(this.state.info);
        
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

export default comicItem;

/*


<div className="card" style = {{'width': '18rem'}}>
                <img className="card-img-top" src = {this.state.src} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <NavLink to = {`/${this.state.info.images[0].path}`} className="btn btn-primary">Go somewhere</NavLink>
                </div>
                </div>


*/