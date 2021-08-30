import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from '../Header';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';

const Shop = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} />

      <ScrollView style={{flex: 1, backgroundColor: '#DBDBD8'}}>
        <Collection />
        <Category />
        <TopProduct navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Shop;
