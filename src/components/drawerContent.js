import React, {useContext, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, StyleSheet, Alert, NativeModules} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import AuthContext from './context';

import Icon from 'react-native-vector-icons/Ionicons';

export function DrawerContent(props) {
  const {signOut} = useContext(AuthContext);
  const {
    drawerSection,
    bottomDrawerSection,
    drawerContent,
    userInfoSection,
    title,
    caption,
    row,
    section,
    paragraph,
  } = styles;
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={drawerContent}>
          <View style={userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: 'https://scontent.fhph1-2.fna.fbcdn.net/v/t1.6435-9/116747196_2751702121766644_2840433507759755216_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8F408-X80aoAX-5gKFA&_nc_ht=scontent.fhph1-2.fna&oh=4eedc0212e4461146fb7c6bb034e874a&oe=613CC3EF',
                }}
                size={60}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={title}>Lê Minh Hiệp</Title>
                <Caption style={caption}>@HinPi</Caption>
              </View>
            </View>
          </View>
          <View style={row}>
            <View style={section}>
              <Paragraph style={[paragraph, caption]}>1</Paragraph>
              <Caption style={caption}>Following</Caption>
            </View>
            <View style={section}>
              <Paragraph style={[paragraph, caption]}>8000</Paragraph>
              <Caption style={caption}>Follower</Caption>
            </View>
          </View>

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
              label="Information"
              icon={({color, size}) => (
                <Icon name="person-outline" size={size} color={color} />
              )}
              onPress={() => {
                props.navigation.navigate('Info');
              }}
            />
            <Drawer.Item
              label="Authentication"
              icon={({color, size}) => (
                <Icon name="keypad-outline" size={size} color={color} />
              )}
              onPress={() => {
                props.navigation.navigate('Authentication');
              }}
            />
            <Drawer.Item
              label="Order"
              icon={({color, size}) => (
                <Icon name="clipboard-outline" size={size} color={color} />
              )}
              onPress={() => {
                props.navigation.navigate('Order');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={bottomDrawerSection}>
        <Drawer.Item
          label="Log out"
          icon={({color, size}) => (
            <Icon name="log-out-outline" size={size} color={color} />
          )}
          onPress={() => {
            Alert.alert('Confirm', 'Do you want log out?', [
              {
                text: 'Yes',
                onPress: () => {
                  props.navigation.navigate('Home');
                  signOut();
                },
              },
              {text: 'Cancel'},
            ]);
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
