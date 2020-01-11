import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
 
import rootReducer from './combinereducers.js'; //Import the reducer
 
// Connect our store to the reducers
export default createStore(rootReducer, applyMiddleware(thunk, promise));