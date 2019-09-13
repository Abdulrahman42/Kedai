import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import AppIndex from '../../navigation/tabnavigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {timerOn, setTimer} from '../../redux/_actions/timer';
import { dateTime } from '../../function'

class index extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
      isi: false,
      time: 0,
    };
  }
  timer = async () => {
    await this.setState({
      time: this.state.time + 1,
    });
    await this.props.dispatch(timerOn(this.state.time));
  };

  async componentDidMount() {
    const table = await AsyncStorage.getItem('tableNumber');
    this.setState({
      table,
    });
    this.set = setInterval(this.timer, 1000);
    await this.props.dispatch(setTimer(this.set));
  }
  loading = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator size={40} color="#e37171" />
      </View>
    );
  };

  render() {
    // console.warn(this.state.table)
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor="#e37171" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={{color: '#d0d0d0', fontWeight: 'bold', marginRight: 10}}>
            <Icon name="table" size={14} /> No: {this.state.table}
          </Text>
          <Text style={{color: '#d0d0d0'}}>
            {' '}
            <Icon name="clock" size={14} />
            &nbsp;
            {/* {this.state.minute}m:{this.state.second}s */}
            {dateTime(this.state.time)}
          </Text>
        </View>

        <AppIndex />
        {this.props.orders.cart == 0 ? (
          <View
            style={styles.footer}>
            <View style={{width: '100%', marginBottom: 5}}>
              <Button style={{backgroundColor: '#d0d0d0'}} mode="contained">
                List Order
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={styles.footer}>
            <View style={{width: '100%', marginBottom: 5}}>
              <Button
                style={{backgroundColor: '#e37171'}}
                mode="contained"
                onPress={() => this.props.navigation.navigate('order')}>
                List Order
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    transaction: state.transaction,
    orders: state.orders,
    timer: state.timer
  };
};

export default connect(mapStateToProps)(index);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e37171',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  footer:{
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
  }
});
