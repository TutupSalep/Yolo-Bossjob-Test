import React from 'react'
import './Search.css'
import SearchLogo from "../../../assets/images/Search.png";

const ColoredLine = () => (
    <hr
        style={{
            color: "#DEDEDE",
            backgroundColor: "#DEDEDE",
            height: 1,
            width: 300,
            borderWidth: 0
        }}
    />
);

class Search extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <div className='search'>
                    <img src={SearchLogo} className="iconSearch" />
                    <input type="text"
                           className="searchBar"
                           placeholder="Search for job title or company name"
                        // onChange={event => {this.setState({query: event.target.value})}}
                           onKeyDown={this._handleKeyDown}/>
                </div>
                <ColoredLine/>
                <div className='buttonFilter'>
                    <div
                        className='box'
                        // style={{background:this.state.color}} onClick={this.changeColor}
                    >
                        Filter results
                    </div>
                </div>
            </div>
        );
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.searchData(e.target.value);
            // console.log(this.props);
        }
    }
}

Search.propTypes = {};

export default Search;