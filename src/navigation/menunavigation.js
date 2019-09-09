import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import home from '../screen/home';
import index from '../screen/menu/index';
// import done from '../screen/done'
// import bill from '../screen/bill'
// import order from '../screen/order'

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
    // },
    // done:{
    //   screen:done
    // },
    // bill:{
    //   screen: bill
    // },
    // order:{
    //   screen: order
    // }
  },
});

const AppContainer = createAppContainer(stackpublic);

class menunavigation extends Component {
  render() {
    return <AppContainer />;
  }
}
export default menunavigation;
