import {Dimensions} from 'react-native';
import {moderateScale} from './scale';

const Res = {
  Fonts: {

  },
  Colors: {
    Black: '#000000',
    White: '#FFFFFF',
    Placeholder: '#C4C4C4',
    Gray: '#C4C4C4',
    Unread: '#408ABF',
    BT_Google: '#F44336',
    BT_Facebook: '#4267B2',
    BT_Apple: '#000000',
    BT_Sign_Up: '#408ABF',
    BT_Sign_In: '#024D82',
    BlueLine: '#024D82',
    Check_In: '#3BC946',
    Check_Out: '#F55353',
    Error: '#D60000',
    Detail: '#999999',
    Sender: '#007aff',
    Receiver: '#dddddd',
    Unavailable: '#F55353',
    Available: '#408ABF',
    isSelect: '#D0E4FF'
  },
  ColorsGradient: {
    whiteToBlack: ['#FFFFFFCC', '#FFFFFFCC', '#FFFFFF80', '#FFFFFF80', '#00000080', '#000000CC'],
    BlackToTransparent: ['#000', '#00000080', '#0000001A'],
    BlueToWhite: ['#D0E4FF', '#E6F8FF']
  },
  Sizes: {
    Huge: 30,
    Large_Title: 24,
    Title: 22,
    Header: 16,
    Body: 14,
    Subhead: 12,
    Footnote: 15,
    Caption_1: 14,
    Caption_2: 13,
    Label: 12,
    Tiny: 8,
  },
  Images: {
    QRcode: require('../assets/Icon/qr-code.png'),
    Bell: require('../assets/Icon/bell.png'),
    Locker: require('../assets/Icon/locker.png'),
    Monitor: require('../assets/Icon/monitor.png'),
    Light: require('../assets/Icon/light.png'),
    Mail: require('../assets/Icon/mail.png'),
    Request: require('../assets/Icon/request.png'),
    Contact: require('../assets/Icon/contact-us.png'),
    Arrow_Back: require('../assets/Icon/Header/back.png'),
    Back: require('../assets/Icon/Header/back-w.png'),
    Favorite: require('../assets/Icon/favorite.png'),
    Share: require('../assets/Icon/share.png'),
    Chat: require('../assets/Icon/chat-post.png'),
    Next: require('../assets/Icon/next.png'),
    MainLogo: require('../assets/Logo/main.png'),
    MainLogoBlack: require('../assets/Logo/main_black.png'),
    MainLogoWhite: require('../assets/Logo/main_white.png'),
    LocationMarker: require('../assets/Icon/pin.png'),
    Calendar: require('../assets/Icon/calendar-black.png'),
    People: require('../assets/Icon/people.png'),
    Profile: require('../assets/Profile/simple.jpg'),
    Filter_Black: require('../assets/Icon/Filter/filter_black.png'),
    Filter_White: require('../assets/Icon/Filter/filter_white.png'),
    Heart: require('../assets/Icon/heart.png'),
    Message: require('../assets/Icon/message.png'),
    Bus: require('../assets/Icon/bus.png'),

    // Header
    Noti_Black: require('../assets/Icon/Header/notification-black.png'),
    Noti_White: require('../assets/Icon/Header/notification-white.png'),
    Menu_Black: require('../assets/Icon/Header/menu-black.png'),
    Menu_White: require('../assets/Icon/Header/menu-white.png'),

    // Tabbar
    TB_Home_B: require('../assets/Icon/Tabbar/home.png'),
    TB_History_B: require('../assets/Icon/Tabbar/history.png'),
    TB_Ticket_B: require('../assets/Icon/Tabbar/ticket.png'),
    TB_Chat_B: require('../assets/Icon/Tabbar/chat.png'),
    TB_User_B: require('../assets/Icon/Tabbar/user.png'),

    // Flag
    Flag_TH: require('../assets/Flag/thailand.png'),
    Flag_US: require('../assets/Flag/united_states.png'),
    Flag_JP: require('../assets/Flag/japan.png'),
    Flag_CH: require('../assets/Flag/china.png'),

    // Modal
    Success: require('../assets/Icon/Modal/success.png'),

    // Calendar
    Calendar_Next: require('../assets/Icon/calendar/next.png'),
    Calendar_Previous: require('../assets/Icon/calendar/previous.png'),

    // Drawer
    Close: require('../assets/Icon/Header/close.png'),

    // Footer
    F_Facebook: require('../assets/Icon/Footer/icon_facebook.png'),
    F_Instagram: require('../assets/Icon/Footer/icon_instagram.png'),
    F_Linkedin: require('../assets/Icon/Footer/icon_linkedin.png'),
    F_Twitter: require('../assets/Icon/Footer/icon_twitter.png'),

    // Image Demo
    BackgroundTest: require('../assets/workingSpace.jpg'),
    BackgroundTest_2: require('../assets/workingSpace2.jpg'),
  },
  Animation: {
    Loading: require('../assets/animations/loading.json'),
    Location_Finding: require('../assets/animations/location-finding.json'),
  },
  NumberColumns: 3,
  Bt_Active: 0.8,
  breakpoints: ['40em', '52em', '64em', '80em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 18, 24, 36, 48, 64, 72],
  // Star Rating Count
  ratingCount: 5,
};

export { Res };
