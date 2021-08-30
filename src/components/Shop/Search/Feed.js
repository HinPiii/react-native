import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Feed = () => {
  const [items, setItem] = useState([]);
  const ip = '192.168.1.3';
  // const {
  //   header,
  //   row,
  //   avatarUser,
  //   User,
  //   post,
  //   photo,
  //   footer,
  //   footerCount,
  //   textCount,
  //   footerMenu,
  //   btn,
  //   icn,
  //   text,
  // } = styles;

  useEffect(() => {
    fetch(`http://${ip}/WebService/loadNF.php`)
      .then(response => response.json())
      .then(responseJson => {
        const Data = [];
        if (responseJson != null) {
          for (let index = 0; index < responseJson.Users.length; index++) {
            Data.push({
              content: responseJson.Users[index].content,
              name: responseJson.Users[index].displayName,
              avatar: responseJson.Users[index].avatar,
              image: responseJson.Users[index].image,
            });
          }
        }
        setItem(Data);
      })
      .catch(err => console.error(err));
  }, []);

  const renderItems = ({item}) => {
    const {
      header,
      row,
      avatarUser,
      User,
      post,
      photo,
      footer,
      footerCount,
      textCount,
      footerMenu,
    } = styles;
    return (
      <View>
        <View style={header}>
          <View style={row}>
            <Image
              source={{
                uri: item.avatar,
              }}
              style={avatarUser}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={User}>{item.name}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={post}>{item.content}</Text>
        </View>
        <Image source={{uri: item.image}} style={photo} />
        <View style={{borderBottomColor: 'gray', borderBottomWidth: 0.5}}>
          <View style={footer}>
            <View style={footerCount}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="heart"
                  size={20}
                  color="#ee2f51"
                  style={{marginRight: 6}}
                />
                <Text style={textCount}>0</Text>
              </View>
              <Text style={textCount}>0 comment</Text>
            </View>
          </View>
        </View>
        <View style={footerMenu}>
          <View>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Icon name="heart-outline" size={25} />
                <Text style={{marginLeft: 5, fontSize: 17}}>Heart</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Icon name="chatbox-outline" size={25} />
                <Text style={{marginLeft: 5, fontSize: 17}}>Comment</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Icon name="arrow-redo-outline" size={25} />
                <Text style={{marginLeft: 5, fontSize: 17}}>Share</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={items}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    padding: 11,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarUser: {width: 50, height: 50, borderRadius: 50},
  User: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222121',
  },
  post: {
    fontSize: 17,
    color: '#222121',
    lineHeight: 16,
    padding: 11,
  },
  photo: {
    marginTop: 9,
    width: '100%',
    height: 300,
  },
  footer: {
    padding: 11,
  },
  footerCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCount: {
    fontSize: 15,
    color: '#424040',
  },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 9,
  },
});

export default Feed;
