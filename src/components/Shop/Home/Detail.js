import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const Detail = ({route, navigation}) => {
  const {namePro, pricePro, imgPro, idUserSell, detailPro} = route.params;
  const {productImage, description, prices} = styles;
  const ip = '192.168.1.3';
  const [idUser, setIdUser] = useState('');
  const ID = () => {
    const isUnmount = false;
    try {
      AsyncStorage.getItem('id').then(value => {
        if (value != null) {
          if (!isUnmount) {
            setIdUser(value);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      isUnmount = true;
    };
  };

  ID();

  useEffect(() => {
    try {
      AsyncStorage.getItem('id').then(value => {
        if (value != null) {
          setIdUser(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createRecord = () => {
    fetch(`http://${ip}/WebService/addCart.php`, {
      method: 'POSt',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: namePro,
        price: pricePro,
        img: imgPro,
        idUser: idUser,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson[0].mess == 'Data Matched') {
          ToastAndroid.show('Add cart success', ToastAndroid.SHORT);
        }
      })
      .catch(err => console.error(err));
  };

  const openChat = () => {
    {
      idUser
        ? navigation.push('ChatBox', {
            uidS: idUser,
            uidR: idUserSell,
          })
        : alert('Please login first');
    }
  };

  return (
    <SafeAreaView>
      <Image
        source={{
          uri: imgPro,
        }}
        style={productImage}
      />
      <View>
        <Text style={description}>{detailPro}</Text>
        <Text style={prices}>{pricePro} $</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#34B089',
            padding: 10,
            borderRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              createRecord();
            }}>
            <View>
              <Text style={{color: '#fff'}}>Add to cart</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openChat();
            }}>
            <View>
              <Text style={{color: '#fff'}}>Chat now</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productImage: {
    borderRadius: 20,
    height: 300,
    width: '100%',
    resizeMode: 'center',
  },
  prices: {
    fontFamily: 'san-serif',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default Detail;
