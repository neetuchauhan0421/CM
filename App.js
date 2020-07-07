/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Platform} from 'react-native';
import AppNavigator from './components/AppNavigator.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './reducers/Reducer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  store = createStore(AppReducer)
  constructor() {
    super();
    this.state = {
      
    }
  }
  
  render() {
    return (
      <Provider store={ this.store }>
        <AppNavigator/>
        </Provider>
      );
  }
}
