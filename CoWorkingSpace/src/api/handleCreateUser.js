import {useState, useContext} from 'react';
import qs from 'qs';
import axios from 'axios';
import {API} from './config';
import AsyncStorage from '@react-native-community/async-storage';
import {Context as AuthContext} from '../controllers/AuthController';
import * as RootNavigation from '../../RootNavigation';
import {Alert} from 'react-native';
import {ModalContext} from '../controllers/ModalController';
import handleTokenCredentials from './handleTokenCredentials';

export default () => {
  const {state} = useContext(AuthContext);
  const {modalState, toggleModal, toggleLoading} = useContext(ModalContext);
  const [createTokenCredentials] = handleTokenCredentials();

  async function createUser(body) {
    toggleLoading(true)
    const tokenReg = await createTokenCredentials();

    if (tokenReg) {
        let axiosConfig = {
            headers: {
                Authorization: tokenReg.token_type + ' ' + tokenReg.access_token,
                'content-type': 'application/json',
            },
        }


        await axios
        .post(API.API_CREATE_USER, body, axiosConfig)
        .then(async (res) => {
            console.log('✅ SUCCESS_CREATE_USER', res);
            // TODO: Create function for auto login or Show modal 'Success!!'
            // const userToken = JSON.stringify(res.data);
            // console.log(userToken);
            const { data, status } = res;

            toggleLoading(false)
            toggleModal('Success!', 'Create user success');
            RootNavigation.navigate('SearchScreen');
        })
        .catch((err) => {
            const {status, data} = err.response;
            // console.log('❌ ERROR_CATCH : ', err.response);
            // TODO: Create catch function follow status code
            // console.log('❌ Login Error Status !!', status);
            console.log('❌ ERR_CREATE_USER : ', data);

            var error;
            if (data.errors.CREATE_RESULT != null) {
                error = data.errors.CREATE_RESULT.map(
                    value => `- ${value}\n`,
                );
            } else if (data.errors.MODEL_VALIDATION != null) {
                error = data.errors.MODEL_VALIDATION.map(
                    value => `- ${value}\n`,
                );
            } else {
                error = data.errors;
            }

            if (status == 400) {
                toggleLoading(false)
                toggleModal('Error Create User', error);
            } else {
                toggleLoading(false)
                toggleModal('Error Create User', 'Something');
            }
            

            // Alert.alert(err.response.data.error)
            // RootNavigation.navigate('SearchScreen');
            
        });
    } else {
        toggleLoading(false)
        alert('Error : Token register null');
    }

  }

  return [createUser];
};
