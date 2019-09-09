import {createStackNavigator, createAppContainer} from 'react-navigation';
import {YellowBox} from 'react-native';

import home from './home';
import menu from './menu';
// import order from './order';
// import bill from './bill';
// import done from './done';

const Navigation = createStackNavigator(
  {
    home: home,
    menu: menu,
    // Order: order,
    // Bill: bill,
    // Checkout: done,
  },
  {
    initialRouteName: 'home',
  },
);
YellowBox.ignoreWarnings(['Warning: ViewPagerAndroid has been extracted']);

export default createAppContainer(Navigation);
