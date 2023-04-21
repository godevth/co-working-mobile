import * as React from "react";
import { Image, StyleSheet, StatusBar, Dimensions, Animated } from 'react-native';
// import { Animated } from 'react-native-reanimated'

const { Extrapolate, interpolate } = Animated;
const { height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;

export const BUTTON_HEIGHT = 48;
export const BUTTON_WIDTH = 200;

export const MIN_HEADER_HEIGHT = 64 + StatusBar.currentHeight;
export const MAX_HEADER_HEIGHT = height * (1 - 1 / φ);
export const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;

const Cover = ({ y, cover }) => {
    
    const scale = interpolate(y, {
      inputRange: [-MAX_HEADER_HEIGHT, 0],
      outputRange: [4, 1],
      extrapolateRight: Extrapolate.CLAMP,
    });
    const opacity = interpolate(y, {
      inputRange: [-64, 0, HEADER_DELTA],
      outputRange: [0, 0.2, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
        <Image style={styles.image} source={cover} />
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}
        />
      </Animated.View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: undefined,
      height: undefined,
    },
  });

  export default Cover;