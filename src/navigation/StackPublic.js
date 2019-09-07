import React from 'react'
import { createStackNavigator } from 'react-navigation'

import home from '../screen/home'

export default StackPublic = createStackNavigator(
  {
    home:home
  }, {
    initialRouteName: "home",
    headerMode: 'none'
  }
);