import 'react-native-gesture-handler';
import * as React from 'react';
import { Animated } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, useHeaderHeight, TransitionSpecs, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as ProviderPaper } from 'react-native-paper';
import { LocalizationProvider } from './src/Languages/translations';
import { Provider as AuthProvider } from './src/controllers/AuthController';
import { Provider as NavProvider} from './src/controllers/NavController';
import { ModalProvider } from './src/controllers/ModalController';
import Navigation from './src/navigation';

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

export default function App() {
  
    return (
      <AuthProvider>
        <ModalProvider>
          <LocalizationProvider>
            <ProviderPaper>
              <NavProvider>
                <Navigation/>
              </NavProvider>
            </ProviderPaper>
          </LocalizationProvider>
        </ModalProvider>
      </AuthProvider>
    );
}


// Comment !!
// * Important
// ! Do not sure
// ? Should this method be exposed
// TODO: refactor this method