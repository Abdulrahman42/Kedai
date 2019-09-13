import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {RESET} from '../redux/_actions/orders';
import {connect} from 'react-redux';
import { dateTime } from '../function'

class done extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
    };
  }
  logout = async () => {
    await AsyncStorage.clear();
    await this.props.dispatch(RESET(this.props.orders.cart));
    await this.props.navigation.navigate('home');
  };
  async componentDidMount() {
    const table = await AsyncStorage.getItem('tableNumber');
    this.setState({
      table,
    });
  }

  render() {
    return (
      <LinearGradient
        colors={['#DECBA4', '#3E5151']}
        style={styles.linearGradient}>
        <View>
          <Text style={{marginBottom: 15, color: 'white', textAlign: 'center'}}>
            {' '}
            PLEASE BRING THE IPAD TO THE CASHIER TO PROCCESS WITH THE PAYMENT{' '}
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 50, textAlign: 'center', color: '#d0d0d0'}}>
            #{this.state.table}
          </Text>
          <Text style={styles.textSmall}>THANK YOU</Text>
          <Text style={styles.textSmall}>Time Spend : {dateTime(this.props.timer.count)}</Text>
        </View>
        <View style={{marginTop: 50, alignItems: 'center'}}>
          <Image
            source={{
              uri:
                'https://webconveni.com/wp-content/uploads/2019/02/arigatou.png',
            }}
            style={{
              width: 140,
              height: 140,
            }}
          />
        </View>
        <View style={styles.backHome}>
          <TouchableOpacity
            style={{width: '50%'}}
            mode="Outlined"
            onPress={this.logout}>
            <Text style={{color: '#d0d0d0'}}>Back To Home</Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </LinearGradient>
    );
  }
}
const mapStateToProps = state => {
  return {
    menus: state.menus,
    transaction: state.transaction,
    orders: state.orders,
    timer: state.timer
  };
};

export default connect(mapStateToProps)(done);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  textSmall: {
    textAlign: 'center',
     color: '#d0d0d0'
  },
  backHome:{
    alignItems: 'center',
    alignSelf:'center',
     marginVertical: 10
  }
});
