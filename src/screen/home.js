import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {addTransaction} from '../redux/_actions/transaction';

class home extends Component {
  constructor() {
    super();
    this.state = {
      table: null,
      isPress: false,
    }
  }
  // this.clearStorage()
  clearStorage() {
    AsyncStorage.clear()
}
  onTable = table => {
    this.setState({table});
  };
  tableSend = async () => {
    if (this.state.table == null) {
      return false;
    } else {
      await this.setState({
        isPress: true,
      });
      await AsyncStorage.setItem('tableNumber', this.state.table);
      await this.props.dispatch(
        addTransaction({
          tableNumber: this.state.table,
          isPaid: 0,
        }),
      );
      await AsyncStorage.setItem(
        'transactionId',
        `${this.props.transaction.data.id}`,
      );
      await this.props.navigation.navigate('index');
      await this.setState({
        isPress: false,
        table: null,
      });
    }
  };

  render() {
    return (
      <LinearGradient
        colors={['#F29492', '#114357']}
        style={styles.linearGradient}>
        <View>
          <View>
            <Text style={{color: '#d0d0d0', fontSize: 44}}>Kedai DW</Text>
          </View>
          <View style={styles.content}>
            <Text style={{color: '#d0d0d0', fontSize: 20, marginTop: 15}}>
              Input Your Table Number
            </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              keyboardType="number-pad"
              onChangeText={this.onTable}></TextInput>
            {this.state.isPress == false && (
              <TouchableOpacity style={styles.button} onPress={this.tableSend}>
                <Text style={{color: 'white', fontSize: 15}}>Submit</Text>
              </TouchableOpacity>
            )}
            {this.state.isPress == true && (
              <View style={styles.button} onPress={this.tableSend}>
                <Text style={{color: 'white', fontSize: 15}}>Submit</Text>
                <ActivityIndicator size={25} color="white" />
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    transaction: state.transaction,
  };
};

export default connect(mapStateToProps)(home);

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
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
