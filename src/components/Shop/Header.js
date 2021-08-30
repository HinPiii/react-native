import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {color} from 'react-native-reanimated';

const {height} = Dimensions.get('window');

const Header = ({navigation}) => {
  const [jwt, setJwt] = useState('');
  const {wrapper, row1, textInput, titleStyle} = styles;

  useEffect(() => {
    try {
      AsyncStorage.getItem('id').then(value => {
        if (value != null) {
          setJwt(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={wrapper}>
      <View style={row1}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name="menu" size={40} color="#fff" />
        </TouchableOpacity>
        <Text style={titleStyle}>HinPi Shop</Text>
        <TouchableOpacity
          onPress={() => {
            if (jwt != '') {
              navigation.push('listUser', {
                id: jwt,
              });
            } else {
              Alert.alert('Warning', 'Please log in first');
            }
          }}>
          <Icon name="chatbubble-ellipses-outline" size={35} color="#fff" />
          <Icon
            name="ellipse"
            size={13}
            color="#3366CC"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: height / 15,
    backgroundColor: '#34B089',
    padding: 10,
    justifyContent: 'space-around',
  },
  titleStyle: {color: '#fff', fontFamily: 'sans-serif', fontSize: 25},
  row1: {flexDirection: 'row', justifyContent: 'space-between'},
  textInput: {
    height: height / 20,
    backgroundColor: '#fff',
    fontFamily: 'sans-serif',
    paddingLeft: 10,
    color: 'black',
    borderRadius: 20,
  },
});

export default Header;
