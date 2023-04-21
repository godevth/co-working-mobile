import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Styles} from '../../styles/styles';
import {Res} from '../../constants/env';
import { ActivityIndicator } from 'react-native-paper';
import LottieView from 'lottie-react-native/src/js';
import { moderateScale } from 'react-native-size-matters';

export function Loading(props) {
  const { type } = props;
  console.log('TYPE_LOADING : ', type);

  const Loading = () => {
    switch (type) {
      case 'Search':
        return <LottieView source={Res.Animation.Loading} autoPlay loop style={[{width: 100, height: 100}]}/>
      default:
        return (
          <View style={[
            Styles.center, Styles.shadows, 
            {
              backgroundColor: Res.Colors.White,
              width: moderateScale(100),
              height: moderateScale(100),
              borderRadius: 15
            }
          ]}>
            <ActivityIndicator animating={true} size={30} color={Res.Colors.Sender} style={Styles.center}/>
          </View>
        )
    }
  }

  return (
      <View style={Styles.loadingContainer}>
        <View style={Styles.center}>
          {Loading()}
        </View>
      </View>
  )
}

const styles = StyleSheet.create({})