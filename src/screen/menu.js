import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {getMenuByCategory} from '../_actions/menus';
import {Button, Card} from 'react-native-paper';

class menus extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
      menu: {
        id: '',
        qty: 0,
      },
    };
  }

  async componentDidMount() {
    const table = await AsyncStorage.getItem('tableNumber');
    this.setState({
      table,
    });
    console.warn(this.state.menu);
  }

  inc = () => {
    this.setState({
      menu: {
        id: item.id,
        qty: this.state.menu.qty + 1,
      },
    });
  };

  dec = () => {
    if (this.state.menu.qty == 0) {
      return false;
    } else {
      this.setState({
        menu: {
          qty: this.state.menu.qty - 1,
        },
      });
    }
  };

  componentWillMount() {
    const {navigation} = this.props;
    const data = navigation.getParam('rows');
    this.props.dispatch(getMenuByCategory(1));
  }

  loading = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator size={0} color={'yellow'} />
      </View>
    );
  };
  button() {
    Alert.alert(
      'Confirm Order',
      'Are you sure to order this ?',
      [
        {text: 'NO', onPress: () => console.warn(), style: 'cancel'},
        {text: 'YES', onPress:() => this.props.navigation.navigate('done')},
      ]
    );
  }

  renderItem = ({item}) => {
    const price = item.price;
    var number_string = price.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    return (
      <View style={styles.FlatList}>
        <Card image={{uri: ''}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text>{item.name}</Text>
              <Text style={{fontWeight: 'bold', color: '#e37171'}}>
                Rp.{rupiah}
              </Text>
            </View>

            <View
              style={{
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
              }}>
              <TouchableOpacity onPress={this.dec}>
                <View>
                  <Icon name="minuscircleo" color="#e37171" size={20} />
                </View>
              </TouchableOpacity>
              <Text>{this.state.menu.qty}</Text>
              <TouchableOpacity onPress={this.inc}>
                <View>
                  <Icon name="pluscircleo" color="#e37171" size={20} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const extractKey = ({id}) => id.toString();
    return (
      <View style={styles.container}>
        <StatusBar
          // backgroundColor={}
          barStyle="dark-content"
        />
        <View style={styles.table}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            No: {this.state.table}
          </Text>
          {/* <Text style={{ color: 'black' }}>30.23.00</Text> */}
        </View>
        <View>
          {this.props.menus.isLoading == true && this.loading()}
          {this.props.menus.isLoading == false && (
            <View style={{paddingBottom: 0}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.menus.data}
                renderItem={this.renderItem}
                keyExtractor={extractKey}
                style={{marginBottom: 10}}
              />
            </View>
          )}
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width:'40%'}}>
            <Button
              style={{backgroundColor: '#e37171'}}
              mode="contained"
              onPress={() => this.props.navigation.navigate('order')}>
              List Order
            </Button>
          </View>
          <View style={{paddingHorizontal: 10, width:'40%'}}>
            <Button
              style={{backgroundColor: '#e37171'}}
              mode="contained"
              onPress={()=> this.button()}>
              Confirm
              </Button>
          </View>
          <View style={{width:'20%'}}>
            <Button
              style={{backgroundColor: '#e37171', }}
              mode="contained"
              onPress={() => this.props.navigation.navigate('bill')}>
              Bill
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    menus: state.menus,
  };
};

export default connect(mapStateToProps)(menus);

const styles = StyleSheet.create({
  table: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  FlatList: {
    flex: 1,
    // padding: 0,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    marginLeft: 20,
    fontSize: 15,
    width: '70%',
  },
  textHeader: {
    fontSize: 23,
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
    height: 50,
    width: '20%',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 10,
  },
  bottom: {
    height: '10%',
    width: '80%',
    borderRadius: 30,
  },
});
