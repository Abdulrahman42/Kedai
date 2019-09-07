import React, { Component } from 'react';
import { View, Text } from 'react-native';

export const isLoading = () => {
    return (
        <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator size={50} color="#e37171" />
      </View>
    )
  }