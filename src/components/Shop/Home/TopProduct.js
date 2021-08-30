import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

const TopProduct = ({navigation}) => {
  const {
    container,
    titleContaier,
    title,
    body,
    productContainer,
    productImage,
    productName,
    productPrice,
  } = styles;
  const ip = '192.168.1.3';
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const isUnmount = false;
    fetch(`http://${ip}/WebService/test.php`)
      .then(response => response.json())
      .then(json => {
        if (!isUnmount) {
          setData(json.products);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
    return () => {
      isUnmount = true;
    };
  }, []);

  return (
    <View>
      <View style={container}>
        <View style={titleContaier}>
          <Text style={title}>Products</Text>
        </View>
        <View style={body} onStartShouldSetResponder={event => true}>
          {data.map((myItem, index) => {
            return (
              <View key={index.toString()}>
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      navigation.push('Detail', {
                        id: myItem.id,
                        namePro: myItem.name,
                        pricePro: myItem.price,
                        imgPro: myItem.image,
                        idUserSell: myItem.idUserSell,
                        detailPro: myItem.detail,
                      });
                    }}>
                    <View style={productContainer}>
                      <Image
                        source={{
                          uri: myItem.image,
                        }}
                        style={productImage}
                      />
                      <Text style={productName}>{myItem.name}</Text>
                      <Text style={productPrice}>{myItem.price}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');
const productWidth = (width - 40) / 2;
const prodcutImageHeight = (productWidth / 361) * 452;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 20,
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#2E272B',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: '#fff',
  },
  titleContaier: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  title: {fontSize: 23, color: '#AFAEAF'},
  body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productContainer: {
    marginBottom: 10,
    borderRadius: 20,
    width: productWidth,
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#2E272B',
    shadowOpacity: 0.5,
    elevation: 10,
    backgroundColor: '#fff',
  },
  productImage: {
    borderRadius: 20,
    width: productWidth,
    height: prodcutImageHeight,
    resizeMode: 'center',
  },
  productName: {
    marginVertical: 5,
    fontWeight: '500',
    color: '#AFAEAF',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  productPrice: {
    marginBottom: 5,
    fontWeight: '500',
    color: '#662F90',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});

export default TopProduct;
