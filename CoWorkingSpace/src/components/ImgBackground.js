import React from 'react';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Res } from '../constants/env';
import { Styles } from '../styles/styles';

const BG = ({children, colorsGradient}) => {
  return (
    <ImageBackground
      source={Res.Images.BackgroundTest}
      style={{flex: 1, width: '100%'}}
      // blurRadius={10}
    >
      <LinearGradient
        colors={colorsGradient}
        style={{flex: 1}}>
          {children}
      </LinearGradient>
    </ImageBackground>
  );
};

const ImgBackground = React.memo(BG)
export default ImgBackground;
