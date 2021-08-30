import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Header from '../Header';
import RNFetchBlob from 'react-native-fetch-blob';

const Store = ({navigation, route}) => {
  const ip = '192.168.1.3';

  const [imageUri, setimageUriGallery] = useState(null);
  const [pic, setPic] = useState(null);
  const idUser = route.params.id;

  const [namePro, setnamePro] = useState('');
  const [pricePro, setpricePro] = useState('');
  const [detailPro, setdetailPro] = useState('');
  const [quantity, setquantity] = useState('');

  const OpenGallery = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        const direct = response.assets[0].uri;
        setimageUriGallery(source);
        setPic(direct);
      }
    });
  };

  const OpenCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        const direct = response.assets[0].uri;
        setimageUriGallery(source);
        setPic(direct);
      }
    });
  };

  const Upload = () => {
    RNFetchBlob.fetch(
      'POST',
      `http://${ip}/WebService/upload.php`,
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'image',
          filename: 'avatar.png',
          data: RNFetchBlob.wrap(pic),
        },
      ],
    )
      .then(response => response.json())
      .then(responseJson => {
        fetch(`http://${ip}/WebService/postData.php`, {
          method: 'POSt',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idUser,
            img: responseJson[0].mess,
            name: namePro,
            price: pricePro,
            detail: detailPro,
            quantity: quantity,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson);
          })
          .catch(err => console.error(err));
      })
      .then(setimageUriGallery(null), alert('Upload success'))
      .catch(err => console.error('error: ' + err));
  };

  return (
    <View>
      <Header navigation={navigation} />
      <TouchableOpacity
        onPress={() => {
          OpenGallery();
        }}>
        <Text>Open gallery</Text>
      </TouchableOpacity>
      <Image
        source={imageUri}
        style={{
          height: 150,
          width: 100,
        }}
      />
      <TextInput
        placeholder="Name"
        placeholderTextColor="#DDDDDD"
        onChangeText={text => setnamePro(text)}
        value={namePro}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="detail"
        placeholderTextColor="#DDDDDD"
        onChangeText={text => setdetailPro(text)}
        value={detailPro}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="price"
        placeholderTextColor="#DDDDDD"
        onChangeText={text => setpricePro(text)}
        value={pricePro}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="quantity"
        placeholderTextColor="#DDDDDD"
        onChangeText={text => setquantity(text)}
        value={quantity}
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() => {
          Upload();
        }}>
        <Text>Upload file</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Store;
