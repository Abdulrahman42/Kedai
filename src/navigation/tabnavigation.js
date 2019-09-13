import React, { Component } from 'react'
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/Entypo'

import Food from '../screen/menu/food';
import Drink from '../screen/menu/drink';
import Dessert from '../screen/menu/dessert';


const tabnavigation = createMaterialTopTabNavigator({
  Food: {
    screen: Food,
    navigationOptions: {
        tabBarLabel: "Food",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="local-dining" size={20} color={tintColor} />
        )
    }
},
Drink: {
    screen: Drink,
    navigationOptions: {
        tabBarLabel: "Drink",
        tabBarIcon: ({ tintColor }) => (
            <Icons name="drink" size={20} color={tintColor} />
        )
    }
},
Dessert: {
    screen: Dessert,
    navigationOptions: {
        tabBarLabel: "Dessert",
        tabBarIcon: ({ tintColor }) => (
            <Icons name="cake" size={20} color={tintColor} />
        )
    }
}
}, {
    tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'silver',
        labelStyle: {
            fontSize: 10
        },
        showLabel: true,
        style: {
            backgroundColor: 'white',
            elevation: 0
        }, indicatorStyle: {
            backgroundColor: 'red'
        },
        showIcon: true
    }
}
)

export default AppIndex = createAppContainer(tabnavigation)
