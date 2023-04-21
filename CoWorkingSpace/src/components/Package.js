import React from 'react';
import {View, Text} from 'react-native';
import {Styles} from '../styles/styles';
import {Res} from '../constants/env';

const Package = ({
  title,
  price,
  location,
  capacity,
  dateStart,
  dateEnd,
  showButton,
}) => {
  return (
    <View style={[Styles.shadows, Styles.containerPackage]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '4%',
        }}>
        <Text style={{fontSize: Res.Sizes.Header}}>
          {title ? title : 'Unknow'}
        </Text>
        <Text>฿ {price ? price : '-'}/mo</Text>
      </View>
      {/* Location */}
      <Text style={{color: Res.Colors.BlueLine, marginBottom: '4%'}}>
        {location ? location : 'Location'}
      </Text>
      {/* Detail */}
      <View style={{flexDirection: 'row'}}>
        <Text>Capacity : </Text>
        <Text style={{color: Res.Colors.BlueLine}}>
          {capacity ? capacity : '-'} people
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: '4%'}}>
        <Text style={{marginBottom: '4%'}}>Date : </Text>
        <Text style={{color: Res.Colors.BlueLine, marginBottom: '4%'}}>
          {dateStart} - {dateEnd}
        </Text>
      </View>
      {showButton ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Image</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Package;
