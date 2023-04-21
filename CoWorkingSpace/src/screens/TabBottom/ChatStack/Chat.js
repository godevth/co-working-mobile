import React, { useEffect, useState, useCallback } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Styles} from '../../../styles/styles';
import {ChatHistory} from '../../../components';


const Chat = (props) => {
  const {navigation} = props;
  return (
    <View style={[Styles.container]}>
      <ScrollView>
        <ChatHistory navigation={navigation}/>
        <ChatHistory navigation={navigation}/>
        <ChatHistory navigation={navigation}/>
        <ChatHistory navigation={navigation}/>
      </ScrollView>
    </View>
  );
};

export default Chat;
