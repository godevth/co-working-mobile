import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Image} from 'react-native-elements';
import {Styles} from '../styles/styles';
import {Res} from '../constants/env';
import {DEVICE_WIDTH} from '../constants/scale';

const Notification = () => {
  const _renderNotification = () => {
    const MockUp = [
      {
        id: 1,
        title: 'Best Deal!',
        detail: 'Up to 20% Discount',
        time: '20/07/2020 09:00',
        image: Res.Images.BackgroundTest,
        ads: true
      },
      {
        id: 2,
        title: 'Sun Tower',
        detail: 'Hottest Deal of the Year!',
        time: '20/07/2020 09:00',
        image: '',
        ads: false
      },
      {
        id: 2,
        title: 'Sun Tower',
        detail: 'Hottest Deal of the Year!',
        time: '20/07/2020 09:00',
        image: '',
        ads: false
      },
    ];
    const _renderItem = ({item, index}) => (
      <View
        style={[Styles.notification, Styles.shadows, {backgroundColor: item.ads ? Res.Colors.BlueLine : Res.Colors.White, marginTop: 18}]}
        key={item.id}>
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 12}}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{color: item.ads ? Res.Colors.White : Res.Colors.Black}}>
              {item.title}
        </Text>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{marginBottom: 10, color: item.ads ? Res.Colors.White : Res.Colors.Black}}>
              {item.detail}
        </Text>
          <Text style={{fontSize: Res.Sizes.Tiny, color: item.ads ? Res.Colors.White : Res.Colors.Black}}>{item.time}</Text>
        </View>
        { item.image ? 
            <View style={{height: 80, width: 80}}>
                <Image
                source={item.image}
                resizeMode="center"
                style={{height: 80, width: 80, resizeMode: 'cover', borderTopRightRadius: 7, borderBottomRightRadius: 7}}
                />
            </View>
            :
            <View style={{height: 80, width: 80}}/>
        }
      </View>
    );
    return (
      <FlatList
        data={MockUp}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  return (
    <View style={[Styles.container, {maxWidth: 600}]}>
      {_renderNotification()}
    </View>
  );
};

export default Notification;
