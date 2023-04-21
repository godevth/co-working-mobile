import React, { useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { API } from './config';
import {ModalContext} from '../controllers/ModalController';
import handleTokenCredentials from './handleTokenCredentials';

export default () => {
    const {modalState, toggleModal} = useContext(ModalContext);
    const [createTokenCredentials] = handleTokenCredentials()

    async function forgotPassword(body) {
        const tokenReg = await createTokenCredentials();
        // const deviceToken = await AsyncStorage(API.AS_DEVICE_TOKEN);
        const deviceToken = 'ios';

        let axiosConfig = {
            headers: {
                Authorization: tokenReg.token_type + ' ' + tokenReg.access_token,
                'content-type': 'application/json',
                'x-device': deviceToken,
            },
        }

        await axios
        .post(API.API_FORGOT_PASSWORD, body, axiosConfig)
        .then( async (res) => {
            const {status, data} = res;
            console.log('Success!', data);
            toggleModal('Success!', data.message)
        })
        .catch((err) => {
            const {status, data} = err.response;
            console.log('Error Reset Password', err.response);

            if (data.status == false) {
                toggleModal('Error Reset Password', data.message);
            } else {
                alert('Error Somthing')
            }
        })
    }

    return [forgotPassword]
}