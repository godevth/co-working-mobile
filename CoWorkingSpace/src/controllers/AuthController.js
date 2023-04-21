import React, {useReducer, useMemo, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import { API } from '../api/config';
import { Alert } from 'react-native';
import handleRefreshToken from '../api/handleRefreshToken';

var jwtDecode = require('jwt-decode');

const initialState = {
  loggedIn: false,
  user: {},
  userData: {
    // firstname: '', 
    // lastname: '', 
    // address: 'SBP Digital Services', 
    // region: 'TH',
    // phoneCode: '+66',
    // gender: 'F',
    // phone: '', 
    // email: 'johndoe@mail.com', 
    // birthDate: new Date(),
    // password: '12345678', 
    // cardName: 'John Doe',
    // cardNumber: '2345 7632 4570 8532',
    // cardPostal: '10700',
    // expiryDate: '12/20',
    // CVV: '567'
  }
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "GET_AUTHEN":
      return { ...state, loggedIn: true, user: action.payload }
    case 'SIGN_OUT':
      return { ...state, loggedIn: false, user: {}}
    case 'GET_DATA':
      return { ...state, userData: action.payload }
    default:
      return state;
  }
}

const getAuth = (dispatch) => {
  return async (callback) => {
    // Example ==> response = [{}, {}, {}]
    const userToken = await AsyncStorage.getItem( API.AS_USER_TOKEN );
    const userData = await AsyncStorage.getItem( API.AS_USER_DATA );
    var expireDate = parseInt(await AsyncStorage.getItem( API.AS_USER_EXPIRY ));
    var currentTime = Date.now();

    if (userToken) {
      console.log('⏰ Current Time : ', currentTime);
      console.log('⏰ Expires Time : ', expireDate);

      const responseJson = JSON.parse(userToken);
      const responseDecode = jwtDecode(responseJson.access_token);
      console.log('✅ Decode JWT : ', responseDecode.email);

      if (currentTime <= expireDate) {
        console.log('👍 TOKEN_NOT_EXPIRE (No refresh token)')
        // dispatch({ type: 'GET_AUTHEN', payload: JSON.parse(userToken) });
        dispatch({ type: 'GET_AUTHEN', payload: responseDecode });

      } else {
        // ! Can't use hook function.
        // TODO: Import function refresh token.
        console.log('👎 TOKEN_EXPIRE (Need to refresh token)')
        if (callback) {
          callback();
        }
      }
    } else {
      console.log('NO_AUTH_IN_ASYNCSTORAGE')
    } 

    // if (userToken) {
    //   console.log('SET_AUTH_STATE')
    //   // dispatch({ type: 'GET_AUTHEN', payload: JSON.parse(response) });
    //   dispatch({ type: 'GET_AUTHEN', payload: responseDecode.email });
    // } else {
    //   console.log('NO_AUTH_IN_ASYNCSTORAGE')
    // } 
  }
}

const getData = (dispatch) => {
  return async () => {
    const userData = await AsyncStorage.getItem( API.AS_USER_DATA );
    const responseJson = JSON.parse(userData);
    if (userData) {
      console.log('✅ SET_USER_DATA', userData)
      dispatch({ type: 'GET_DATA', payload: responseJson})
    } else {
      console.log('❌ NO_AUTH_DATA_IN_ASYNCSTORAGE')
    }
  }
}

const SignOut = (dispatch) => {
  return async () => {
    try {
      await AsyncStorage.removeItem( API.AS_USER_TOKEN );
      await AsyncStorage.removeItem( API.AS_USER_EXPIRY );
      await AsyncStorage.removeItem( API.AS_USER_DATA );
      return dispatch({ type: 'SIGN_OUT' })
    } catch {
      Alert.alert('Error Sign Out')
    }
  }
}

export const { Context, Provider } = createDataContext(
  AuthReducer,
  { getAuth, SignOut, getData },
  initialState
);