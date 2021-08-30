import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const ChangeInfo = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>ChangeInfo component</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeInfo;
