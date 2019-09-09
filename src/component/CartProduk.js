import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, Dimensions, Image, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";
import { API_URL } from "react-native-dotenv";

class CardProduk extends Component {
  constructor(props) {
    super(props);
  }

  toRupiah = (number) => {
    let rupiah = '';		
    let revNumber = number.toString().split('').reverse().join('');
    for(var i = 0; i < revNumber.length; i++) if(i%3 == 0) rupiah += revNumber.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
  }


  render() {
    const { navigate } = this.props.navigation;
    const dimensions = Dimensions.get('window');
    const item = this.props.data;
    const index = this.props.index;
    let margin = {
      marginBottom: 10
    }
    // alert(this.props.count);
    if (index == (this.props.count-1)) {
      margin = {
        marginBottom: 100
      }
    }
    
    return (
      <View keys={index} style={[styles.cardContainer, margin, { width: dimensions.width,  }]}>
        <TouchableOpacity style={{ position: 'relative', borderColor: "#aaa", borderWidth: .5, borderRadius: 5 }} onPress={() => navigate('Detail')}>
         <View style={{flex:1, flexDirection: 'row'}}>

         </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  imageCover: {
    flex: 1,
    height: 180,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  starIconContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  textDefault: {
    fontSize: 10,
    color: '#BDBDBD'
  },
  textSeparator: {
    marginHorizontal: 5,
    marginBottom: 10
  },
  kostName: {
    color: '#333',
    fontSize: 14,
    fontWeight: "600",
    flex: 1
  },
  textPrice: {
    fontWeight: '600',
    marginTop: -5,
    fontSize: 13
  },
  textUpdated: {
    color: '#757575',
    fontSize: 10,
    flex: 1,
    marginLeft: 5,
    paddingBottom: 5
  },
})

export default withNavigation(CardProduk);