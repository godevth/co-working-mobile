import {useState, useContext} from 'react';
import qs from 'qs';
import axios from 'axios';
import {API} from './config';
import AsyncStorage from '@react-native-community/async-storage';
import {Context as AuthContext} from '../controllers/AuthController';
import * as RootNavigation from '../../RootNavigation';

export default () => {
  const {state, getAuth} = useContext(AuthContext);

  async function refreshToken() {
    const userToken = await AsyncStorage.getItem(API.AS_USER_TOKEN);
    const jsonToken = JSON.parse(userToken);
    console.log('User Token : ', jsonToken.refresh_token);

    var expireTime = await AsyncStorage.getItem(API.AS_USER_EXPIRY);
    var currentTime = Date.now();

    console.log(
      'refreshTokenExpireDate : ' + '\n' + 'currentTime : ',
      currentTime + '\n' + 'expireTime : ',
      expireTime,
    );

    var body = qs.stringify({
      client_id: API.CLIENT_ID,
      client_secret: API.CLIENT_SECRET,
      scope: API.SCOPE,
      grant_type: API.GRANT_TYPE_REFRESH_TOKEN,
      refresh_token: jsonToken.refresh_token,
    });

    // console.log('Body : ', body);

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    await axios
      .post(API.API_CREATE_TOKEN, body, axiosConfig)
      .then(async (res) => {
        // console.log('Response Status : ', res.status);

        // กำหนดเวลาหมดอายุ Token ใหม่
        let now = new Date();
        let expireTime = new Date(now);
        console.log('User Expire : ', res.data.expires_in);

        var newUserExpireTime = expireTime.setSeconds(
          now.getSeconds() + res.data.expires_in,
        );

        console.log('User Expire in : ', newUserExpireTime);

        const newUserToken = JSON.stringify(res.data);
        console.log('User Data : ', newUserToken);

        await AsyncStorage.setItem(API.AS_USER_TOKEN, newUserToken);
        await AsyncStorage.setItem(
          API.AS_USER_EXPIRY,
          newUserExpireTime.toString(),
        );

        getAuth();
        console.log('👌 Set new AsyncStorage "Success" !! & Restart loading user');
      })
      .catch((err) => {
        console.log('Error : ', err);
      });
  }

  return [refreshToken];
};
