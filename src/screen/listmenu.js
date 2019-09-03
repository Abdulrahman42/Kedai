import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {Card} from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

import {getCategories} from '../_actions/categories';

class listmenu extends Component {
  constructor() {
    super();
    this.state = {
      table: '',
      count: null,
    };
  }
  async componentWillMount() {
    const table = await AsyncStorage.getItem('tableNumber');
    this.setState({
      table,
    });
  }
  componentDidMount() {
    this.props.dispatch(getCategories());
  }
  loading = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator size={50} color="#ffffff" />
      </View>
    );
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.FlatList}>
        <Card
             image={{ uri: item.image }}>
            <Text>{item.name}</Text>
            <Button
              style={{backgroundColor: '#e37171'}}
              mode="contained"
              onPress={() => this.props.navigation.navigate('menu', { rows: item })}>
              View more
            </Button>
          </Card>
      </View>
    );
  };

  render() {
    const extractKey = ({id}) => id.toString();
    return (
      <View style={styles.container}>
        <View>
          <Appbar.Header style={{backgroundColor: 'white'}}>
            <Text>No: {this.state.table}</Text>
            <Appbar.Content title="Category" />
            {/* <Appbar.Action icon="search" onPress={this._onSearch} />
            <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
          </Appbar.Header>
        </View>
        <View>
          {this.props.categories.isLoading == true && this.loading()}
          {this.props.categories.isLoading == false && (
            <FlatList
              showsVerticalScrollIndicator={false}
              // numColumns={2}
              data={this.props.categories.data}
              renderItem={this.renderItem}
              keyExtractor={extractKey}
              style={{marginBottom: 100}}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(listmenu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  FlatList: {
    flex: 1,
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  textContent: {
    marginLeft: 20,
    fontSize: 15,
    color: 'black',
    width: '70%',
  },
  textHeader: {
    fontSize: 23,
    color: 'black',
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
    backgroundColor: 'yellow',
    height: 50,
    width: '20%',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 10,
  },
  bottom: {
    height: '10%',
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 30,
  },
});
