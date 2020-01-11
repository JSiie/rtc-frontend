import { combineReducers } from 'redux';
import {
} from './accountactions';


 
let accountstate = {
    account:{
        userID: '',
    }
}


export const accountReducer = (state = accountstate, action) => {
    switch (action.type) {
        default:
            return state;
    }
};