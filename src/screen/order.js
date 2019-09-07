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
// import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import env from '../env/env';
import {getTransactions} from '../redux/_actions/transactions';
import {
  addOrder,
  editOrder,
  deleteOrder,
  setOrderStatus,
} from '../redux/_actions/orders';
// import IconIon from 'react-native-vector-icons/Ionicons'
import {convertToRupiah} from '../constant/constant';
import {Styles, Color} from '../constant/style';
import IconFa from 'react-native-vector-icons/FontAwesome5';
import IconOctic from 'react-native-vector-icons/Octicons';
class order extends Component {
  state = {
    tableNumber: '',
    isLoading: true,
    menuready: false,
  };
  incOrderMenu = async (menuId, transactionId) => {
    try {
      let transactionData;
      let menuData;

      transactionData = await axios.get(
        env.host + 'transaction/' + `${transactionId}`,
      );
      menuData = await axios.get(env.host + 'menu/' + `${menuId}`);
      if (!transactionData.data.isPaid) {
        const totalMenuDataByTrans = await axios.get(
          env.host +
            'order/transactionId/' +
            `${transactionId}` +
            '/menuId/' +
            `${menuId}`,
        );

        if (!totalMenuDataByTrans.data) {
          let orderId = totalMenuDataByTrans.data.id;
          let totaldata = totalMenuDataByTrans.data.qty;
          totaldata = totaldata + 1;
          const data = {
            qty: totaldata,
          };
          await this.props.dispatch(editOrder(orderId, data));
        }
        await this.props.dispatch(transactions(transactionId));
      } else {
        alert('sudah bayar');
      }
    } catch (e) {
      console.log(e);
    }
  };
  decOrderMenu = async (menuId, transactionId) => {
    try {
      let transactionData;
      let menuData;
      transactionData = await axios.get(
        env.host + 'transaction/' + `${transactionId}`,
      );
      menuData = await axios.get(env.host + 'menu/' + `${menuId}`);
      if (!transactionData.data.isPaid) {
        const totalMenuDataByTrans = await axios.get(
          env.host +
            'order/transactionId/' +
            `${transactionId}` +
            '/menuId/' +
            `${menuId}`,
        );
        if (totalMenuDataByTrans.data) {
          let orderId = totalMenuDataByTrans.data.id;
          let totaldata = totalMenuDataByTrans.data.qty;
          if (totaldata > 1) {
            totaldata = totaldata - 1;
            const data = {
              qty: totaldata,
            };
            await this.props.dispatch(editOrder(orderId, data));
          } else {
            await this.props.dispatch(deleteOrder(orderId));
          }
        }
        await this.props.dispatch(getTransactions(transactionId));
      } else {
        alert('Sudah Bayar');
      }
      if (this.props.transactions.data) {
        this.props.transactions.data.map(async (item, index) => {
          if (item.status == null) {
            await this.setState({
              menuready: true,
            });
          }
        });
        if (this.props.transactions.data.length <= 0) {
          await this.setState({
            menuready: false,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  Confirm = async transactionId => {
    await this.props.dispatch(
      setOrderStatus(transactionId, {
        status: false,
      }),
    );
    await this.props.navigation.navigate('bill');
  };
  gettableNumber = async () => {
    let tableNumber = await AsyncStorage.getItem('transactionId');
    await this.setState({
      tableNumber: tableNumber,
    });
    await this.props.dispatch(getTransactions(this.state.tableNumber));
    if (this.props.transactions.data) {
      this.props.transactions.data.map(async (item, index) => {
        if (item.status == null) {
          await this.setState({
            menuready: true,
          });
        } else {
          await this.setState({
            menuready: false,
          });
        }
      });
    }
     await console.log(this.props.transactions.orders.dataItem.data)
    await this.setState({
      isLoading: this.props.transactions.isLoading,
    });
  };
  componentDidMount() {
    this.gettableNumber();
  }

  render() {
    // const price = item.menu.price;
    // let number_string = price.toString(),
    //   sisa = number_string.length % 3,
    //   rupiah = number_string.substr(0, sisa),
    //   ribuan = number_string.substr(sisa).match(/\d(3)/g);

    // if (ribuan) {
    //   separator = sisa ? '.' : '';
    //   rupiah += separator + ribuan.join('.');
    // }
    return (
      <View
        style={[
          Styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          },
        ]}>
        {this.state.isLoading ? (
          <ActivityIndicator
            style={{
              flex: 1,
              color: '#e37171',
            }}
            size={30}></ActivityIndicator>
        ) : (
          <FlatList
            data={this.props.transactions.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              console.log(item.menu.name)
              return (
              item.status == null ? 
              <View style={[Styles.cardSimpleContainer, {
                backgroundColor: Color.whiteColor,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                margin: 5,
                marginVertical: 20,
                flexDirection: 'row',
                position: 'relative',
                height: 100,
                flex: 1
              }]}>
                <TouchableOpacity
                  onPress={() => this.decOrderMenu(item.menu.id, this.props.Transaction.data.id)}
                >
                  <IconFa name='minus-square' color={Color.darkPrimaryColor} size={23} style={{
                    paddingRight: 10,
                    paddingLeft: 10
                  }}></IconFa>
                </TouchableOpacity>
                <Image source={{ uri: item.menu.image }} style={{
                  width: 100,
                  height: '100%',
                  marginRight: 20,
                  borderRadius: 10
                }}></Image>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <Text style={[Styles.hurufKonten, {
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }]}>
                    {item.menu.name}</Text>
                  <Text style={[Styles.hurufKonten, {
                    fontSize: 15,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }]}>
                    {convertToRupiah(item.menu.price)} / pcs</Text>
                  <Text style={[Styles.hurufKonten, {
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }]}>
                    ({convertToRupiah(item.menu.price * item.qty)})</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.incOrderMenu(item.menu.id, this.props.Transaction.data.id)}
                >
                  <IconFa name='plus-square' color={Color.darkPrimaryColor} size={23} style={{
                    paddingRight: 10,
                    paddingLeft: 10
                  }}></IconFa>
                </TouchableOpacity>
                <View style={{
                  position: 'absolute',
                  right: -5,
                  top: -15,
                  width: 30,
                  height: 30,
                  backgroundColor: Color.whiteColor,
                  borderRadius: 50,
                  borderColor: Color.darkPrimaryColor,
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.qty}</Text>
                </View>
              </View>
              : false)
            }}
            ListFooterComponent={() =>
              this.state.menuready ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={[
                      Styles.cardSimpleContainer,
                      {
                        backgroundColor: Color.accentColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        margin: 5,
                        width: 150,
                        height: 50,
                        flexDirection: 'row',
                      },
                    ]}
                    onPress={() => {
                      Alert.alert(
                        'Confirm Order',
                        'Are you sure to order this ?',
                        [
                          {
                            text: 'No',
                            style: 'cancel',
                          },
                          {
                            text: 'Yes',
                            onPress: () => {
                              this.Confirm(this.props.transactions.data.id);
                            },
                          },
                        ],
                        {cancelable: false},
                      );
                    }}>
                    <IconOctic
                      name="checklist"
                      color={Color.whiteColor}
                      size={23}
                      style={{
                        marginRight: 10,
                      }}></IconOctic>
                    <Text
                      style={[
                        Styles.hurufKonten,
                        {
                          fontSize: 15,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: Color.whiteColor,
                        },
                      ]}>
                      CONFIRM
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      Styles.cardSimpleContainer,
                      {
                        backgroundColor: Color.accentColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        margin: 5,
                        width: 150,
                        height: 50,
                        flexDirection: 'row',
                      },
                    ]}
                    onPress={() => {
                      this.props.navigation.navigate('bill');
                    }}>
                    <IconOctic
                      name="list-ordered"
                      color={Color.whiteColor}
                      size={23}
                      style={{
                        marginRight: 10,
                      }}></IconOctic>
                    <Text
                      style={[
                        Styles.hurufKonten,
                        {
                          fontSize: 15,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: Color.whiteColor,
                        },
                      ]}>
                      VIEW BILL
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Image
                    source={require('../image/order.png')}
                    style={{width: 200, height: 200}}></Image>
                  <Text
                    style={[
                      Styles.hurufKonten,
                      {
                        fontSize: 20,
                        fontWeight: 'bold',
                      },
                    ]}>
                    List order not found
                  </Text>
                  <Text style={[Styles.hurufKonten, {}]}>
                    Please order the menu item{' '}
                  </Text>
                </View>
              )
            }
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    orders: state.orders,
  };
};

export default connect(mapStateToProps)(order);
