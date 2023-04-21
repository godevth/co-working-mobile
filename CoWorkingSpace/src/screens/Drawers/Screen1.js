import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {LocalizationContext} from '../../Languages/translations';
import {Styles} from '../../styles/styles';

const Screen1 = () => {

  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  return (
    <View style={[Styles.container, Styles.center]}>
      {/* <Text>{translations['name.page.location']}</Text> */}
      <Text>Location</Text>
    </View>
  );
};

export default Screen1;
