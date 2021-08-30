import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const OrderHistory = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>OrderHistory component</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderHistory;
