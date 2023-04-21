import React, {useState, useContext} from 'react';
import qs from 'qs';
import axios from 'axios';
import {API} from './config';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../../RootNavigation';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {HashKey} from '../utils/HashKey';
import { Alert } from 'react-native';
import { ModalContext } from '../controllers/ModalController';

export default () => {

  const [errorSocial, setErrorSocial] = useState(null);
  const {modalState, toggleModal, toggleLoading} = useContext(ModalContext);

  // กำหนดเวลาหมดอายุ Token ใหม่
  let now = new Date();
  let expireTime = new Date(now);

  function LOG(value) {
    console.log('SOCIAL_NAME : ', value);
  }

  async function socialLogin(social, userID, data) {
    toggleLoading(true)
    console.log('SOCIAL_ID : ', userID);
    const SOCIAL_DATA = data;
    let emailSocial;
    let firstnameSocial;
    let lastnameSocial;
    // let imageSocial;
    // let ContentTypeSocial;

    const getInfoFacebook = async (social_data) => {
      const PROFILE_REQUEST_PARAMS = {
        fields: { string: 'email, id, name, first_name, last_name' },
      };
      const profileRequest = new GraphRequest(
        '/me',
        {social_data, parameters: PROFILE_REQUEST_PARAMS},
        (error, result) => {
          if (error) {
            console.log('login info has error: ' + error);
          } else {
            firstnameSocial = result.first_name,
            lastnameSocial = result.last_name,
            emailSocial = result.email,

            console.log('result:', result);
          }
        },
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    } 

    if (social === API.APPLE) {
      LOG('⬛ ' + social);
      if (SOCIAL_DATA.is_private_email) {
        console.log('✘ : Apple Login no email')
        emailSocial = null;
        firstnameSocial = null;
        lastnameSocial = null;
      } else {
        console.log('✔ : Apple Login have email')
        emailSocial = SOCIAL_DATA.email;
        firstnameSocial = null;
        lastnameSocial = null;
      }
    } else if (social === API.FACEBOOK) {
      LOG('🟦 ' + social);
      getInfoFacebook(SOCIAL_DATA)
      // console.log('WAIT !!!', gen)
    } else if (social === API.GOOGLE) {
      LOG('🟥 ' + social);
      emailSocial = SOCIAL_DATA.user.email;
      firstnameSocial = SOCIAL_DATA.user.givenName;
      lastnameSocial = SOCIAL_DATA.user.familyName;
    } else {
      LOG('Unknow Social login type !!');
    }

    const passwordHash = await HashKey(social + '.' + userID, 'C0R0N@V1RU$');
    console.log('HASH_KEY : ', passwordHash);

    setTimeout(async () => {
      var body_ = {
        username: userID,
        password: passwordHash,
        client_id: API.CLIENT_ID,
        client_secret: API.CLIENT_SECRET,
        scope: API.SCOPE,
        grant_type: API.GRANT_TYPE_PASSWORD,
        provider: social,
        email: emailSocial,
        firstname: firstnameSocial,
        lastname: lastnameSocial,
      }
      var body = qs.stringify({
        username: userID,
        password: passwordHash,
        client_id: API.CLIENT_ID,
        client_secret: API.CLIENT_SECRET,
        scope: API.SCOPE,
        grant_type: API.GRANT_TYPE_PASSWORD,
        provider: social,
        email: emailSocial,
        firstname: firstnameSocial,
        lastname: lastnameSocial,
      });

      console.log('BODY : ', body_)

      await axios
        .post(API.API_CREATE_TOKEN, body)
        .then(async (res) => {
          console.log('😂 Success!');
          console.log('RESPONSE : ', res.data);

          var userExpireTime = expireTime.setSeconds(
              now.getSeconds() + res.data.expires_in,
          );
          console.log('⏰ EXPIRY_TIME : ', userExpireTime);
      
          // Success from response and save date to AsyncStorage.
          const userToken = JSON.stringify(res.data);
          await AsyncStorage.setItem(API.AS_USER_TOKEN, userToken);
          await AsyncStorage.setItem(API.AS_USER_EXPIRY, userExpireTime.toString());
          toggleLoading(false)
          RootNavigation.navigate('SearchScreen');
          // RootNavigation.navigate('Register', { social_token: SOCIAL_DATA, social_type: social });

        })
        .catch((err) => {
          const { status, data } = err.response;
          console.log('ERROR : ', err.response)
          // TODO: Create catch function follow status code
          console.log('!!! Social Login Status : ', status);
          console.log('!!! Social Login Data : ', data);
          // Alert.alert(err.response.data.error)
          // if (status != 500) {
          //   RootNavigation.navigate('Register', { social_token: SOCIAL_DATA, social_type: social });
          // }
          toggleLoading(false)
          toggleModal(status, data.error);

        });
      toggleLoading(false)
    }, 1500)
    
  }

  return [socialLogin];
};