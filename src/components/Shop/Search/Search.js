import React, {Component, useEffect, useState} from 'react';
import Header from '../Header';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Feed from './Feed';

const Search = ({navigation, route}) => {
  const idUser = route.params.id;
  const [items, setItem] = useState([]);
  const ip = '192.168.1.3';
  const {avatarUser, input, divider} = styles;

  useEffect(() => {
    if (idUser != '') {
      fetch(`http://${ip}/WebService/loadUser.php`, {
        method: 'POSt',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: idUser,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          const Data = [];
          if (responseJson != null) {
            Data.push({
              avatar: responseJson.Users[0].avatar,
              name: responseJson.Users[0].displayName,
            });
          }
          setItem(Data);
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <View style={{flex: 1, marginBottom: 126}}>
      <Header navigation={navigation} />
      <View style={{margin: 35}}>
        {items.map((myItem, index) => {
          return (
            <View key={index.toString()}>
              <View style={divider}>
                <Image
                  source={{
                    uri: myItem.avatar,
                  }}
                  style={avatarUser}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('PostData');
                  }}>
                  <View
                    style={{
                      padding: 8,
                    }}>
                    <TextInput
                      editable={false}
                      style={input}
                      placeholder="What's on yoru mind? "
                      placeholderTextColor="gray"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      <Feed />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarUser: {width: 50, height: 50, borderRadius: 50},
  input: {
    height: 50,
    width: '100%',
  },
  divider: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: -25,
    left: -25,
  },
});

export default Search;
