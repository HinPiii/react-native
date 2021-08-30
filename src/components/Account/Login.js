import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../context';

const Login = () => {
  const {signIn} = useContext(AuthContext);

  const ip = '192.168.1.3';
  const {wrapper, container, header, textInput, button} = styles;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    fetch(`http://${ip}/WebService/login.php`, {
      method: 'POSt',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson[0].mess == 'Data Matched') {
          try {
            AsyncStorage.setItem('jwt', responseJson[0].jwt);
            AsyncStorage.setItem('id', responseJson[0].id);
            signIn();
          } catch (error) {
            console.log(error);
          }
        } else {
          Alert.alert('Warning', responseJson[0].mess);
        }
      })
      .catch(err => console.error(err));
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={wrapper}>
      <View style={container}>
        <Text style={header}>- LOGIN -</Text>
        <TextInput
          style={textInput}
          placeholder="Username"
          placeholderTextColor="#DDDDDD"
          onChangeText={text => setUsername(text)}
          value={username}
          autoCapitalize="none"
        />
        <TextInput
          style={textInput}
          placeholder="Password"
          placeholderTextColor="#DDDDDD"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={button}
          onPress={() => {
            login();
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    borderRadius: 20,
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: 'black',
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center',
  },
});

export default Login;
