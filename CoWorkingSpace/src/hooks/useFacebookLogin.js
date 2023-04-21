import {useState, useContext} from 'react';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { API } from '../api/config';
import AsyncStorage from '@react-native-community/async-storage';
import {Context as AuthContext} from '../controllers/AuthController';
import * as RootNavigation from '../../RootNavigation';
import handleSocialLogin from '../api/handleSocialLogin';

export default () => {
  
  const {state} = useContext(AuthContext);
  const [errorSignInFB, setError] = useState(null);
  const [socialLogin] = handleSocialLogin();

  const signinFacebook = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(async (res) => {
            if (res) {
              console.log(res);
              const {accessToken, userID} = res;
              const userToken = JSON.stringify(res);

              console.log('User ID : ', userID);
              console.log('Access Token : ', accessToken);

              // const PROFILE_REQUEST_PARAMS = {
              //   fields: { string: 'email, id, name, first_name, last_name' },
              // };
              // const profileRequest = new GraphRequest(
              //   '/me',
              //   {res, parameters: PROFILE_REQUEST_PARAMS},
              //   (error, result) => {
              //     if (error) {
              //       console.log('login info has error: ' + error);
              //     } else {
              //       // firstnameSocial = result.first_name;
              //       // lastnameSocial = result.last_name;
              //       // emailSocial = result.email;
        
              //       console.log('result:', result);
              //     }
              //   },
              // );
              // new GraphRequestManager().addRequest(profileRequest).start();

              socialLogin(API.FACEBOOK, userID, res);
              
              // await AsyncStorage.setItem( API.AS_USER_TOKEN, userToken )
              // const accessToken = data.accessToken.toString();
              // RootNavigation.navigate('SearchScreen');
            }
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
        setError(error);
      },
    );
  };

  return [signinFacebook, errorSignInFB];
};
