import React from 'react';
import {View, FlatList, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {scale, verticalScale, moderateScale} from '../../constants/scale';
import MenuButton from './ButtonDetail';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Menu = ({renderHeader, renderButton, buttonList, numColumns, columnWrapperStyle, containerStyle}) => {

  let localStyles = styles({numColumns})

  const formatButton = (buttonList, numColumns) => {
    const totalRows = Math.floor(buttonList.length / numColumns);
    let totalLastRow = buttonList.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      buttonList.push({page: 'blank', label: 'blank', empty: true});
      totalLastRow++;
    }

    return buttonList;
  };

  // สร้าง List ปุ่มกดต่างๆ
  const _renderButton = ({item, index}) => {
    // console.log('-->', item)
    if (item.empty) {
      return (
        <View style={localStyles.buttomView} />
      );
    }
    return (
      <View style={[localStyles.buttomView]}>
        <TouchableOpacity
          onPress={
            // this.props.navigation.navigate('Menu')
            item.onPress ? item.onPress : () => console.log('Goto ==> ', item.label)
          }
          activeOpacity={0.6}>
          <MenuButton label={item.label} image={item.sourceImg} index={index}/>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[localStyles.container, containerStyle]}>
      <FlatList
        data={formatButton(buttonList, numColumns)}
        ListHeaderComponent={renderHeader}
        renderItem={(index) => _renderButton(index)}
        columnWrapperStyle={columnWrapperStyle}
        ListFooterComponent={renderButton}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = (props) => StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'stretch',
    // borderWidth: 4,
    justifyContent: 'space-between',
    // marginVertical: moderateScale(1100),
    // marginHorizontal: 18,
  },
  buttomView: {
    flex: 0,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: moderateScale(100),
    height: moderateScale(100),
  },
});

export default Menu;
