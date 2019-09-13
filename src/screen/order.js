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
  StatusBar,
} from 'react-native';
import {Card} from 'react-native-paper';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Increment,
  Decrement,
  pushCart,
  UPDATE,
  DELETE,
} from '../redux/_actions/orders';

import Icons from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';
import {toRupiah, dateTime} from '../function';
import {FALSE, FALSE_DRINK, FALSE_DESSERT} from '../redux/_actions/menus';
class order extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
      total: 0,
      time: 0,
      onConfirm: false,
      pressConf: true,
      transactionId: 0,
    };
  }
  _count = () => {
    totalku = 0;
    this.props.orders.cart.map(item => {
      let data = item.price * item.qty;
      totalku = data + totalku;
    });
    this.setState({
      total: totalku,
    });
  };
  async componentDidMount() {
    const table = await AsyncStorage.getItem('tableNumber');
    const id = await AsyncStorage.getItem('transactionId');
    this.setState({
      table,
      transactionId: id,
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
      await (item, this.props.orders.cart && this.props.navigation.goBack());
      if (item.categoryId == 1) {
        await this.props.dispatch(
          FALSE(item, this.props.menus.food, this.props.menus.food),
        );
      } else if (item.categoryId == 2) {
        await this.props.dispatch(
          FALSE_DRINK(item, this.props.menus.drink, this.props.menus.drink),
        );
      } else if (item.categoryId == 3) {
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
      await this.props.dispatch(
        FALSE(item, this.props.menus.data, this.props.menus.data),
      );
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
        <ActivityIndicator size={30} color="#e37171" />
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

  renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <Card style={styles.container}>
          <Card.Content style={{paddingHorizontal: 0, paddingVertical: 0}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{borderColor: 'green', borderRadius: 7, padding: 4}}>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={{width: 80, height: 80}}
                />
              </View>
              <View>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {item.name}
                </Text>
                <Text
                  style={{fontSize: 24, color: 'black', fontWeight: 'bold'}}>
                  {toRupiah(item.price * item.qty)}
                </Text>
              </View>

              {this.state.pressConf == true && (
                <View style={styles.qty}>
                  <TouchableOpacity onPress={() => this.dec(item)}>
                    <View>
                      <Icon name="minus" color="#e37171" size={20} />
                    </View>
                  </TouchableOpacity>

                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {item.qty}
                  </Text>

                  <TouchableOpacity onPress={() => this.inc(item)}>
                    <View>
                      <Icon name="plus" color="#e37171" size={20} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {this.state.pressConf == false && (
                <View style={{marginLeft: 15}}>
                  <Icon name="checkcircle" color="#e37171" size={23} />
                </View>
              )}
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  render() {
    // const extractKey = ({ id })
    const extractKey = ({menuId}) => menuId.toString();
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#e37171" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={{color: '#e37171', fontWeight: 'bold', marginRight: 10}}>
            <Icon name="table" size={14} /> No: {this.state.table}
          </Text>
          <Text style={{color: '#e37171'}}>
            {' '}
            <Icons name="clock" size={14} />
            {dateTime(this.props.timer.count)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 24,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'right',
            paddingRight: 30,
          }}>
          {toRupiah(this.state.total)}
        </Text>
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
            backgroundColor: 'white',
            width: '100%',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          {this.props.orders.cart.length >= 1 && (
            <TouchableOpacity style={styles.confirm} onPress={this.onConf}>
              <View>
                <Text
                  style={{fontWeight: 'bold', fontSize: 14, color: '#d0d0d0'}}>
                  Confirm
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {this.props.orders.cart.length == 0 && (
            <View style={styles.confirm}>
              <Text
                style={{fontWeight: 'bold', fontSize: 14, color: '#d0d0d0'}}>
                Confirmed
              </Text>
            </View>
          )}

          {this.state.onConfirm == false && (
            <View style={styles.bill}>
              <Text
                style={{color: '#e37171', fontWeight: 'bold', fontSize: 15}}>
                <Icon name="calculator" size={14} />
                Bill
              </Text>
            </View>
          )}
          {this.state.onConfirm == true && (
            <TouchableOpacity
              style={{
                height: 30,
                width: '30%',
                borderRadius: 10,
                elevation: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('bill')}>
              <View style={{color: '#e37171'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  <Icon name="calculator" size={14} />
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
    timer: state.timer,
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
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  FlatList: {
    flex: 1,
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
  footer: {
    flexDirection: 'row',
  },
  bill: {
    height: 30,
    width: '30%',
    borderRadius: 10,
    borderWidth: 2,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirm: {
    backgroundColor: '#e37171',
    height: 43,
    width: '65%',
    elevation: 3,
    justifyContent: 'space-evenly',
    marginLeft: 5,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },
  confirmed: {
    borderWidth: 2,
    borderColor: '#d0d0d0',
    backgroundColor: '#e37171',
    height: 43,
    width: '65%',
    elevation: 3,
    marginLeft: 5,
    justifyContent: 'space-evenly',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },

  qty: {
    flex: 1,
    height: 30,
    width: 90,
    backgroundColor: 'white',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    marginRight: 3,
    marginBottom: 5,
  },
});
