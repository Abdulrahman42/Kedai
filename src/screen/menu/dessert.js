import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import { Card} from 'react-native-paper';
import { getDessert, updateDessert} from '../../redux/_actions/menus';
import { addToCart, Increment, Decrement } from '../../redux/_actions/orders'


class dessert extends Component {
  constructor() {
    super();
    this.state = {
      dataOrder: [],
      menu: {
        qty: 0,
      },
    };
  }

  addToCart = async (item, transactionId) => {
    let data = this.props.orders.cart.findIndex(x => x.id == item.id);
    if (data >= 0) {
    } else {
      await this.props.dispatch(
        updateDessert(item, this.props.menus.dessert, this.props.menus.dessert),
      );
      await this.props.dispatch(
        addToCart(item, this.props.transaction.data.id),
      );
    }
  };

  async componentDidMount() {
    const table = await AsyncStorage.getItem('tableNumber');
    this.setState({
      table,
    });
    this.props.dispatch(getDessert());
  }

  dec = () => {
    if (this.state.qty == 0) {
      this.props.dispatch(UpdateCart(item, this.props.transaction.data.id));
    } else {
      this.setState({
        menu: {
          qty: this.state.qty - 1,
        },
      });
    }
  };

  loading = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50%',
        }}>
        <ActivityIndicator size={50} color="#e37171" />
      </View>
    );
  };
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

    // console.log(this.props.menus.dessert)
    return (
      <View style={{flex: 1}}>
        <Card style={styles.container}>
          <Card.Content style={{paddingHorizontal: 0, paddingVertical: 0}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={{width: 100, height: 120}}
                />
              </View>
              <View style={{flex: 1, marginHorizontal: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{marginRight: 15, marginTop: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        marginTop: 15,
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}>
                      <Text style={{fontSize: 16}}>Rp. {rupiah}</Text>
                    </View>
                  </View>
                    {
                      item.selected == false && 
                  <View style={{marginTop: 20, marginLeft: 10}}>
                        <TouchableOpacity
                          onPress={() =>
                            this.addToCart(item, this.props.transaction.data)}>
                          <MaterialIcons
                            name="add-shopping-cart"
                            size={40}
                            color={'#e37171'}/>
                        </TouchableOpacity>
                    </View>
                    }
                    {
                      item.selected == true && 
                      <View style={{marginTop: 20, marginLeft: 10}}>
                      <View>
                        <Icon name="checkcircle" color="#d0d0d0" size={25} />
                      </View>
                    </View>
                    }
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  render() {
    const extractKey = ({id}) => id.toString();
    return (
      <View style={{flex:1}}>
        <View>
          {this.props.menus.isLoading == true && this.loading()}
          {this.props.menus.isLoading == false && 
            // <View>
              <FlatList
                snapToInterval={270}
                decelerationRate="normal"
                showsVerticalScrollIndicator={false}
                data={this.props.menus.dessert}
                keyExtractor={extractKey}
                extraData={this.props.menus.dessert}
                renderItem={this.renderItem}
              />
            // </View>
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    menus: state.menus,
    transaction: state.transaction,
    orders: state.orders,
  };
};
export default connect(mapStateToProps)(dessert);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  header: {
    backgroundColor: '#1BAA56',
  },
});
