import React from 'react';
import {Text, View, Image, TouchableNativeFeedback, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {Styles} from '../../styles/styles';
import {Res} from '../../constants/env';

export function DrawerContent(props) {
  // console.log('Props --> ', props)
  return (
    <View style={[Styles.container]}>
      <SafeAreaView style={[Styles.container]}>

        <TouchableNativeFeedback onPress={() => props.navigation.toggleDrawer()}>
          <View style={{width: 40, height: 40, borderWidth: 0, marginLeft: 15, justifyContent: 'center'}}>
            <Image 
              source={Res.Images.Close}
              style={{width: 23, height: 23, resizeMode: 'contain'}}/>
          </View>
        </TouchableNativeFeedback>

      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          // icon={({color, size}) => (
          //     <Icon
          //     name="home-outline"
          //     color={color}
          //     size={size}
          //     />
          // )}
          label="Home"
          labelStyle={{ fontSize: Res.Sizes.Header, color: Res.Colors.Black }}
          onPress={() => {
            props.navigation.navigate('Result');
          }}
        />
        <DrawerItem
          label="Wishlists"
          labelStyle={{ fontSize: Res.Sizes.Header, color: Res.Colors.Black }}
          onPress={() => {
            props.navigation.navigate('Wishlists');
          }}
        />
        <DrawerItem
          label="Location"
          labelStyle={{ fontSize: Res.Sizes.Header, color: Res.Colors.Black }}
          onPress={() => {
            props.navigation.navigate('Location');
          }}
        />
        <DrawerItem
          label="Workspace"
          labelStyle={{ fontSize: Res.Sizes.Header, color: Res.Colors.Black }}
          onPress={() => {
            props.navigation.navigate('Workspace');
          }}
        />
        <DrawerItem
          label="Enterprise"
          labelStyle={{ fontSize: Res.Sizes.Header, color: Res.Colors.Black }}
          onPress={() => {
            props.navigation.navigate('Enterprise');
          }}
        />
        <DrawerItem
          label="Ideas"
          labelStyle={{ fontSize: Res.Sizes.Header, color: Res.Colors.Black }}
          onPress={() => {
            props.navigation.navigate('Ideas');
          }}
        />
        <DrawerItem
          label="Settings"
          labelStyle={{ fontSize: Res.Sizes.Header, color: Res.Colors.Black }}
          onPress={() => {
            props.navigation.navigate('Settings');
          }}
        />
      </DrawerContentScrollView>
      <DrawerItem
          label="Sign in"
          labelStyle={{ fontSize: Res.Sizes.Header}}
          onPress={() => {
            props.navigation.navigate('SignIn');
          }}
        />
      </SafeAreaView>
    </View>
  );
}
