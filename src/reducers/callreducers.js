import { combineReducers } from 'redux';
import {
    UPDATE_ROOM_ID,
} from './callactions';

let callstate = {
    call:{
        roomID: 1,
    }
}


export const callReducer = (state = callstate, action) => {
    switch (action.type) {
        case UPDATE_ROOM_ID:
            state = Object.assign({}, state, {});
            state.call.roomID = action.payload;
            return state;
        default:
            return state;
    }
};
 