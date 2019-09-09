import {StyleSheet} from 'react-native';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import Allmenu from '../screen/menu/allmenu';
import Food from '../screen/menu/food';
import Drink from '../screen/menu/drink';
import Dessert from '../screen/menu/dessert';
// import done from '../screen/done';
// import bill from '../screen/bill';
// import order from '../screen/order';
// import index from '../screen/menu/index'

const tabnavigation = createMaterialTopTabNavigator(
  {
    // Allmenu: {
    //   screen: Allmenu,
    //   navigationOptions: {
    //     tabBarLabel: 'ALL',
    //   },
    // },
    Food: {
      screen: Food,
      navigationOptions: {
        tabBarLabel: 'Food',
      },
    },
    Dessert: {
      screen: Dessert,
      navigationOptions: {
        tabBarLabel: 'Dessert',
      },
    },
    Drink: {
      screen: Drink,
      navigationOptions: {
        tabBarLabel: 'Drink',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#C40C42',
      inactiveTintColor: 'grey',
      style: {
        borderBottomColor: '#C40C42',
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        shadowOffset: {width: 6, height: 6},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 6,
        paddingTop: 10,
      },
    },
  },
);
const stackResto = createStackNavigator(
  {
    Main: {
      screen: tabnavigation,
    },
    // order: {
    //   screen: order,
    // },
    // bill: {
    //   screen: bill,
    // },
    // done: {
    //   screen: done,
    // },
    // index:{
    //     screen: index
    // }
  },
  {
    headerMode: 'screen',
    mode: 'modal',
    headerMode: 'none',
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default stackResto
