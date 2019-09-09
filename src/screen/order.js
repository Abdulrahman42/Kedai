import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Increment,
  Decrement,
  pushCart,
  UPDATE,
  DELETE,
} from '../redux/_action/orders';
import {FALSE, FALSE_DRINK, FALSE_DESSERT} from '../redux/_actions/menus';
class order extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
      total: 0,
      onConfirm: false,
      pressConf: true,
    };
  }
  async componentDidMount() {
    const table = await AsyncStorage.getItem('tableNumber');
    this.setState({
      table,
    });
    await this._count();
  }
  inc = async item => {
    await this.props.dispatch(
      Increment(item, this.props.orders.cart, this.props.orders.cart),
    );
    await this._count();
  };

  dec = async item => {
    if (item.qty == 0 || item.qty <= 1) {
      await this.props.dispatch(
        DELETE(item, this.props.orders.cart, this.props.orders.cart),
      );
      await this._count();
      if (item.categoryId == 4) {
        await this.props.dispatch(
          FALSE(item, this.props.menus.food, this.props.menus.food),
        );
      } else if (item.categoryId == 3) {
        await this.props.dispatch(
          FALSE_DRINK(item, this.props.menus.drink, this.props.menus.drink),
        );
      } else if (item.categoryId == 2) {
        await this.props.dispatch(
          FALSE_DESSERT(
            item,
            this.props.menus.dessert,
            this.props.menus.dessert,
          ),
        );
      }
    } else {
      await this.props.dispatch(
        Decrement(item, this.props.orders.cart, this.props.orders.cart),
      );
      // await this.props.dispatch(FALSE(item, this.props.menus.data, this.props.menus.data))
      await this._count();
    }
  };
  loading = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator size={30} color={yellow} />
      </View>
    );
  };

  changeStatus = async () => {
    await this.props.orders.cart.map(item => {
      this.props.dispatch(
        UPDATE(item, this.props.orders.cart, this.props.orders.cart),
      );
    });
    this.props.dispatch(pushCart(this.props.orders.cart));
    this.setState({
      onConfirm: true,
      pressConf: false,
    });
  };

  onConf = item => {
    Alert.alert('Are You Sure To This Order', 'Please Check Again', [
      {
        text: 'NO',
        onPress: () => {
          return false;
        },
      },
      {
        text: 'YES',
        onPress: () => this.changeStatus(item),
      },
    ]);
  };

  toRupiah = number => {
    let rupiah = '';
    let revNumber = number
      .toString()
      .split('')
      .reverse()
      .join('');
    for (var i = 0; i < revNumber.length; i++)
      if (i % 3 == 0) rupiah += revNumber.substr(i, 3) + '.';
    return (
      'Rp. ' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')
    );
  };
  renderItem = ({item}) => {
    return (
      <View style={styles.FlatList}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View>
            <Text style={{fontSize: 15, color: yellow, fontWeight: 'bold'}}>
              {item.name}
            </Text>
            <Text style={{fontSize: 24, color: night, fontWeight: 'bold'}}>
              {this.toRupiah(item.price * item.qty)}
            </Text>
          </View>

          {this.state.pressConf == true && (
            <View
              style={{
                height: 30,
                width: 90,
                backgroundColor: white,
                elevation: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 5,
                marginRight: 3,
              }}>
              <TouchableOpacity onPress={() => this.dec(item)}>
                <View>
                  <Icon name="minus" color="#00a663" size={20} />
                </View>
              </TouchableOpacity>
              <Text style={{fontWeight: 'bold', color: night}}>{item.qty}</Text>
              <TouchableOpacity onPress={() => this.inc(item)}>
                <View>
                  <Icon name="plus" color="#00a663" size={20} />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {this.state.pressConf == false && (
            <Icon name="checkcircle" color="#00a663" size={23} />
          )}
        </View>
      </View>
    );
  };

  render() {
    // const extractKey = ({ id })
    const extractKey = ({menuId}) => menuId.toString();
    let tId = `${this.props.transaction.data.id}`;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={white} barStyle="dark-content" />
        <View style={styles.header}>
          <View>
            <Text style={styles.textHeader}>Nativex</Text>
          </View>
          <View style={styles.table}>
            <Text style={{color: night, fontWeight: 'bold', marginRight: 10}}>
              No: {this.state.table}
            </Text>
            <Text style={{color: night}}>30:23:00</Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 24,
            color: night,
            fontWeight: 'bold',
            textAlign: 'right',
            paddingRight: 30,
          }}>
          {this.toRupiah(this.state.total)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <View
            style={{height: 3, backgroundColor: 'lightgrey', width: '60%'}}
          />
          <View style={{height: 3, backgroundColor: '#00a663', width: '40%'}} />
        </View>

        <FlatList
          snapToInterval={270}
          decelerationRate="normal"
          showsVerticalScrollIndicator={false}
          data={this.props.orders.cart}
          renderItem={this.renderItem}
          keyExtractor={extractKey}
          style={{paddingLeft: 20, paddingRight: 20}}
        />
        <View
          style={{
            height: 50,
            backgroundColor: white,
            width: '100%',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          {this.props.orders.cart.length >= 1 && (
            <TouchableOpacity
              style={{
                backgroundColor: '#00a663',
                height: 43,
                width: '65%',
                elevation: 3,
                justifyContent: 'space-evenly',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginRight: 10,
              }}
              onPress={this.onConf}>
              <View>
                <Text style={{color: white, fontWeight: 'bold', fontSize: 17}}>
                  Confirm
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {this.props.orders.cart.length == 0 && (
            <View
              style={{
                borderWidth: 2,
                borderColor: '#00a663',
                backgroundColor: white,
                height: 43,
                width: '65%',
                elevation: 3,
                justifyContent: 'space-evenly',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginRight: 10,
              }}>
              <Text
                style={{color: '#00a663', fontWeight: 'bold', fontSize: 17}}>
                Confirmed
              </Text>
            </View>
          )}

          {this.state.onConfirm == false && (
            <View
              style={{
                height: 43,
                width: '40%',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'lightgrey',
                backgroundColor: white,
                elevation: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: 'lightgrey', fontWeight: 'bold', fontSize: 17}}>
                Bill
              </Text>
            </View>
          )}
          {this.state.onConfirm == true && (
            <TouchableOpacity
              style={{
                height: 43,
                width: '40%',
                borderRadius: 10,
                backgroundColor: yellow,
                elevation: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('bill')}>
              <View>
                <Text style={{color: white, fontWeight: 'bold', fontSize: 17}}>
                  Bill
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    transaction: state.transaction,
    menus: state.menus,
  };
};

export default connect(mapStateToProps)(order);

const styles = StyleSheet.create({
  line: {
    height: 10,
    backgroundColor: 'lightgrey',
    marginBottom: 30,
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: white,
  },
  FlatList: {
    flex: 1,
  },
  headerbill: {
    marginTop: 20,
    backgroundColor: '#00a663',
    height: 120,
    elevation: 3,
    borderRadius: 10,
    width: '70%',
    padding: 20,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  textContent: {
    marginLeft: 20,
    fontSize: 15,
    color: night,
    width: '70%',
  },
  textHeader: {
    fontSize: 23,
    color: night,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
  },
  search: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    height: 50,
    width: '80%',
    borderRadius: 30,
    paddingLeft: 20,
  },
  qr_code: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor: yellow,
    height: 50,
    width: '20%',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 10,
  },
  bottom: {
    height: '10%',
    width: '80%',
    backgroundColor: night,
    borderRadius: 30,
  },
});
