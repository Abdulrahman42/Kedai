import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

export default class order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{height: 160, width: 160}}
            source={require('../image/order.png')}
          />
        </View>
        <View style={{width: '90%'}}>
          <Button
            style={{backgroundColor: '#e37171'}}
            mode="contained"
            onPress={this.alert}>
            Bill
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
