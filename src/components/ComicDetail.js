import React, {Component} from 'react';
import imgNA from '../images/imgNA.jpg';
import axios from 'axios';
import './general.css';
import Loading from './Loading.js';
const CryptoJS = require("crypto-js");



class ComicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            info: undefined,
            imgSrc: undefined
        }
        console.log(this.state.id)
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;

    }

    async componentWillMount() {
        console.log('执行了Detail的WillMount');
        try {
            let ts = new Date().getTime();
            let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
            let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
            const response = await axios.get(`https://gateway.marvel.com/v1/public/comics/${this.state.id}?${script}`); 
            
            console.log(response.data.data.results[0]);
            await this.setState({ 
                info: response.data.data.results[0],
            });
            let imgSrc =  this.state.info.images.length !== 0 ? `${this.state.info.images[0].path}.${this.state.info.images[0].extension}` : imgNA
            await this.setState({
                imgSrc:imgSrc
            });
           console.log(this.state.info, this.state.imgSrc);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        console.log('detail render', this.state.id, this.state.info);
        return (
            !this.state.info ?
                (<Loading />)
            :(<div>
                <div className = "row comic-detail">
                    <div className = "">
                        <img className = "detail-img" src = {this.state.imgSrc} alt = "" />
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
                                <a className = "btn btn-primary text-white font-weight-bold" href = {document.referrer}>Back</a>
                            </div>
                           
                        </div>
                    </div>                  
                </div>
            </div>)
        );
    };
}

export default ComicDetail;