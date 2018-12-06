import React, { Component } from 'react';
import './Searchbar.css';
import axios from 'axios';
import Downshift from 'downshift';
var CryptoJS = require("crypto-js");

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: undefined,
            searchData: undefined,
            items: []
        }
        this.PUBLIC_KEY = `cb14e7ba87e9828d048d677e1d1681dd`;
        this.PRIV_KEY = `aa9b09760131eac24ed73bff8b665e8fa27c8999`;
    }

    async getHeros() {

    }

    inputOnChange(event) {
        if (!event.target.value) {
            return;
        }
        this.fetchMovies(event.target.value);
    }

    handleChange = (e) => {
        let value = e.target.value;
        this.setState({ searchTerm: value }, () => {
            this.searchHeros();
        });
    }

    async searchHeros() {
        if (this.state.searchTerm) {
            try {
                let ts = new Date().getTime();
                let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
                let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${this.state.searchTerm}&orderBy=name&limit=6&${script}`);
                this.setState({ searchData: response.data });
                let item = [];
                if (this.state.searchData.data.results) {
                    this.state.searchData.data.results.map(heros => {
                        let name = heros.name;
                        item.push({ value: `${name}` })
                    })
                    this.setState({ items: item });
                    console.log(this.state.items);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    render() {
        return (
            <Downshift
                onChange={selection => {
                    alert(`You selected ${selection.value}`);
                    let profileName = selection.value;
                    this.props.handleProfileChange(profileName);
                    }
                }
                itemToString={item => (item ? item.value : '')}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                }) => (
                        <div className = "input-group" style={{position: `relative`}}>
                            <div className = "input-group-append">
                                <label className = "font-weight-bold input-group-text" {...getLabelProps()}>Search: </label>
                            </div>
                            <input className = "form-control" {...getInputProps({
                                onChange: this.handleChange
                            })} />
                    
                            
                            {isOpen ? (
                                <div>
                                    <div className="downshift-dropdown">
                                        {this.state.items
                                            .filter(item => !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase()))
                                            .map((item, index) => (
                                                <div className="dropdown-item"
                                                    {...getItemProps({
                                                        key: item.value,
                                                        index,
                                                        item,
                                                        style: {
                                                            backgroundColor:
                                                                highlightedIndex === index ? 'lightgray' : 'white',
                                                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                        },
                                                    })}
                                                >
                                                    {item.value}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}
            </Downshift>
        )
    }
}

export default Searchbar;

