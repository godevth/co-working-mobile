import {useState, useContext} from 'react';
import qs from 'qs';
import axios from 'axios';
import {API} from './config';
import AsyncStorage from '@react-native-community/async-storage';
import { Context as AuthContext } from '../controllers/AuthController';
import * as RootNavigation from '../../RootNavigation';
import { Alert } from 'react-native';
import { ModalContext } from '../controllers/ModalController';

export default () => {

  const [ percentage, setPercentage ] = useState(0);
  const { state } = useContext(AuthContext);
  const {modalState, toggleModal} = useContext(ModalContext);

  let progress = 0;
  
  // กำหนดเวลาหมดอายุ Token ใหม่
  let now = new Date();
  let expireTime = new Date(now);
  
  async function login(username, password) {

    var body = qs.stringify({
      client_id: API.CLIENT_ID,
      client_secret: API.CLIENT_SECRET,
      scope: API.SCOPE,
      grant_type: API.GRANT_TYPE_PASSWORD,
      username: username,
      password: password,
    });

    await axios
      .post(API.API_CREATE_TOKEN, body, {
        onDownloadProgress(progressEvent) {
          progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          );
          setPercentage(progress);
          console.log('Progress ----------> ', percentage);
        },
      })
      .then( async (res) => {
        console.log('✅ SUCCESS_CREATE_TOKEN !!');

        var userExpireTime = expireTime.setSeconds(
          now.getSeconds() + res.data.expires_in,
        );
        const userToken = JSON.stringify(res.data);
        console.log(userToken);
        // console.log(USER_TOKEN, userToken);
        // console.log(USER_EXPIRY, userExpireTime);

        // Savr User To AsyncStorage!!
        await AsyncStorage.setItem( API.AS_USER_TOKEN, userToken )
        await AsyncStorage.setItem( API.AS_USER_EXPIRY, userExpireTime.toString() )
        RootNavigation.navigate('SearchScreen');
      })
      .catch((err) => {
        const { status, data } = err.response;
        // TODO: Create catch function follow status code
        console.log('❌ Login Error Status !!', status);
        console.log('❌ Login Error Data !!', data);
        // Alert.alert(err.response.data.error)
        // RootNavigation.navigate('SignUp');
        toggleModal('Error SignIn', data.error);

      });

    // RootNavigation.navigate('SearchScreen')
  }

  return [login];
}