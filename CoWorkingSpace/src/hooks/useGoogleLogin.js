import {useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { API } from '../api/config';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../../RootNavigation';
import handleSocialLogin from '../api/handleSocialLogin';

export default () => {

  const [errorGoogle, setErrorGoogle] = useState(null);
  const [socialLogin] = handleSocialLogin();

  async function signinGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      // const {accessToken, idToken} = await GoogleSignin.signIn();
      // console.log('User ID : ', idToken);
      // console.log('Access Token : ', accessToken);
      const response = await GoogleSignin.signIn();
      // console.log('User Google : ', response);
      socialLogin(API.GOOGLE, response.user.id, response);
      // const userToken = JSON.stringify(response);
      // console.log('USER_TOKEN : ', userToken)
      // await AsyncStorage.setItem( API.AS_USER_TOKEN, userToken );
      // RootNavigation.navigate('SearchScreen');
    } catch (error) {
      setErrorGoogle(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('Google Signin Error Something ...', error);
      }
    }
  }

  return [signinGoogle, errorGoogle];
};