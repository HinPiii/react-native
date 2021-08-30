import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const {height} = Dimensions.get('window');

const HeaderChat = ({navigation}) => {
  const {textInput, color, titleStyle} = style;

  return (
    <View style={color}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={40} color="#fff" />
        </TouchableOpacity>
        <Text style={titleStyle}>Chat Box</Text>
        <TouchableOpacity
          onPress={() => {
            alert('Not finished yet');
          }}>
          <Icon name="information-circle" size={40} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  color: {backgroundColor: '#34B089', padding: 10, height: height / 15},
  titleStyle: {
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: 30,
  },
});

export default HeaderChat;
