import React, { Component } from 'react';
import './App.css';
import Routes from './client/routes';

class App extends Component {
  render() {
    return (
      <div id="entire-app">
        <Routes />
      </div>
    );
  }
}

export default App;
