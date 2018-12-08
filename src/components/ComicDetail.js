import React, {Component} from 'react';
import imgNA from '../images/imgNA.jpg';
import './general.css';


class ComicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info
        }
    }

    render() {
        let imgSrc = this.state.info.images.length !== 0 ? `${this.state.info.images[0].path}.${this.state.info.images[0].extension}` : imgNA;
        return (
            <div>
                <div className = "row comic-detail">
                    <div className = "">
                        <img className = "detail-img" src = {imgSrc}/>
                    </div>
                    <div className = "comic-detail-info">
                        <h4>{this.state.info.title}</h4>
                        <div className = "detail-width"> 
                            <div>
                                <div className = "text-left">
                                    <label className = "labelLen text-right font-weight-bold">{this.state.info.dates[0].type}: </label>
                                    <label className = "comic-detail-info">  {this.state.info.dates[0].date}</label>
                                </div>
                                <div  className = "text-left">
                                    <label className = "labelLen text-right font-weight-bold">{this.state.info.dates[1].type}: </label>
                                    <label className = "comic-detail-info">  {this.state.info.dates[1].date}</label>
                                </div>
                                <div  className = "detail-width text-left">
                                    <label className = "labelLen text-right font-weight-bold">{this.state.info.prices[0].type}: </label>
                                    <label className = "comic-detail-info">${this.state.info.prices[0].price}</label>
                                </div>
                                <p>{this.state.info.description !== null ? this.state.info.description : 'Description not available'}</p>
                                <a className = "btn btn-primary text-white font-weight-bold" href = {document.referrer}>Back to comic list</a>
                            </div>
                           
                        </div>
                    </div>
                   
                        
                   
                       
                    
                    
                </div>
            </div>
        );
    };
}

export default ComicDetail;