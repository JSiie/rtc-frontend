import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../reducers/store.js'; //Import the reducer
import InitCall from '../components/InitCall.js';


class InitCallPage extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <Provider store={store}>
                <InitCall/>
            </Provider>
        );
      }
}

export default InitCallPage;