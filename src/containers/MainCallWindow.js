import React, { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from '../reducers/store';
import { BrowserRouter,HashRouter, Switch, Route } from 'react-router-dom';
import InitCallPage from './InitCallPage';
import CallPage from './CallPage';


class MainCallWindow extends Component {

render() {
	return(
	<Provider store={store}>
	<HashRouter>
		<Switch>
			<Route exact path="/" component={InitCallPage} />
			<Route path="/r/:room" component={CallPage} />
		</Switch>
	</HashRouter>
	</Provider>
	);
};

}

export default MainCallWindow;