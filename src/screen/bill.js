import React, {Component} from 'react';
import {Text, Button} from 'react-native-paper';
import {StyleSheet, View, FlatList} from 'react-native';

import {toRupiah,dateTime} from '../function';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {RESET} from '../redux/_actions/orders';
import {pushTransaction} from '../redux/_actions/transaction';


class bill extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      table: '',
      transactionData: {
        subTotal: 0,
        discount: 0,
        serviceCharge: 0,
        tax: 0,
        total: 0,
        date: '',
        isPaid: 1,
      },
    };
  }

  transactionHandler = () => {
    let data = this.state.transactionData;
    let total = 0;
    this.props.orders.cart.map(item => {
      total = total + item.price * item.qty;
    });
    let newServiceCharge = total * 0.05;
    let newDiscount = total * 0.03;
    let newTax = total * 0.1;
    let newTotal = total + newServiceCharge + newTax - newDiscount;
    this.setState(
      Object.assign(data, {
        subTotal: total,
        serviceCharge: newServiceCharge,
        discount: newDiscount,
        tax: newTax,
        total: newTotal,
      }),
    );
  };

  goTobill = async () => {
    const id = await AsyncStorage.getItem('transactionId');
    const table = await AsyncStorage.getItem('tableNumber');
    let trans = this.state.transactionData;
    const data = {
      subTotal: trans.subTotal,
      discount: trans.discount,
      serviceCharge: trans.serviceCharge,
      tax: trans.tax,
      total: trans.total,
      isPaid: trans.isPaid,
      finishedTime: dateTime(0 + this.props.timer.count),
    };
    this.setState({
      table,
    });
    await this.props.dispatch(pushTransaction(data, id));
    await this.props.dispatch(RESET(this.props.orders.cart));
    await clearInterval(this.props.timer.setTimer);
    await this.props.navigation.navigate('done');
  };

  componentDidMount() {
    this.transactionHandler();
    const that = this;
    let today = new Date();
    date =
      today.getDate() +
      '/' +
      parseInt(today.getMonth() + 1) +
      '/' +
      today.getFullYear();
    that.setState({
      date,
    });
  }
  renderItem = ({item}) => {
    return (
      <View style={styles.body}>
        <View>
          <Text style={{fontSize: 15, color: '#e37171', fontWeight: 'bold'}}>
            {item.name}
          </Text>
          <Text style={{fontSize: 24, color: 'black', fontWeight: 'bold'}}>
            {toRupiah(item.price * item.qty)}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const extractKey = ({menuId}) => menuId.toString();
    let data = this.state.transactionData;
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
            {this.state.date}
          </Text>
          <View
            style={{
              backgroundColor: '#778ca3',
              height: 1,
              width: '100%',
              marginVertical: 15,
            }}></View>

          <View style={{flexDirection: 'row', alignItems: 'space-between'}}>
            {/* <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'red',
                marginLeft: 15,
              }}>
              Waiting
            </Text> */}
            <Text style={{fontSize: 17, textAlign: 'center', marginLeft: 15}}>
              {/* {item.name} */}
            </Text>
            <Text style={{fontSize: 17, textAlign: 'center', marginLeft: 15}}>
              {/* {item.price} */}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#778ca3',
              height: 1,
              width: '100%',
              marginVertical: 15,
            }}></View>

          <FlatList
            snapToInterval={270}
            decelerationRate="normal"
            showsVerticalScrollIndicator={false}
            data={this.props.orders.cart}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
          />
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'space-between',
                backgroundColor: '#d1d8e0',
                height: 150,
                width: '100%',
                borderRadius: 5,
              }}>
              <View style={{flex: 1}}>
                <Text style={styles.bill}>Sub Total</Text>
                <Text style={styles.bill}>Discount</Text>
                <Text style={styles.bill}>Service Charge(5.5%)</Text>
                <Text style={styles.bill}>Tax(10%)</Text>
                <Text
                  style={{
                    textAlign: 'left',
                    marginVertical: 5,
                    marginHorizontal: 15,
                    fontWeight: 'bold',
                  }}>
                  Total
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.bill}>{toRupiah(data.subTotal)}</Text>
                <Text style={styles.bill}>- {toRupiah(data.discount)}</Text>
                <Text style={styles.bill}>{toRupiah(data.serviceCharge)}</Text>
                <Text style={styles.bill}>{toRupiah(data.tax)}</Text>
                <Text
                  style={{
                    textAlign: 'left',
                    marginVertical: 5,
                    marginHorizontal: 15,
                    fontWeight: 'bold',
                  }}>
                  {toRupiah(data.total)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#778ca3',
              height: 1,
              width: '100%',
              marginVertical: 15,
            }}></View>
          {/* {this.state.buttoncall == true && ( */}
          <View style={{flexDirection: 'row', alignItems: 'space-between'}}>
            <Button
              mode="contained"
              color="#e37171"
              style={{width: '50%'}}
              onPress={() => this.goTobill()}>
              <Text style={{color: '#FFF', fontSize: 18}}>Call Bill</Text>
            </Button>
          </View>

          {/* {this.state.buttoncall == false && (
            <View style={{flexDirection: 'row', alignItems: 'space-between'}}>
              <Button mode="contained" color="#d0d0d0" style={{width: '50%'}}>
                <Text style={{color: '#FFF', fontSize: 18}}>Call Bill</Text>
              </Button>
            </View>
          )} */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    transaction: state.transaction,
    orders: state.orders,
    timer: state.timer,
  };
};

export default connect(mapStateToProps)(bill);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },

  bill: {
    textAlign: 'left',
    marginVertical: 5,
    marginHorizontal: 15,
  },
});
