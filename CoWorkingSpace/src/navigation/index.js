import 'react-native-gesture-handler';
import * as React from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Image, View, Animated } from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, useHeaderHeight, TransitionSpecs, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Headers } from '../components';
import {Search, SignIn, SignUp, ForgotPass, Register, Notification} from '../screens'
import {Screen1, Screen2, Screen3, Screen4, Settings, DrawerContent, Wishlists} from '../screens/Drawers';
import {List, History, User, Booking, Chat, OrderDetails, ResultShowScreen, Messages, Details} from '../screens/TabBottom';
import { Res } from '../constants/env';
import { Context as NavContext } from '../controllers/NavController';
import { navigationRef, isReadyRef } from '../../RootNavigation';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const StackList = createStackNavigator();
const MessageList = createStackNavigator();
const Wishlist = createStackNavigator();
const Tap = createBottomTabNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 100,
    mass: 6,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

export default function Navigation() {

    const { state } = React.useContext(NavContext);
    console.log('Nav State : ', state );
  
    React.useEffect(() => {

      // Config Google
      GoogleSignin.configure({
        // what API you want to access on behalf of the user, default is email and profile
        scopes: ['email'], 
        webClientId:
          '41381668334-vnn44l4gc62j20gvtul3d27r2enla525.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        // if you want to access Google API on behalf of the user FROM YOUR SERVER
        offlineAccess: true, 
        forceCodeForRefreshToken: true,
      });

      SplashScreen.hide();

      return () => {
        isReadyRef.current = false
      };
    }, []);

    // console.log('HEADER HEIGHT --> ', useHeaderHeight());

    const createMainStack = () => {
      return (
        <Stack.Navigator
          initialRouteName='SearchScreen'
          animation='fade'
          headerMode='screen'
          screenOptions={({route}) => ({
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
            // transitionSpec: {
            //   open: TransitionSpecs.TransitionIOSSpec,
            //   close: TransitionSpecs.TransitionIOSSpec,
            // },
            // transitionSpec: {
            //   open: config,
            //   close: config,
            // },
            // headerStyleInterpolator: forFade,
            header: ({ scene, previous, navigation, ...props}) => {
              const { options } = scene.descriptor;
              const title =
                options.headerTitle !== undefined
                  ? options.headerTitle
                  : options.title !== undefined
                  ? options.title
                  : scene.route.name;
              
              return (
                // <MyHeader
                //   title={title}
                //   leftButton={
                //     previous ? <MyBackButton onPress={navigation.goBack} /> : undefined
                //   }
                //   style={options.headerStyle}
                // />
                <Headers props={props} route={route} navigation={navigation}/>
              );
            }
          })}
        >
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: true}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: true}}/>
          <Stack.Screen name="SearchScreen" component={Search} options={{headerShown: true}}/>
          <Stack.Screen name="Result" children={createBottom} options={{headerShown: true}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: true}}/>
          <Stack.Screen name="Forgot" component={ForgotPass} options={{headerShown: true}}/>
          <Stack.Screen 
            name="Notification" 
            component={Notification} 
            options={{
              headerShown: true,
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
            }}/>
          <Stack.Screen name="Wishlist" component={Wishlists} options={{headerShown: true}}/>
        </Stack.Navigator>
      );
    };

    const createDetailStack = () => {
      return (
        <StackList.Navigator
          headerMode='float'
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        >
          <StackList.Screen name="List" component={List} options={{headerShown: false}}/>
          <StackList.Screen name="Detail" component={ResultShowScreen} options={{headerShown: false}}/>
          <StackList.Screen name="DetailTest" component={Details} options={{headerShown: false}}/>
          <StackList.Screen name="OrderDetails" component={OrderDetails} options={{headerShown: false}}/>
        </StackList.Navigator>
      );
    };

    const createMessageStack = () => {
      return (
        <MessageList.Navigator>
          <MessageList.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
          {/* <MessageList.Screen name="Message" component={Message} options={{headerShown: false}}/> */}
          <MessageList.Screen name="Messages" component={Messages} options={{headerShown: false}}/>
        </MessageList.Navigator>
      )
    }

    // Default Buttom
    const createBottom = () => {
      return (
        <Tap.Navigator
          initialRouteName="ListHome"
          tabBarOptions={{
            tabStyle: {},
            showLabel: false,
            // tabStyle: {borderColor: 'red', borderWidth: 2}
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const tintColor = focused ? Res.Colors.BlueLine : Res.Colors.Black;
              let iconName;

              if (route.name === 'ListHome') {
                iconName = focused ? Res.Images.TB_Home_B : Res.Images.TB_Home_B;
              } else if (route.name === 'History') {
                iconName = focused ? Res.Images.TB_History_B : Res.Images.TB_History_B;
              } else if (route.name === 'Booking') {
                iconName = focused ? Res.Images.TB_Ticket_B  : Res.Images.TB_Ticket_B;
              } else if (route.name === 'ChatHome') {
                iconName = focused ? Res.Images.TB_Chat_B : Res.Images.TB_Chat_B;
              } else if (route.name === 'User') {
                iconName = focused ? Res.Images.TB_User_B : Res.Images.TB_User_B;
              } 

              // Return Image Buttom Tab
              return (
                <View style={{borderWidth: 0}}>
                  <Image source={iconName} style={{width: 21, height: 21, tintColor: tintColor}} resizeMode='contain' />
                </View>
              )
            },
          })}
        >
          <Tap.Screen name="ListHome" children={createDetailStack} options={{tabBarVisible: state.tabbarVisible}}/>
          <Tap.Screen name="History" component={History} />
          <Tap.Screen name="Booking" component={Booking} />
          <Tap.Screen name="ChatHome" component={createMessageStack} />
          <Tap.Screen name="User" component={User} />
        </Tap.Navigator>
      )
    };

    return (

                <NavigationContainer 
                  ref={navigationRef}
                  onReady={() => {
                    isReadyRef.current = true;
                  }}>
                  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} drawerContentOptions={{ activeBackgroundColor: '#5cbbff', activeTintColor: '#ffffff' }}>
                    <Drawer.Screen name="Home" children={createMainStack}/>
                    <Drawer.Screen name="Wishlists" component={Wishlists}/>
                    <Drawer.Screen name="Location" component={Screen1} />
                    <Drawer.Screen name="Workspace" component={Screen2} />
                    <Drawer.Screen name="Enterprise" component={Screen3} />
                    <Drawer.Screen name="Ideas" component={Screen4} />
                    <Drawer.Screen name="Settings" component={Settings} />
                  </Drawer.Navigator>
                </NavigationContainer>
              
    );
}