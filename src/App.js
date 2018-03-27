import React, { Component } from 'react';
import houses from './houses.svg';
import './App.css';
import AppMenuBar from './menu';
import LocationStore from './store/locationstore'

import {Provider} from 'mobx-react';

class App extends Component {
  render() {
    return (
      <Provider LocationStore={LocationStore}>
      <div className="App">
        <img src={houses} alt="header"/>
        <AppMenuBar/>
      </div>
      </Provider>
    );
  }
}

export default App;
