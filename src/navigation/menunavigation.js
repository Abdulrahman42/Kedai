import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import home from '../screen/home';
import index from '../screen/menu/index';
import order from '../screen/order'
import done from '../screen/done'
import bill from '../screen/bill'

const stackpublic = createStackNavigator({
  home: {
    screen: home,
    navigationOptions: {
      header: null,
    },
  },
  index: {
    screen: index,
    navigationOptions: {
      header: null,
    },
  },
  order: {
    screen: order,
    navigationOptions: {
      header: null
    }
  },
  bill:{
    screen: bill,
      navigationOptions:{
        header: null
    }
  },
  done: {
    screen: done,
    navigationOptions:{
      header: null,
      gesturesEnabled: false
    }
  }
});

const AppContainer = createAppContainer(stackpublic);

class menunavigation extends Component {
  render() {
    return <AppContainer />;
  }
}
export default menunavigation;
