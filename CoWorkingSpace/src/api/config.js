const DEVERLOPMENT_URL = 'https://cow-dev.sbpds.co.th/';

export const API = {
    API_CREATE_TOKEN: DEVERLOPMENT_URL + 'connect/token',

    API_CREATE_USER: DEVERLOPMENT_URL + 'Mobile/Api/User/Create',

    API_FORGOT_PASSWORD: DEVERLOPMENT_URL + 'Mobile/Api/User/ForgotPassword',

    API_GET_USER_DATA: DEVERLOPMENT_URL + 'Mobile/Api/User/Get',

    API_UPDATE_USER_DATA: DEVERLOPMENT_URL + 'Mobile/Api/User/Edit',

    // Body Constant
    CLIENT_ID: 'coworking.mobile',
    CLIENT_SECRET: '$BPCoWorkingM0bile',
    GRANT_TYPE_REFRESH_TOKEN: 'refresh_token',
    GRANT_TYPE_PASSWORD: 'password',
    GRANT_TYPE_CREDENTIALS: 'client_credentials',
    SCOPE: 'openid profile corecms corecms.mobile offline_access',
    SCOPE_CREENTIAL: 'corecms corecms.mobile',

    // AsyncStorage Constant
    AS_USER_TOKEN: 'userToken',
    AS_USER_EXPIRY: 'userExpiry',
    AS_USER_DATA: 'userData',
    AS_DEVICE_TOKEN: 'deviceToken',

    // Create Token
    USERNAME_FOR_TOKEN: 'administrator',
    PASSWORD_FOR_TOKEN: 'asdf+1234',

    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    APPLE: 'apple'
}