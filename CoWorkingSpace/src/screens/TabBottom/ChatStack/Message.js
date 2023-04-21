import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {moderateScale} from '../../../constants/scale';
import {Res} from '../../../constants/env';
import {MessageBubble} from '../../../components';

const Message = (props) => {
  return (
    <SafeAreaView>
      <MessageBubble mine text={'Hello!'} />
      <MessageBubble text={'Hi!'} />
      <MessageBubble mine text={'Do you like it?'} image={Res.Images.MainLogo} />
      <MessageBubble text={'Great!'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    marginVertical: moderateScale(7, 2),
  },
  mine: {
    marginLeft: 20,
  },
  not_mine: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  cloud: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  text: {
    paddingTop: 3,
    fontSize: Res.Sizes.Header,
    lineHeight: 22,
  },
  arrow_container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    flex: 1,
  },
  arrow_left_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  arrow_right_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  arrow_left: {
    left: moderateScale(-6, 0.5),
  },
  arrow_right: {
    right: moderateScale(-6, 0.5),
  },
});

export default Message;
