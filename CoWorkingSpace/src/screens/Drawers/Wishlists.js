import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {LocalizationContext} from '../../Languages/translations';
import { Res } from '../../constants/env';
import {Styles} from '../../styles/styles';

const Wishlists = () => {

  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();
  
  return (
    <View style={[Styles.container, Styles.center, {backgroundColor: Res.Colors.White, paddingHorizontal: 18,}]}>
      <View style={[{ paddingVertical: 20 }]}>
        <Text>{translations['name.page.wishlists']}</Text>
      </View>
    </View>
  );
};

export default Wishlists;
