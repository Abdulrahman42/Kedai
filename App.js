import React, {Component} from 'react';
import { YellowBox } from "react-native"

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {Provider} from 'react-redux';
import store from './src/redux/store';

import menunavigation from './src/navigation/menunavigation'
import index from './src/screen/menu/index'

const MainNav = createAppContainer(createSwitchNavigator({

  menunavigation: {
    screen: menunavigation
  },
        index: {
          screen: index
        },
})
)
YellowBox.ignoreWarnings([
  "Warning: ViewPagerAndroid has been extracted",
])


const App = () => {
return (
  <Provider store={store}>
    <MainNav />
  </Provider>
)
}
export default App
