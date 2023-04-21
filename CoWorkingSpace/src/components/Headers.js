import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Header, Left, Body, Right, Button} from 'native-base';
import {Res} from '../constants/env';

const HeaderBar = ({backgroundColor, textColor, navigation, route}) => {
  const initialState = {
    background: '',
    black: null,
    text: '',
    routes: '',
    barStyle: 'light-content',
  }

  const [state, setState] = useState(initialState);
  const [routes, setRoutes] = useState(route.name);
  // let background;
  // let black;
  // let text;
  // let routes;
  // let barStyle;

  async function headerChange() {
    // console.log('Screen ---> ', route.name);
    if (
      route.name === 'SearchScreen' ||
      route.name === 'SignIn' ||
      route.name === 'SignUp' ||
      route.name === 'Register' ||
      route.name === 'Forgot'
    ) {
        setState({
          background: '#000',
          black: true,
          text: '#FFF',
          routes: route.name,
          barStyle: 'light-content'
        })
    } else {
      console.log('Other Stack')
      setState({
        background: '#FFF',
        black: false,
        text: '#000',
        routes: route.name,
        barStyle: 'dark-content'
      })
    }
  }

  useEffect(() => {
    headerChange()
  },[])

  // switch (route.name) {
  //   case 'SearchScreen':
  //     console.log('CASE --> 1');
  //     background = '#000';
  //     black = true;
  //     text = '#FFF';
  //     routes = route.name;
  //     barStyle = 'light-content';
  //     break;
  //   case 'SignIn':
  //     console.log('CASE --> 2');
  //     background = '#000';
  //     black = true;
  //     text = '#FFF';
  //     routes = route.name;
  //     barStyle = 'light-content';
  //     break;
  //   case 'SignUp':
  //     console.log('CASE --> 3');
  //     background = '#000';
  //     black = true;
  //     text = '#FFF';
  //     routes = route.name;
  //     barStyle = 'light-content';
  //     break;
  //   case 'Register':
  //     console.log('CASE --> 4');
  //     background = '#000';
  //     black = true;
  //     text = '#FFF';
  //     routes = route.name;
  //     barStyle = 'light-content';
  //     break;
  //   case 'Forgot':
  //     console.log('CASE --> 5');
  //     background = '#000';
  //     black = true;
  //     text = '#FFF';
  //     routes = route.name;
  //     barStyle = 'light-content';
  //     break;
  // case 'Result':
  //   console.log('CASE --> 6');
  //   background = '#FFF';
  //   black = false;
  //   text = '#000';
  //   routes = route.name;
  //   barStyle = 'dark-content';
  //   break;
  //   default:
  //     console.log('CASE --> 0');
  //     background = '#FFF';
  //     black = false;
  //     text = '#000';
  //     routes = route.name;
  //     barStyle = 'dark-content';
  //     break;
  // }

  const _renderBackButton = () => {
    return (
      <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.goBack()}>
        <View style={{
          // borderWidth: 2, borderColor: 'red'
        }}>
          <Image 
            source={Res.Images.Back} 
            style={{width: 20, height: 20, resizeMode: 'contain'}}/>
          {/* <Text style={{color: state.text || '#000'}}>Back</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  const _renderLeft = () => {
    switch (state.routes) {
      case 'SignIn':
        return _renderBackButton();
      case 'SignUp':
        return _renderBackButton();
      case 'Forgot':
        return _renderBackButton();
      case 'Register':
        return _renderBackButton();
      case 'Notification':
        return (
          <TouchableNativeFeedback onPress={() => navigation.goBack()}>
            <Image 
              source={Res.Images.Close} 
              style={{width: 20, height: 20, resizeMode: 'contain'}}/>
          </TouchableNativeFeedback>
        );
      default:
        return (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.toggleDrawer()}>
            <View>
              <Image
                source={state.black ? Res.Images.Menu_White : Res.Images.Menu_Black}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
        );
    }
  };

  const _renderCenter = () => {
    switch (state.routes) {
      case 'SignIn':
        return null;
      case 'SignUp':
        return null;
      case 'Register':
        return null;
      case 'Forgot':
        return null;
      case 'Notification':
        return <Text>Notification</Text>;
      default:
        return (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => console.log('Center')}>
            <View style={{}}>
              <Image
                source={
                  state.black ? Res.Images.MainLogoWhite : Res.Images.MainLogoBlack
                }
                style={{width: 70, height: 30, resizeMode: 'contain'}}
              />
              {/* <Text style={{color: text || '#000'}}>Center</Text> */}
            </View>
          </TouchableOpacity>
        );
    }
  };

  const _renderRight = () => {
    switch (state.routes) {
      case 'SignIn':
        return null;
      case 'SignUp':
        return null;
      case 'Register':
        return null;
      case 'Forgot':
        return null;
      case 'Notification':
        return null;
      default:
        return (
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.navigate('Notification')}>
            <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
              <Image
                source={state.black ? Res.Images.Noti_White : Res.Images.Noti_Black}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
        );
    }
  };

  const _openDrawer = () => navigation.toggleDrawer();

  const _handleNotification = () => navigation.navigate('Notification');

  // console.log('LOG ROUTE ==> ', routes + ' : ' + background + ' : ' + barStyle);
  // console.log('OPTIONS ==> ', navigation);

  return (
    <>
      {/* <StatusBar barStyle={state.barStyle} backgroundColor={state.background} /> */}
      <Header
        style={[
          styles.HeaderBar,
          {
            backgroundColor: state.background,
          },
        ]}
        iosBarStyle={state.barStyle}
        androidStatusBarColor={state.background}>
        <Left style={{flex: 1}}>{_renderLeft()}</Left>
        <Body style={{flex: 1, alignItems: 'center'}}>{_renderCenter()}</Body>
        <Right style={{flex: 1}}>{_renderRight()}</Right>
      </Header>
    </>
  );
};

const styles = StyleSheet.create({
  HeaderBar: {
    paddingTop: 0,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 3,
    height: 45,
    borderBottomWidth: 0,
  },
});
const Headers = React.memo(HeaderBar);
export default Headers;
