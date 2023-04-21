import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import { Res } from '../../constants/env';
import { Styles } from '../../styles/styles';

const ChatHistory = ({navigation}) => {
  return (
    <>
      <TouchableOpacity
        style={[Styles.ChatContainer]}
        activeOpacity={.7}
        onPress={() => navigation.navigate('Messages')}>
        <View style={{}}>
            <Text style={[{fontSize: Res.Sizes.Header, fontWeight: 'bold', marginBottom: 5}]}>Name</Text>
            <Text style={[{fontSize: Res.Sizes.Body}]}>It’s 50,000 baht per month.</Text>
        </View>
        <View style={{width: 10, height: 10, backgroundColor: Res.Colors.Unread, borderRadius: 50}}/>
      </TouchableOpacity>
      <Divider style={[Styles.devider]} />
    </>
  );
};

export default ChatHistory;