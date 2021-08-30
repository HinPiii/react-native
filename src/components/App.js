import {View} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LogBox} from 'react-native';
import Cart from './Shop/Cart/Cart';
import Shop from './Shop/Home/Shop';
import Search from './Shop/Search/Search';
import Store from './Shop/Store/Store';
import listUser from './ChatBox/listUser';
import Header from './Shop/Header';
import ChangeInfo from './ChangeInfo/ChangeInfo';
import Authentication from './Authentication/Authentication';
import Login from './Account/Login';
import OrderHistory from './OrderHistory/OrderHistory';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import AuthContext from './context';
import {DrawerContent} from './drawerContent';
import {DrawerContentt} from './drawerContentt';
import TopProduct from './Shop/Home/TopProduct';
import Detail from './Shop/Home/Detail';
import ChatBox from '../components/ChatBox/ChatBox';
import PostData from './Shop/Search/PostData';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

import AsyncStorage from '@react-native-community/async-storage';

LogBox.ignoreLogs(['Reanimated 2']);

console.reportErrorsAsExceptions = false;

const App = () => {
  const [jwt, setJwt] = useState('');
  const [idUser, setIdUser] = useState('');

  const Data = () => {
    const isUnmount = false;
    try {
      AsyncStorage.getItem('jwt').then(value => {
        if (value != null) {
          if (!isUnmount) {
            setJwt(value);
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

  Data();

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

  const removeItem = async () => {
    const isUnmount = false;
    try {
      if (!isUnmount) {
        await AsyncStorage.removeItem('jwt');
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('id');
        setJwt(null);
        setIdUser(null);
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      isUnmount = true;
    };
  };

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        Data();
      },
      signOut: () => {
        removeItem();
      },
    };
  });

  const Bottom = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: '#EEEEEE',
          tabBarStyle: {
            position: 'absolute',
            bottom: 40,
            marginHorizontal: 20,
            left: 20,
            right: 20,
            borderRadius: 20,
            height: 60,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
          },
        }}>
        <Tab.Screen
          name="Shop"
          component={Shop}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Icon
                  name="home"
                  size={25}
                  color={focused ? '#34B089' : 'gray'}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          initialParams={{id: idUser}}
          name="Cart"
          component={Cart}
          options={{
            tabBarBadge: 3,
            tabBarIcon: ({focused}) => (
              <View>
                <Icon
                  name="cart"
                  size={25}
                  color={focused ? '#34B089' : 'gray'}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          initialParams={{id: idUser}}
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Icon
                  name="newspaper"
                  size={25}
                  color={focused ? '#34B089' : 'gray'}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          initialParams={{id: idUser}}
          name="Store"
          component={Store}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <FontAwesome5
                  name="store"
                  size={25}
                  color={focused ? '#34B089' : 'gray'}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const logout = () => {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Bottom} />
        <Drawer.Screen name="Info" component={ChangeInfo} />
        <Drawer.Screen name="Authentication" component={Authentication} />
        <Drawer.Screen name="Order" component={OrderHistory} />
      </Drawer.Navigator>
    );
  };

  const login = () => {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <DrawerContentt {...props} />}>
        <Drawer.Screen name="Home" component={Bottom} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          {jwt ? (
            <Stack.Navigator
              screenOptions={{headerShown: false, gestureEnabled: true}}>
              <Stack.Screen name="Homee" component={logout} />
              <Stack.Screen name="listUser" component={listUser} />
              <Stack.Screen name="Header" component={Header} />
              <Stack.Screen name="TopProduct" component={TopProduct} />
              <Stack.Screen name="Detail" component={Detail} />
              <Stack.Screen name="ChatBox" component={ChatBox} />
              <Stack.Screen name="PostData" component={PostData} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{headerShown: false, gestureEnabled: true}}>
              <Stack.Screen name="Homee" component={login} />
              <Stack.Screen name="listUser" component={listUser} />
              <Stack.Screen name="Header" component={Header} />
              <Stack.Screen name="TopProduct" component={TopProduct} />
              <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
};

export default App;
