import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const PostData = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>Post data component</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostData;
