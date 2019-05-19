import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';

import API from "../api/API";

//
// Initial State...
//

const initialState = {

};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "Response_Search":
            return {...state, dataSearch:action};
        case "Error":
          return {...state, dataError:action};
        default:
            return state;
    }
};

//
// Store...
//

export let store = compose(
  applyMiddleware(thunkMiddleware),
  autoRehydrate()
)(createStore)(reducer);

// window.persistor = persistStore(store, { storage: localStorage, whitelist: [/*app-specific keys*/] }, (a, b) => {
//     console.log('Redux-Persist loaded state');
// });

//
// Action Creators...
//

//
// Search Action
//

const searchJobCompany = (size, query, page) => {
  return function (dispatch) {
    API.searchJobCompany(size, query, page)
      .then((response) => {
        console.log(response);
        return dispatch({type: 'Response_Search',response})
      })
      .catch((error) => {
        if(error){
          return dispatch({type: 'Error', error})
        }else if(error){
          var errorResponse =  error.response;
          return dispatch ({type: 'Error', errorResponse})
        }
      });
  }
};

export {
    searchJobCompany
};
