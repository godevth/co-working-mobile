import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Styles} from '../styles/styles';

const Ribbon = ({value}) => {
  return (
    <>
      <View style={[Styles.sale]}></View>
      <View style={[Styles.ribbin]}>
        <Text
          style={[
            Styles.saleText,
            {color: '#FFF', zIndex: 10, fontWeight: 'bold'},
          ]}>
          {value}%
        </Text>
      </View>
    </>
  );
};

export default Ribbon;
