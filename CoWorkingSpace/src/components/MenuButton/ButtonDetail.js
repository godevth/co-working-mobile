import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from '../../constants/scale';
import { Res } from '../../constants/env';

const MenuButton = (props) => {
    const {label, image, index} = props;
    return (
      <View style={styles.ButtonContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={styles.icon} source={image} />
          <Text style={styles.text}>{label}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  text: {
    color: Res.Colors.Black,
    fontSize: Res.Sizes.Body,
    textAlign: 'center',
  },
  ButtonContainer: {
    shadowColor: Res.Colors.Black,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
    backgroundColor: Res.Colors.White,
    borderRadius: 7,
    // ...StyleSheet.absoluteFill
    // marginBottom: '4%',
    width: moderateScale(100),
    height: moderateScale(100),
  },
  icon: {
    width: moderateScale(35),
    height: moderateScale(35),
    marginVertical: '10%',
    resizeMode: 'contain',
  },
});

export default MenuButton;
