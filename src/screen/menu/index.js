import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import tabnavigation from '../../navigation/tabnavigation';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
const AppIndex = createAppContainer(tabnavigation);

class App extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
      timer: 0,
      isi: false,
    };
  }

  async componentDidMount() {
    const table = await AsyncStorage.getItem('tableNumber');
    this.setState({
      table,
    });
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
  //   renderItem = ({ item }) => {
  //     return (
  //         <View style={styles.FlatList}>
  //             <TouchableOpacity underlayColor='white' onPress={() => this.props.navigation.navigate('menu', { rows: item })}>
  //                 <Card
  //                     image={{ uri: item.image }}
  //                 >
  //                     <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
  //                 </Card>
  //             </TouchableOpacity>
  //         </View >
  //     )
  // }

  render() {
    console.warn(this.state.table)
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor="#e37171" barStyle="light-content" />
        <View style={styles.header}>
          <View>
            <Text
              style={{color: '#e37171', fontWeight: 'bold', marginRight: 10}}>
              No: {this.state.table}
            </Text>
            <Text style={{color: '#e37171'}}>30:23:00</Text>
          </View>
        </View>

        <AppIndex />
        {this.props.orders.cart == 0 ? (
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 5,
              paddingHorizontal: 5,
            }}>
            <View style={{width: '100%'}}>
              <Button style={{backgroundColor: '#d0d0d0'}} mode="contained">
                List Order
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 5,
              paddingHorizontal: 5,
            }}>
            <View style={{width: '100%'}}>
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
  };
};

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e37171',
    paddingHorizontal: 18,
    paddingTop: 5,
  },
});
