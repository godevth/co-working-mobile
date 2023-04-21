import React, {useState, useContext} from 'react';
import appleAuth, {} from '@invertase/react-native-apple-authentication';
import { API } from '../api/config';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../../RootNavigation';
import handleSocialLogin from '../api/handleSocialLogin';

var jwtDecode = require('jwt-decode');

export default () => {

    const [errorApple, setErrorApple] = useState(null);
    const [socialLogin] = handleSocialLogin();

    async function signinGoogle() {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
    
        console.log('Response apple auth ==> ', appleAuthRequestResponse)
    
        try {
    
          // get current authentication state for user
          // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
          const credentialState = await appleAuth.getCredentialStateForUser(
            appleAuthRequestResponse.user,
          );
    
          console.log('Credential State ==> ', credentialState)
    
          // use credentialState response to ensure the user is authenticated
          if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
            console.log('Apple auth is: True');

            // const userToken = JSON.stringify(appleAuthRequestResponse);
            const decodeToken = jwtDecode(appleAuthRequestResponse.identityToken);
            console.log('Decode Token : ', decodeToken);
            // await AsyncStorage.setItem( API.AS_USER_TOKEN, userToken );
            // RootNavigation.navigate('SearchScreen');
            socialLogin(API.APPLE, decodeToken.sub, decodeToken);
            // console.log('Success !!!')
          }
        } catch (error) {
          console.log(error.code)
          console.log('Error Apple : ', error)
          if (error.code === appleAuth.Error.CANCELED) {
            setErrorApple('Cancel Apple Signin');
          }
          if (error.code === appleAuth.Error.FAILED) {
            setErrorApple('Apple Signin Failed');
          }
          if (error.code === appleAuth.Error.INVALID_RESPONSE) {
            setErrorApple('Apple Signin Invalid Response');
          }
          if (error.code === appleAuth.Error.NOT_HANDLED) {
            setErrorApple('Apple Signin Not Handled');
          }
          if (error.code === appleAuth.Error.UNKNOWN) {
            setErrorApple('Apple Signin ... !!');
          }
        }
      }

    return [signinGoogle, errorApple];
}