import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Styles} from '../styles/styles';
import {Res} from '../constants/env';

const Title = ({title, subtitle}) => {
  return (
    <>
      <View style={[Styles.container]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subtitle}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Res.Colors.Black,
    fontWeight: 'bold',
    fontSize: Res.Sizes.Huge,
    marginBottom: '3%'
  },
  subTitle: {
      color: Res.Colors.Black,
      fontSize: Res.Sizes.Header,
  }
});

export default Title;
