import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-community/async-storage';

import tabnavigation from '../../navigation/tabnavigation';
import {Button} from 'react-native-paper';
const AppIndex = createAppContainer(tabnavigation);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
      count: null,
    };
  }
  async componentDidMount() {
    const table = await AsyncStorage.getItem('tableNumber');
    this.setState({
      table,
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#e37171" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', color:'#d0d0d0', fontSize:18, paddingBottom: 5,}}>No: {this.state.table}</Text>
        </View>
        <AppIndex />
        <View>
          <View style={{flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 5,}}>
            <View style={{width:'100%' }}>
              <Button
                style={{backgroundColor: '#e37171'}}
                mode="contained"
                onPress={() => this.props.navigation.navigate('order')}>
                List Order
              </Button>
            </View>
            {/* <View style={{paddingHorizontal: 10, width: '40%'}}>
              <Button
                style={{backgroundColor: '#e37171'}}
                mode="contained"
                onPress={() => this.button()}>
                Confirm
              </Button>
            </View> */}
            {/* <View style={{width: '30%'}}> */}
              {/* <Button
                style={{backgroundColor: '#e37171'}}
                
                mode="contained"
                onPress={() => this.props.navigation.navigate('bill')}>
                 VIew Bill
              </Button> */}
              {/* <MaterialIcons onPress={() => this.props.navigation.navigate('bill')} name="add-shopping-cart" size={40} color={'red'} />
            </View> */}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e37171',
    paddingHorizontal: 18,
    paddingTop: 5,
  },
});
