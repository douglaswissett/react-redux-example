import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './router'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}

export default App;
