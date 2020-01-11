import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MainCallWindow from './containers/MainCallWindow.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <MainCallWindow></MainCallWindow>
      </div>
    );
  }
}

export default App;
