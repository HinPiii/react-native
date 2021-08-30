import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, Image} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import category from '../../../img/category/category.jpg';
import category1 from '../../../img/category/category1.jpg';
import category2 from '../../../img/category/category2.jpg';
import category3 from '../../../img/category/category3.jpg';

const {width, height} = Dimensions.get('window');

const Category = () => {
  const {wrapper, imageStyle, textStyle} = styles;
  return (
    <View style={wrapper}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={textStyle}>List of Category</Text>
      </View>
      <View style={{flex: 4}}>
        <SwiperFlatList
          style={{flex: 4}}
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={3}
          showPagination>
          <Image source={category} style={imageStyle} />
          <Image source={category1} style={imageStyle} />
          <Image source={category2} style={imageStyle} />
          <Image source={category3} style={imageStyle} />
        </SwiperFlatList>
      </View>
    </View>
  );
};
//880x320

const imgWidth = width - 40;
const imgHeight = imgWidth / 1.9;

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
    padding: 10,
    paddingTop: 0,
  },
  textStyle: {
    fontSize: 23,
    color: '#AFAEAF',
  },
  imageStyle: {height: imgHeight, width: imgWidth, borderRadius: 20},
});

export default Category;
