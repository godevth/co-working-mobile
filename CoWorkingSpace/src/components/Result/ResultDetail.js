import React from 'react';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Image} from 'react-native-elements';
import {Res} from '../../constants/env';
import Ribbon from '../Ribbon';
import Text from '../Text';
import { DEVICE_WIDTH, DEVICE_HEIGHT, moderateScale } from '../../constants/scale';
import { Styles } from '../../styles/styles';

const MemoResultDetail = (props) => {
    const {result, index, horizontal} = props;
    // console.log(index)
    // var destinationStyle = {};

    if (index == 0) {
      destinationStyle = { marginLeft: 18 };
    } else {
      destinationStyle = { marginLeft: horizontal ? 0 : 18 };
    }

    return (
      <View style={[styles.container(horizontal), Styles.shadows, destinationStyle]}>
        <Ribbon value={'20'}/>
        <View style={{}}>
          <TouchableNativeFeedback onPress={() => console.log('Click Favorites')}>
            <View style={[styles.options ,styles.favorites]}><Image source={Res.Images.Heart} style={styles.icon}/></View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => console.log('Click Messages')}>
            <View style={[styles.options ,styles.messages]}><Image source={Res.Images.Message} style={styles.icon}/></View>
          </TouchableNativeFeedback>
          <Image source={{uri: result.image_url}} style={styles.image(horizontal)} />
        </View>
        <View style={styles.textContainer(horizontal)}>
          <Text style={styles.name}>{result.name}</Text>
          {/* <Text style={styles.detail}>
            {result.rating} Star, {result.review_count} Review
          </Text> */}
          <Text style={styles.detail}>Starting Price ฿6,000.00/mo</Text>

          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text size={Res.Sizes.Subhead}>Event Space</Text>
            </View>
            <View style={styles.tag}>
              <Text size={Res.Sizes.Subhead}>Wellness Room</Text>
            </View>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: horizontal => ({
    // maxWidth: 400,
    // marginLeft: horizontal ? 0 : 18,
    // marginLeft: 18,
    // marginRight: horizontal ? 0 : 18,
    marginRight: 18,
    marginBottom: horizontal ? 0 : 20,
  }),
  image: horizontal => ({
    width: horizontal ? DEVICE_WIDTH - 50 : '100%',
    // maxWidth: 364,
    height: DEVICE_HEIGHT / 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }),
  textContainer: horizontal => ({
    width: horizontal ? DEVICE_WIDTH - 50 : '100%',
    backgroundColor: Res.Colors.White,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
  }),
  name: {
    fontSize: Res.Sizes.Header,
    // fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: Res.Sizes.Subhead,
    color: Res.Colors.Detail,
  },
  options: {
    width: 30,
    height: 30,
    backgroundColor: Res.Colors.Black,
    position: 'absolute',
    zIndex: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favorites: {
    top: '5%',
    right: '5%',
  },
  messages: {
    bottom: '5%',
    right: '5%',
  },
  icon: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
  },
  tag: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    backgroundColor: Res.Colors.isSelect,
    borderRadius: 7,
    marginRight: moderateScale(5),
    marginTop: moderateScale(10),
  },
  tagContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

const ResultDetail = React.memo(MemoResultDetail)
export default ResultDetail;
