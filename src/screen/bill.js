import React, {Component} from 'react';
import {Text, Button} from 'react-native-paper';
import {StyleSheet, StatusBar, View} from 'react-native';

class bill extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
            03 September 2019: 14:11{'\n'}
          </Text>

          <View
            style={{
              backgroundColor: '#778ca3',
              height: 1,
              width: '100%',
              marginVertical: 15,
            }}></View>

          <View style={{flexDirection: 'row', alignItems: 'space-between'}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'red',
                marginLeft: 15,
              }}>
              Waiting
            </Text>
            <Text style={{fontSize: 17, textAlign: 'center', marginLeft: 15}}>
              Sosis Goreng
            </Text>
            <Text style={{fontSize: 17, textAlign: 'center', marginLeft: 15}}>
              10.000
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#778ca3',
              height: 1,
              width: '100%',
              marginVertical: 15,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'space-between',
              backgroundColor: '#d1d8e0',
              height: 130,
              width: '100%',
              borderRadius: 5,
            }}>
            <View style={{flex: 1}}>
              <Text style={styles.bill}>Sub Total</Text>

              <Text style={styles.bill}>Discount</Text>

              <Text style={styles.bill}>Service Charge(5.5%)</Text>

              <Text style={styles.bill}>Tax(10%)</Text>

              <Text
                style={{
                  textAlign: 'left',
                  marginVertical: 5,
                  marginHorizontal: 15,
                  fontWeight: 'bold',
                }}>
                Total
              </Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.bill}>10.000</Text>

              <Text style={styles.bill}>0</Text>

              <Text style={styles.bill}>500</Text>

              <Text style={styles.bill}>1.000</Text>

              <Text
                style={{
                  textAlign: 'left',
                  marginVertical: 5,
                  marginHorizontal: 15,
                  fontWeight: 'bold',
                }}>
                11.500
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#778ca3',
              height: 1,
              width: '100%',
              marginVertical: 15,
            }}></View>

          <View style={{flexDirection: 'row', alignItems: 'space-between'}}>
            <Button
              mode="contained"
              color="#e37171"
              style={{width: '50%'}}
              onPress={() => {
                this.props.navigation.navigate('done');
              }}>
             
              <Text style={{color: '#FFF', fontSize: 18}}>Call Bill</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default bill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },

  bill: {
    textAlign: 'left',
    marginVertical: 5,
    marginHorizontal: 15,
  },
});
