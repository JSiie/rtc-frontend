import { combineReducers } from 'redux';

import {
    accountReducer,
 } from './accountreducers';
import {
    callReducer,
 } from './callreducers';
import roomReducer from './room-reducer';
import audioReducer from './audio-reducer';
import videoReducer from './video-reducer';


// Combine all the reducers
const rootReducer = combineReducers({
    accountReducer,
    callReducer,
    rooms: roomReducer,
    video: videoReducer,
    audio: audioReducer,
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;