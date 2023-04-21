import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ResultDetail from './ResultDetail';
import {withNavigation} from '@react-navigation/compat';
import {Res} from '../../constants/env';

const MemoList = (props, index) => {
  const {title, results, navigation, horizontal} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text
        style={{fontSize: Res.Sizes.Subhead, marginLeft: 18, marginBottom: 8}}>
        Result: {results.length}
      </Text>

      <FlatList
        horizontal={horizontal ? true : false}
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={Res.Bt_Active}
              onPress={() => navigation.navigate('DetailTest', {id: item.id})}>
              <ResultDetail
                result={item}
                index={index}
                horizontal={horizontal}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    // marginLeft: 18,
  },
  title: {
    fontSize: Res.Sizes.Body,
    fontWeight: 'bold',
    marginLeft: 18,
    // marginBottom: 8
  },
});

const ResultList = React.memo(MemoList);
export default withNavigation(ResultList);
