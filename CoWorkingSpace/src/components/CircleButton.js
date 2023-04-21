import React from 'react';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function CircleButton(props) {

    let localStyles = styles(props)
    return (
      <View style={localStyles.container}>

        <LinearGradient
          start={[1, 0.5]}
          end={[0, 0]}
          colors={this.props.gradientColors}
          style={localStyles.linearGradient}
        >
          <TouchableOpacity
            activeOpacity={.8}
            style = {localStyles.button}
            onPress = {this.props.onPress}
          >
            {this.props.children}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    )
}

const gradientMargin = (circleDiameter) => {
  const ratio = (1 - gradientRatio(circleDiameter)) / 2

  return circleDiameter * ratio
}

const gradientRatio = (circleDiameter) => {
  if(circleDiameter < 100){
    return 0.88
  }else{
    return 0.96
  }
}

const styles = (props) => StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 0,
  },
  linearGradient: {
    // borderRadius: props.circleDiameter / 2,
    width: props.circleDiameter,
    height: props.circleDiameter,
  },
  button: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 90,
    borderTopWidth: 90,
    borderRightColor: 'transparent',
    borderTopColor: '#F55353',
  },
  
});