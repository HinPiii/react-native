import React, {Component} from 'react';
import {Dimensions, Text, View, StyleSheet, Image} from 'react-native';
import banner from '../../../img/banner/banner-sen-da-ra-hoa.jpg';

const {width, height} = Dimensions.get('window');

const Collection = () => {
  const {wrapper, textStyle, imageStyle} = styles;
  return (
    <View style={wrapper}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={textStyle}>Senda Collection</Text>
      </View>
      <View style={{flex: 4}}>
        <Image source={banner} style={imageStyle} />
      </View>
    </View>
  );
};

const imgWidth = width - 40;
const imgHeight = (height / 880) * 200;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    height: height * 0.3,
    margin: 10,
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#2E272B',
    shadowOpacity: 1,
    elevation: 10,
    backgroundColor: '#fff',
  },
  textStyle: {
    marginLeft: 10,
    fontSize: 23,
    color: '#AFAEAF',
  },
  imageStyle: {
    height: imgHeight,
    width: imgWidth,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default Collection;
