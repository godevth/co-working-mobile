import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Res } from '../constants/env';
import { moderateScale } from '../constants/scale';
import { Styles } from '../styles/styles';

const SearchBar = (props) => {
      const { term, onTermChange, onTermSubmit, onToggleSwitchPage, isSreenList } = props
    return (
      <View style={[styles.searchContainer, Styles.shadows, {}]}>

        {/* INPUT */}
        <View style={Styles.searchBar}>
          <Feather name="search" size={20} style={{marginLeft: moderateScale(10)}} />
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            placeholder={'Search'}
            placeholderTextColor={Res.Colors.Placeholder}
            containerStyle={{flex: 1}}
            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={{fontSize: Res.Sizes.Body}}
            renderErrorMessage={false}
            value={term}
            // Support Function
            // onChangeText={newTerm => onTermChange(newTerm)}
            // onEndEditing={() => onTermSubmit()}

            onChangeText={onTermChange}
            onEndEditing={onTermSubmit}
          />
        </View>

        {/* ICON MAP */}
        <TouchableOpacity onPress={onToggleSwitchPage}>
          { isSreenList 
            ? <FontAwesome name="map" size={22} style={{marginLeft: 10}} />
            : <Feather name="list" size={22} style={{marginLeft: 10}} />
          }
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 10,
  },
});

export default SearchBar;
