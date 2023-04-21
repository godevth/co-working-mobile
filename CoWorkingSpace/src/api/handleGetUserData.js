import React, {useContext, useState} from 'react';
import axios from 'axios';
import {API} from './config';
import AsyncStorage from '@react-native-community/async-storage';
import { ModalContext } from '../controllers/ModalController';
import handleRefreshToken from '../api/handleRefreshToken';
import {Context as AuthContext} from '../controllers/AuthController';

export default () => {
    const [userLoading, setUserLoading] = useState(false)
    const {modalState, toggleModal} = useContext(ModalContext);
    const {state, getAuth, getData} = useContext(AuthContext);
    const [refreshToken] = handleRefreshToken();

    // GET USER DATA
    async function getUserData() {
        setUserLoading(true)

        // Refresh Token
        await refreshToken().then( async () => {
            const userToken = await AsyncStorage.getItem(API.AS_USER_TOKEN)
            const tokenReg = JSON.parse(userToken)
            let axiosConfig = {
                headers: {
                    Authorization: tokenReg.token_type + ' ' + tokenReg.access_token,
                    'content-type': 'application/json',
                },
            }
    
            await axios
            .get(API.API_GET_USER_DATA, axiosConfig)
            .then(async (res) => {
                console.log('Success !!', res.data);
                // TODO: Create function save user data to AsyncStoage.
                const userData = JSON.stringify(res.data);
                try {
                    await AsyncStorage.setItem(API.AS_USER_DATA, userData);
                    console.log('✅ SAVE_USER_SUCCESS'); 
                    await getData();
                    setUserLoading(false)
                } catch(err) {
                    console.log('❌ ERR_SAVE_USER_ASYNCSTOAGE : ', err);
                    setUserLoading(false)
                }
    
            })
            .catch((err) => {
                const { status, data } = err.response;
                // if ( status == 401 ) {
                //     getAuth(() => refreshToken())
                // }
                setUserLoading(false)
                console.log('❌ ERROR_GET_USER_DATA : ', err.response);
                toggleModal('Error Get User', status);
            })
        })

        
    }

    // UPDATE USER DATA
    async function updateUserData(body) {
        console.log('BODY : ', body)
        // setUserLoading(true)

        const userToken = await AsyncStorage.getItem(API.AS_USER_TOKEN)
        const tokenReg = JSON.parse(userToken)
        let axiosConfig = {
            headers: {
                Authorization: tokenReg.token_type + ' ' + tokenReg.access_token,
                'content-type': 'application/json',
            },
        }

        await axios
        .put(API.API_UPDATE_USER_DATA, body, axiosConfig)
        .then(async (res) => {
            console.log('✅ SUCCESS_UPDATE_USER_DATA : ', res);
            const { data, status } = res;
            await getUserData()
            toggleModal('Success!', data.message);
            setUserLoading(false)
        })
        .catch((err) => {
            console('ERROR : ', err)
            setUserLoading(false)
            console.log('❌ ERROR_GET_USER_DATA : ', err.response);
            const { status, data } = err.response;
            toggleModal('Error Get User', data.message);
        })
    }

    return [getUserData, updateUserData, userLoading]
}