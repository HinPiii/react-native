import React, {useState, useEffect, Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../Header';

import Icon from 'react-native-vector-icons/Ionicons';

const Cart = ({navigation, route}) => {
  const [total, setTotal] = useState('');
  const [items, setItem] = useState([]);
  const ip = '192.168.1.3';

  const idUser = route.params.id;

  useEffect(() => {
    let unmounted = false;
    let totals = 0;
    if (idUser != '') {
      fetch(`http://${ip}/WebService/fetchCart.php`, {
        method: 'POSt',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUser: idUser,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (!unmounted) {
            const Data = [];
            if (responseJson != null) {
              for (let index = 0; index < responseJson.length; index++) {
                Data.push({
                  id: responseJson[index].id,
                  name: responseJson[index].namePro,
                  price: responseJson[index].pricePro,
                  image: responseJson[index].imgPro,
                  qty: responseJson[index].qty,
                });
                setTotal(
                  (totals += Number.parseInt(responseJson[index].pricePro)),
                );
              }
              setItem(Data);
            } else {
              setItem([]);
            }
          }
        })
        .catch(err => console.error(err));
    }
    return () => {
      unmounted = true;
    };
  }, [items]);

  const deleteRecord = ({item}) => {
    if (item != '') {
      fetch(`http://${ip}/WebService/deleteItemCart.php`, {
        method: 'POSt',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idItem: item.id,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
        })
        .catch(err => console.error(err));
    }
  };

  const renderItems = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={{uri: item.image}}
            style={{width: 110, height: 110}}
            resizeMode="center"
          />
        </View>
        <View style={{paddingLeft: 10, paddingTop: 15}}>
          <Text style={{fontFamily: 'san-serif', fontSize: 25}}>
            {item.name}
          </Text>
          <Text style={{fontFamily: 'san-serif'}}>{item.price}$</Text>
          <Text style={{fontFamily: 'san-serif'}}>Quantity: {item.qty}</Text>
        </View>
        <View style={{paddingLeft: 10, paddingTop: 15}}>
          <TouchableOpacity
            onPress={() => {
              deleteRecord({item});
            }}>
            <Icon name="trash" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} />
      <View>
        {items != '' ? <Text>Total: {total}$</Text> : <Text>Empty</Text>}
      </View>
      <FlatList
        style={{marginLeft: 10}}
        data={items}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default Cart;
