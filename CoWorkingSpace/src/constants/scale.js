import { Dimensions, Platform } from 'react-native';

const {width, height} = Dimensions.get('window');

export const DEVICE_WIDTH = width;
export const DEVICE_HEIGHT = height;
export const CARD_HEIGHT = 220;
export const CARD_WIDTH = width * 0.8;
export const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

// const guidelineBaseWidth = 320;
// const guidelineBaseHeight = 568;

const scale = size => DEVICE_WIDTH / guidelineBaseWidth * size;
const verticalScale = size => DEVICE_HEIGHT / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};