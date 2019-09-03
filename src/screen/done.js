import React, { Component } from 'react';
import { View, Text , StyleSheet, Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';


export default class done extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
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
      <LinearGradient
        colors={['#3E5151', '#DECBA4']}
        style={styles.linearGradient}>

      <View >
        <Text style={{marginBottom:15 ,color:'white',textAlign:'center'}}> PLEASE BRING THE IPAD TO THE CASHIER TO PROCCESS WITH THE PAYMENT </Text>
      </View>
      <View>
      <Text style={{fontSize:50, textAlign:'center', color:'white'}}>#{this.state.table}</Text>
      <Text style={{ textAlign:'center', color:'white'}}>THANK YOU</Text>
      </View>
      <View style={{marginTop:50, alignItems:"center"}}>
          <Image
            source={{
              uri:
                'https://webconveni.com/wp-content/uploads/2019/02/arigatou.png'  }}
            style={{
              width: 140,
              height: 140,
            }}
          />
        </View> 
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient:{
    flex:1,
    justifyContent:'center',
    alignContent:'center'
  }
})