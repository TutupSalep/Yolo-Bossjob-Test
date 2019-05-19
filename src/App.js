import React, { Component } from 'react';
import './App.css';

import Header from './shared/components/Header'
import Search from './shared/components/Search'
import Content from './shared/components/Content'
import {connect} from "react-redux";
import {searchJobCompany} from "./reducers/app-redux";


const mapStateToProps = (state) => ({
    dataSearch: state.dataSearch
});

const mapDispatchToProps = (dispatch) => ({
    searchJobCompany: (size,query,page) => {dispatch(searchJobCompany(size,query,page))}
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            dataSearch: null,
            searchText:''
        }
    }

    componentDidMount() {
        this.props.searchJobCompany(12,this.state.searchText,1);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({dataSearch: nextProps.dataSearch ? nextProps.dataSearch.response.data : null});
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // console.log('ganti props',nextProps,nextState);
        if (this.state == null)
            return true;

        if (this.state.searchText == nextState.dataSearch)
            return false;

        return true;
    }

    render() {
        if (this.state.dataSearch) {
            // console.log('rerender');
            return (
                <div className="App">
                    <div className="App-Wrapper">
                        <Header/>
                        <Search searchData={this.handleSearch}/>
                        <Content data={this.state.dataSearch} pagination={this.handlePaginate}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <div className="App-Wrapper">
                        <Header/>
                        <Search/>
                    </div>
                </div>
                )
        }
  }

  handleSearch = (value) => {
        // console.log(value);
      this.setState({searchText: value});
      this.props.searchJobCompany(12,value,1);
  };
  handlePaginate = (page) => {
        // console.log('page from content',page);
      this.props.searchJobCompany(12,this.state.searchText,page);
  };

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
