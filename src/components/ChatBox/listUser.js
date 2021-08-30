import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';

import HeaderChat from '../Shop/HeaderChat';

const listUser = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const ip = '192.168.1.3';

  const {id} = route.params;

  useEffect(() => {
    let isUnmouted = false;
    let repeat;

    fetch(`http://${ip}/WebService/dataChat.php`, {
      method: 'POSt',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (!isUnmouted) {
          setData(responseJson.Users);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
    return () => {
      isUnmouted = true;
    };
  }, [data]);

  const openChat = ({item}) => {
    navigation.push('ChatBox', {
      uidR: item.id,
      uidS: id,
    });
  };

  return (
    <View>
      <HeaderChat navigation={navigation} />
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    openChat({item});
                  }}>
                  <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <Image
                      source={{
                        uri: item.avatar,
                      }}
                      style={{width: 50, height: 50, borderRadius: 50}}
                    />
                    <View
                      style={{
                        padding: 5,
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          fontFamily: 'sans-serif',
                        }}>
                        {item.username}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'sans-serif',
                        }}>
                        {item.mess}
                      </Text>
                    </View>
                  </View>
                  <View></View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default listUser;
