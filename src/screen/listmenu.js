import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
// import Constanta, { convertToRupiah } from '../../res/Constant'
import env from '../env/env';
// import { Styles, Color } from '../../res/Styles'
import AsyncStorage from '@react-native-community/async-storage';
// import CompTouchable from './CompTouchable'
// import { CosButton } from '../../components/Components';
import { getMenu, getMenuWhereCategory } from '../redux/_actions/menus';
import { getCategories } from '../redux/_actions/categories';
import { addOrder, editOrder } from '../redux/_actions/orders';
import { setIntervalNya, counterNya } from '../redux/_actions/time';

// getMenuWhereCategory
class listmenu extends Component {
  state = {
    transactionId: 0,
    tableNumber: 0,
    initNameCategory: 'All',
    startedMenus: [],
    toogleStarted: ''
  }

  // convertIntToTime = (given_seconds) => {
  //   dateObj = new Date(given_seconds * 1000);
  //   hours = dateObj.getUTCHours();
  //   minutes = dateObj.getUTCMinutes();
  //   seconds = dateObj.getSeconds();

  //   timeString = hours.toString().padStart(2, '0') + ':' +
  //     minutes.toString().padStart(2, '0') + ':' +
  //     seconds.toString().padStart(2, '0');
  // }

  aksiListOrder = async () => {
    await this.props.navigation.navigate('SwitchBill')
  }
  gettableNumber = async () => {
    try {
      const tableNumber = await AsyncStorage.getItem('tableNumber')
      const transactionId = await AsyncStorage.getItem('transactionId')
      await this.setState({
        tableNumber: tableNumber,
        transactionId: transactionId
      })
    } catch (e) {
      console.log(e)
    }
  }
  cleartableNumber = async () => {
    try {
      await AsyncStorage.clear();
      await this.props.navigation.navigate('StackPublic')
    } catch (e) {
    }
  }
  menubycategory = (categoryId, categoryName) => {
    this.props.dispatch(getMenuWhereCategory(categoryId))
    this.setState({
      initNameCategory: categoryName
    })
  }
  cekIsStartedMenus = async () => {
    const startedMenus = await AsyncStorage.getItem('startedMenus')
    await this.setState({
      startedMenus
    });
  }
  addMenuToOrder = async (menuId, transactionId) => {
    let transactionData
    let menuData
    try {
      transactionData = await axios.get(env.host + "transaction/" + `${transactionId}`)
      menuData = await axios.get(env.host + "menu/" + `${menuId}`)
    } catch (e) {
      console.log(e)
    }

    if (!transactionData.data.isPaid) {
      const totalMenuByTrans = await axios.get(env.host + "order/transactionId/" + `${transactionId}` + "menuId/" + `${menuId}`)

      if (!totalMenuByTrans.data) {
        const data_menu = {
          menuId,
          transactionId,
          price: menuData.data.price,
          qty: 1
        }
        ToastAndroid.show('Success add order', ToastAndroid.SHORT);
        this.props.dispatch(addOrder(data_menu))
      } else {
        if (totalMenuByTrans.data.status == null) {
          //Ambil dulu jumlah Qty nya, lalu Tambahkan + 1
          //Patch Data Where IDOrderNya
          let orderId = totalMenuByTrans.data.id
          let totaldata = totalMenuByTrans.data.qty
          totaldata = totaldata + 1
          const data_menu = {
            qty: totaldata
          }
          ToastAndroid.show(`Success add order , Total : ${totaldata}`, ToastAndroid.SHORT);
          this.props.dispatch(editOrder(orderId, data_menu))
        } else {
          //Data sudah di confirm
          // ToastAndroid.show(`Data sudah terkonfirmasi , Silakan Tunggu Pesanan Anda`, ToastAndroid.SHORT);
        }
      }
    } else {
      // alert('Sudah Bayar')
    }
  }
  //Tahap Percobaan
  setStartedMenus = (menuId) => {
    let arrTemporer = this.state.startedMenus
    let kosong = true;
    arrTemporer.forEach((item, index, arr) => {
      if (item.id == menuId) {
        kosong = false
      }
    })
    if (kosong) {
      //Push array where id
      arrTemporer.push(menuId)
    } else {
      //Pop array where id
      arrTemporer.pop
    }
    // const noMeja = AsyncStorage.setItem('startedMenus',this.state.startedMenus)
  }

  componentDidMount() {
    // let timerHandlenya = 
    this.gettableNumber()
    this.props.dispatch(getMenu())
    this.props.dispatch(getCategories())
    // this.props.dispatch(setIntervalNya(
    //   setInterval(() => {
    //     this.props.dispatch(counterNya(this.props.Home.timer))
    //   }, 1000)
    // ))
    // this.cekIsStartedMenus()
  }
  render() {

    return (
      <View style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5
      }}>
        {/* Header */}
        <View style={ {
          backgroundColor: 'white',
          width: '100%',
          height: 50,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          flexDirection: 'row'
        }}>
          <Text style={{color:'#d0d0d0', fontSize:18,fontWeight: 'bold' }}>Tbl Num#{this.state.tableNumber}</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',color:'#d0d0d0'
          }}>Kedai DW</Text>
          <View style={{ flexDirection: 'row' }}>
            <IconIon name='md-timer' size={17} style={{ marginRight: 5 }}></IconIon>
            <Text style={ { fontWeight: 'bold' }}>
              {/* {this.props.Home.timerString} */}
            </Text>
          </View>
        </View>

        {/* List Category */}
        <View style={ {
          backgroundColor: 'white',
          width: '100%',
          height: 75,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginBottom: 10,
          paddingBottom: 10
        }}>
          {this.props.menus.isLoading ?
            <ActivityIndicator></ActivityIndicator>
            :
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              data={this.props.Category.dataItem}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CompTouchable
                  namaKategori={item.name}
                  onPress={() => this.menubycategory(item.id, item.name)}
                />
              )}
            />
          }
        </View>

        {/* List Menu */}
        <View style={ {
          backgroundColor: 'white',
          width: '100%',
          flex: 7,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginBottom: 5
        }}>
          <View style={{ height: '100%', width: '100%' }}>
            <Text style={ {
              fontSize: 17,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 5
            }}>List Menu From {this.state.initNameCategory} Category</Text>

            {this.props.menus.isLoading ?
              <ActivityIndicator></ActivityIndicator>
              :
              <FlatList
                data={this.props.Menu.dataItem}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={ {
                    backgroundColor: 'white',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 5,
                    margin: 5,
                    height: 100,
                    flexDirection: 'row',
                    position: 'relative',
                    borderWidth: 2,
                    borderColor: 'black'
                  }}>
                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 10,
                      top: 10
                    }}
                      onPress={() => this.addMenuToOrder(item.id, this.state.transactionId)}
                      onLongPress={() => alert('Long Pressed')}
                    >
                      <IconMaterialCom
                        name='bookmark-multiple-outline'
                        size={30}
                        color={'yellow'}
                      ></IconMaterialCom>
                    </TouchableOpacity>
                    <Image source={{ uri: item.image }} style={{
                      width: 100,
                      height: '100%',
                      marginRight: 20,
                      borderRadius: 10
                    }}></Image>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={ {
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>
                        {item.name}</Text>
                      <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }}>
                        {convertToRupiah(item.price)}</Text>
                    </View>
                  </View>
                )}
              />
            }
          </View>
        </View>

        {/* Option */}
        <View style={ {
          backgroundColor: 'white',
          width: '100%',
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row'
        }}>

          <TouchableOpacity style={ {
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            margin: 5,
            height: '100%',
            flex: 1,
            flexDirection: 'row'
          }}
            onPress={() => this.aksiListOrder()}
          >
            <Text style={ {
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white'
            }}>
              LIST ORDER</Text>
          </TouchableOpacity>

          <TouchableOpacity style={ {
            backgroundColor: 'black',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 5,
            margin: 5,
            height: '100%',
            flexDirection: 'row'
          }}
            onPress={() => this.props.navigation.navigate('SWScreenViewbill')}
          >
            <Text style={ {
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white'
            }}>
              VIEW BILL</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menus: state.menus,
    categories: state.categories,
    transaction: state.transaction,
    orders: state.orders,
    timer: state.timer
  }
}

export default connect(mapStateToProps)(listmenu)