import React, {Component} from 'react';
import {Text, Button} from 'react-native-paper';
import {StyleSheet, StatusBar, View, Image, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux'
import { addTransaction, getTransactions } from '../_actions/transaction'
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import axios from 'axios';
class home extends Component {
  constructor() {
    super();
    this.state = {
      table: null,
   };
  }

  onTable = (table) => {this.setState({table})};
  istable = async () => {
    if (this.state.table == null) {
      return false;
    } else {
      await AsyncStorage.setItem('tableNumber', this.state.table);
      await this.props.dispatch(addTransaction({
        tableNumber: this.state.table,
        isPaid: 0
      }))
      // await AsyncStorage.setItem('transactionId',`${this.props.transaction.data.id}`)
      await this.props.navigation.navigate('listmenu');
    }
  };

  render() {
    return (
      <LinearGradient
        colors={['#114357', '#F29492']}
        style={styles.linearGradient}>
      <View >
        <View>
          <LinearTextGradient
            style={{fontWeight: 'bold', fontSize: 44}}
            locations={[0, 1]}
            colors={['#d98989', '#e6bcbc']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text>Kedai DW</Text>
          </LinearTextGradient>
          <Text>
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={{color: '#403c3c', fontSize: 20, marginTop: 15}}>
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
        {/* <View style={{alignItems: 'flex-end'}}>
          <Image
            source={{
              uri:
                'https://vignette.wikia.nocookie.net/dreamworks/images/c/ca/Bob_the_Tomato.png/revision/latest?cb=20170620010644',
            }}
            style={{
              width: 40,
              height: 40,
              marginTop: -40,
              justifyContent: 'flex-end',
            }}
          />
        </View> */}
      </View>
    </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
      transaction: state.transaction
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
    height: 40,
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
