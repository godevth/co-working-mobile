import React from 'react';
// Header
import Noti from './notification/noti.svg';
// Booking
import CheckIn from './booking/check-in.svg';
import CheckOut from './booking/check-out.svg';
import Qr from './menu/qr-code.svg';
// Tabbar
import TBHome from './tabbar/home.svg';
import TBHistory from './tabbar/history.svg';
// Modal
import Success from './modal/success.svg';
// Login
import Apple from './social-login/Apple.svg';
import Facebook from './social-login/Facebook.svg';
import Google from './social-login/Google.svg';
// Search
import List from './search/list.svg';

const W = 18;
const H = 18;

const SVG_Noti = () => <Noti width={40} height={40}/>
const SVG_CheckIn = () => <CheckIn width={40} height={40}/>
const SVG_CheckOut = () => <CheckOut width={40} height={40}/>
const SVG_QrCode = () => <Qr width={40} height={40}/>
const SVG_TBHome = () => <TBHome width={25} height={25}/>
const SVG_TBHistory = () => <TBHistory width={25} height={25}/>
const SVG_Success = () => <Success width={25} height={25}/>
const SVG_Apple = () => <Apple width={W} height={H}/>
const SVG_Facebook = () => <Facebook width={W} height={H}/>
const SVG_Google = () => <Google width={W} height={H}/>
const SVG_List = () => <List width={W} height={H}/>

export {
    SVG_Noti,
    SVG_CheckIn,
    SVG_CheckOut,
    SVG_QrCode,
    SVG_TBHome,
    SVG_TBHistory,
    SVG_Success,
    SVG_Apple,
    SVG_Facebook,
    SVG_Google,
    SVG_List,
}