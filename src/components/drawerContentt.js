import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {Drawer, Text} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

export function DrawerContentt(props) {
  const {drawerSection} = styles;
  return (
    <DrawerContentScrollView>
      <Drawer.Section style={drawerSection}>
        <Drawer.Item
          label="Home"
          icon={({color, size}) => (
            <Icon name="home-outline" size={size} color={color} />
          )}
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        />
        <Drawer.Item
          label="Login"
          icon={({color, size}) => (
            <Icon name="log-in-outline" size={size} color={color} />
          )}
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerSection: {
    marginTop: 15,
  },
});
