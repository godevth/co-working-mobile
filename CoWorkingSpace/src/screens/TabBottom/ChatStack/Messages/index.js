import React, { useEffect, useState, useCallback } from 'react';
import {View, StyleSheet} from 'react-native';
import {Styles} from '../../../../styles/styles';
import {ChatHistory} from '../../../../components';
import { Res } from '../../../../constants/env';
import { GiftedChat, Bubble, InputToolbar, Composer, Send } from 'react-native-gifted-chat';
import { LocationView } from '../../../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Messages = (props) => {
  const {navigation} = props;
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    setMessage([
      {
        _id: 1,
        text: 'Hello React Native',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Sam Thor',
          avatar: Res.Images.Profile,
        }
      },
      {
        _id: 2,
        text: 'Hello React Native',
        createdAt: new Date(),
        // location: {
        //   latitude: 37.78825,
        //   longitude: -1222.4324,
        // },
        user: {
          _id: 1,
          name: 'Sam Thor',
          avatar: Res.Images.Profile,
        }
      },
      {
        _id: 3,
        text: '555',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'Ton',
          avatar: Res.Images.Profile,
        }
      },
      {
        _id: 4,
        text: '555',
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'Ton',
          avatar: Res.Images.Profile,
        }
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessage((previousMessages) => 
      GiftedChat.append(previousMessages, messages)
    )
  }, []);

  const _renderBubble = (props) => {
    const { currentMessage } = props;
    if(currentMessage.location) {
      return <LocationView location={currentMessage.location}/>
    }

    return (
      <Bubble 
        {...props}
      />
    )
  }

  const _renderInputToolbar = (props) => {
    const inputHeight = 45;
    console.log('renderInputToolbar', props.composerHeight)
    return <InputToolbar 
      {...props} 
      containerStyle={{
        // backgroundColor: Res.Colors.Available,
        // height: inputHeight,
        paddingTop: 0,
        paddingBottom: 6,
        // paddingRight: 6, //
        borderTopColor: Res.Colors.Placeholder,
      }}
      />;
  }

  const _renderComposer = (props) => {
    const inputHeight = 45;
    console.log('renderComposer', props.composerHeight)
    return (
        <Composer
          {...props}
          // onInputSizeChanged={(ev) => this.calculateInputHeight(ev)}
          // style={{justifyContent: 'center', height: inputHeight}}
          textInputStyle={{ 
            justifyContent: 'center', 
            alignItems: 'center', 
            borderWidth: 1,
            height: inputHeight,
            borderColor: Res.Colors.Placeholder,
            marginRight: 10,
            paddingHorizontal: 10,
            borderRadius: 7,
          }}
        />
    );
  }

  const _renderSend = (props) => {
    return (
      <Send {...props}
        containerStyle={{justifyContent: 'center',}}>
        <View style={styles.sendingContainer}>
          <MaterialCommunityIcons name='send-circle' size={30} color={Res.Colors.BlueLine} />
        </View>
      </Send>
    );
  }

  return (
    <GiftedChat 
      renderBubble={_renderBubble}
      renderInputToolbar={(props) => _renderInputToolbar(props)}
      renderComposer={(props) => _renderComposer(props)}
      renderSend={(props) => _renderSend(props)}
      placeholder='Type message here...'
      alwaysShowSend
      messages={messages}
      onSend={(messages) => onSend(messages)}
      // showUserAvatar
      // renderAvatar={() => null}
      user={{_id: 1, name: 'Ton E'}}
      keyboardShouldPersistTaps={'never'}
      bottomOffset={22}
      minComposerHeight={28}
      maxComposerHeight={106}
      minInputToolbarHeight={50}
      />
  );
};

const styles = StyleSheet.create({
  sendingContainer: {
    // borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Messages;
