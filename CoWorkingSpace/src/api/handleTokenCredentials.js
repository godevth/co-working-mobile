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

  const { state } = useContext(AuthContext);
  const {modalState, toggleModal} = useContext(ModalContext);
  
  var responseJson = null;
  
  async function createTokenCredentials() {

    var body = qs.stringify({
      client_id: API.CLIENT_ID,
      client_secret: API.CLIENT_SECRET,
      grant_type: API.GRANT_TYPE_CREDENTIALS,
      scope: API.SCOPE_CREENTIAL,
    });

    // console.log('BODY : ', body)

    await axios
      .post(API.API_CREATE_TOKEN, body)
      .then( async (res) => {
        console.log('✅ RESPONSE_CREDENTIALS_TOKEN !!');
        const { access_token, token_type } = res.data;
        // const userToken = JSON.stringify(res.data);
        // console.log('ACCESS_TOKEN : ', access_token);
        // console.log('TOKEN_TYPE : ', token_type);

        responseJson = {access_token, token_type};
      })
      .catch((err) => {
        const { status, data } = err.response;
        // TODO: Create catch function follow status code
        console.log('❌ Login Error Status !!', status);
        console.log('❌ Login Error Data !!', data);
        // Alert.alert(err.response.data.error)
        // RootNavigation.navigate('SignUp');
        // toggleModal('Token For Register', data.error);
        responseJson = null;
      });

    return responseJson

    // RootNavigation.navigate('SearchScreen')
  }

  return [createTokenCredentials];
}