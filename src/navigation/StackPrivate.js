import React, { Component} from 'react'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator, createSwitchNavigator } from "react-navigation";

import listmenu from '../screen/listmenu'
import bill from '../screen/bill'
import order from '../screen/order'
import done from '../screen/done'

const SwitchBill = createSwitchNavigator({
  order:order,
  bill:bill,
  done:done
},{
  initialRouteName:'order'
})

export default StackPrivate = createStackNavigator(
  {
    listmenu:listmenu,
    bill:bill,
    SwitchBill:SwitchBill
  }, {
    initialRouteName: "listmenu",
    headerMode: 'none'
  }
);