import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import {Card} from 'react-native-paper';
import {updateFood, getFood} from '../../redux/_actions/menus';
import {addToCart, Increment, Decrement} from '../../redux/_actions/orders';
import {toRupiah} from '../../function';

class food extends Component {
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
        updateFood(item, this.props.menus.food, this.props.menus.food),
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
    this.props.dispatch(getFood());
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
    // console.log(this.props.menus.Food)
    return (
      <SafeAreaView style={{flex: 1}}>
        <Card style={styles.container}>
          <Card.Content style={{paddingHorizontal: 0, paddingVertical: 0}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{borderColor: '#e37171'}}>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={{width: 100, height: 120, justifyContent: 'center'}}
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
                        paddingVertical: 15,
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}>
                      <Text style={{fontSize: 16}}>{toRupiah(item.price)}</Text>
                    </View>
                  </View>

                  {item.selected == false && (
                    <View style={{marginTop: 20, marginLeft: 10}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.addToCart(item, this.props.transaction.data.id)
                        }>
                        <View>
                          <MaterialIcons
                            name="add-shopping-cart"
                            size={40}
                            color={'#e37171'}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  {item.selected == true && (
                    <View style={{marginTop: 20, marginLeft: 10}}>
                      <View>
                        <Icon name="checkcircle" color="#d0d0d0" size={25} />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </SafeAreaView>
    );
  };

  render() {
    const extractKey = ({id}) => id.toString();
    return (
      <View style={{flex: 1}}>
        <View>
          {this.props.menus.isLoading == true && this.loading()}
          {this.props.menus.isLoading == false && (
            <FlatList
              snapToInterval={270}
              decelerationRate="normal"
              showsVerticalScrollIndicator={false}
              data={this.props.menus.food}
              keyExtractor={extractKey}
              extraData={this.props.menus.food}
              renderItem={this.renderItem}
            />
          )}
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
export default connect(mapStateToProps)(food);

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
