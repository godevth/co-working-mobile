import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = (props) => {
  return (
    <>
      <TouchableOpacity
        style={[props.buttonContainer, {paddingVertical: 10}]}
        activeOpacity={1}
        onPress={props.onPress}>
        <Text style={[props.buttonTextStyle, {}]}>{props.title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;
