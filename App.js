import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './src/_redux/store';

import home from './src/screen/home';
import listmenu from './src/screen/listmenu';
import menu from './src/screen/menu';
import bill from './src/screen/bill';
import done from './src/screen/done';
import order from './src/screen/order';

const AppNavigator = createStackNavigator({
  home: {
    screen: home,
    navigationOptions: {
      header: null,
    },
  },
  listmenu: {
    screen: listmenu,
    navigationOptions: {
      header: null,
    },
  },
  menu: {
    screen: menu,
    navigationOptions: {
      header: null,
    },
  },
  bill: {
    screen: bill,
    navigationOptions: {
      header: null,
    },
  },
  done: {
    screen: done,
    navigationOptions: {
      header: null,
    },
  },
  order: {
    screen: order,
    navigationOptions: {
      header: null,
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
export default App;
