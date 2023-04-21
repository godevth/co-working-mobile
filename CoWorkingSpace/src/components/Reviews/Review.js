import React from 'react';
import {View, Text} from 'react-native';
import {Avatar, Rating, Divider} from 'react-native-elements';
import {Styles} from '../../styles/styles';
import { Res } from '../../constants/env';

const MemoReview = ({item}) => {
    console.log(item)
    return (
      <>
        <Divider style={[Styles.devider, {marginTop: 20}]} />
        <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
          <Avatar 
            size="medium"
            rounded
            title="MT"
            source={Res.Images.Profile}
            containerStyle={{marginRight: 15}}
          />
          <View>
            <Text>{item.auth}</Text>
            <Rating imageSize={10} readonly startingValue={item.rating} ratingColor={Res.Colors.Black} style={{alignItems: 'flex-start', width: 150, marginVertical: 5}}/>
            <Text style={{fontWeight: 'bold'}}>{item.detail}</Text>
          </View>
        </View>
      </>
    )
}
const Review = React.memo(MemoReview);
export default Review;