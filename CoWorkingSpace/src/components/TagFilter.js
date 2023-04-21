import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import {Res} from '../constants/env';
import { Styles } from '../styles/styles';

const TagFilter = (props) => {
  const {person, date, toggleOverlay, toggleOverlayPerson, toggleOverlayCalendar, onFilterSelect} = props;

  const _renderTagPerson = () => {
    return (
      <TouchableNativeFeedback onPress={toggleOverlayPerson}>
        <View style={[styles.tag, Styles.shadows]}>
          <Image source={Res.Images.People} style={styles.icon} />
          <Text style={styles.text}>{person}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const _renderTagDate = () => {
    return (
      <TouchableNativeFeedback onPress={toggleOverlayCalendar}>
        <View style={[styles.tag, Styles.shadows]}>
          <Text style={styles.text}>{date}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const _renderFilter = () => {
    return (
      <TouchableNativeFeedback onPress={toggleOverlay}>
        <View style={[styles.tag, Styles.shadows, {backgroundColor: onFilterSelect == true ? Res.Colors.Black : Res.Colors.White , marginRight: 0}]}>
        <Image source={onFilterSelect == true ? Res.Images.Filter_White : Res.Images.Filter_Black} style={styles.icon} />
          <Text style={{color: onFilterSelect == true ? Res.Colors.White : Res.Colors.Black, fontSize: Res.Sizes.Subhead}}>Filter</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
        {_renderTagPerson()}
        {_renderTagDate()}
        </View>
        {_renderFilter()}
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Res.Colors.Black,
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginRight: 10,
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginRight: 8,
  },
  text: {
    color: Res.Colors.White,
    fontSize: Res.Sizes.Subhead,
  },
});

export default TagFilter;
