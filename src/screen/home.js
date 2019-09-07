import React, {Component} from 'react';
import {Text, Button} from 'react-native-paper';
import {StyleSheet, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux'
import { addTransaction } from '../redux/_actions/transactions'
import LinearGradient from 'react-native-linear-gradient';

class home extends Component {
  constructor() {
    super();
    this.state = {
      table: null,
      isLoading: false
   };
  }

  onTable = (table) => {
    this.setState({
      table
    })};
  istable = async () => {
    await this.setState({
      isLoading: true
    })
    if (this.state.table == null) {
      return false;
    } else {
      await AsyncStorage.setItem('tableNumber', this.state.table);
      await this.props.dispatch(addTransaction({
        tableNumber: this.state.table,
        isPaid: false
      }))
      await this.setState({
        isLoading: this.props.transactions.isLoading
      })
      await AsyncStorage.setItem('transactionId',`${this.props.transactions.dataItem.data.id}`)
      await this.props.navigation.navigate('index');
    }
  };

  render() {
    return (
      <LinearGradient
        colors={['#F29492', '#114357']}
        style={styles.linearGradient}>
      <View >
        <View>
            <Text style={{color:'#d0d0d0', fontSize:44}}>Kedai DW</Text>
          <Text>
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={{color: '#d0d0d0', fontSize: 20, marginTop: 15}}>
            Masukan Nomor Meja
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="black"
            keyboardType="number-pad"
            onChangeText={this.onTable}></TextInput>
          <Button style={styles.button} onPress={this.istable}>
            <Text style={{color: 'white', fontSize: 15}}>Submit</Text>
          </Button>
        </View>
      </View>
    </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
      transactions: state.transactions
  }
}

export default connect(mapStateToProps)(home)

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 15,
  },
  content: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#575454',
    marginVertical: 15,
    height: 200,
  },
  input: {
    marginTop: 15,
    backgroundColor: '#d0d0d0',
    marginBottom: 15,
    color: 'black',
    width: '90%',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#e37171',
    height: 40,
    width: '90%',
    marginBottom: 15,
  },
});
