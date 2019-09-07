import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {getMenuSnack} from '../../redux/_actions/menus';
import {ActivityIndicator, Card} from 'react-native-paper';

class snack extends Component {
  state = {
    tableNumber: 0,
    transactionId: 0,
    initNameCategory: 'All',
    startedMenus: [],
    toogleStarted: '',
  };

  componentDidMount() {
    this.props.dispatch(getMenuSnack());
  }

  addMenuToOrder = () => {};
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
    let number_string = price.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d(3)/g);

    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
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
                  <View style={{marginTop: 20, marginLeft: 10}}>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          // console.log(JSON.stringify(item))
                          this.addMenuToOrder(item.id, this.state.transactionId)
                        }>
                        <MaterialIcons
                          name="add-shopping-cart"
                          size={40}
                          color={'#e37171'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
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
      <View>
        <View>
          {this.props.menus.isLoading == true && this.loading()}
          {this.props.menus.isLoading == false && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.menus.dataSnack}
              keyExtractor={extractKey}
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
    transactions: state.transactions,
  };
};
export default connect(mapStateToProps)(snack);

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
