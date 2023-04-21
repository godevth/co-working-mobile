import React, {useContext} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {Styles} from '../styles/styles';
import {Res} from '../constants/env';
import {ImgBackground} from '../components';
import useFacebookLogin from '../hooks/useFacebookLogin';
import useGoogleLogin from '../hooks/useGoogleLogin';
import useApppleLogin from '../hooks/useApppleLogin';
import { SVG_Apple, SVG_Facebook, SVG_Google } from '../assets/svg';

const SignUp = (props) => {

  const {navigation} = props;
  const [signinApple, errorApple] = useApppleLogin();
  const [signinFacebook, errorSignInFB] = useFacebookLogin();
  const [signinGoogle, errorGoogle] = useGoogleLogin();

  const _renderContainerButton = () => {
    return (
      <View style={{alignItems: 'flex-start', borderWidth: 0, flex: 1}}>
        <Button
          title="Sign up with Email"
          buttonStyle={[
            styles.buttonStyle,
            {marginHorizontal: 16, backgroundColor: '#408ABF'},
          ]}
          titleStyle={{fontSize: Res.Sizes.Header}}
          containerStyle={{width: '100%'}}
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
        <Button
          title="Sign up with Apple"
          buttonStyle={[
            styles.buttonStyle,
            {
              marginHorizontal: 16,
              backgroundColor: Res.Colors.BT_Apple,
              marginTop: '3%',
            },
          ]}
          icon={
            <View style={Styles.buttonIcon}>
              <SVG_Apple />
            </View>
          }
          titleStyle={{fontSize: Res.Sizes.Header}}
          containerStyle={{width: '100%'}}
          onPress={() => {
            signinApple();
          }}
        />
        <Button
          title="Sign up with Facebook"
          buttonStyle={[
            styles.buttonStyle,
            {
              marginHorizontal: 16,
              backgroundColor: Res.Colors.BT_Facebook,
              marginTop: '3%',
            },
          ]}
          icon={
            <View style={Styles.buttonIcon}>
              <SVG_Facebook />
            </View>
          }
          titleStyle={{fontSize: Res.Sizes.Header}}
          containerStyle={{width: '100%'}}
          onPress={() => {
            signinFacebook();
          }}
        />
        <Button
          title="Sign up with Google"
          buttonStyle={[
            styles.buttonStyle,
            {
              marginHorizontal: 16,
              backgroundColor: Res.Colors.BT_Google,
              marginTop: '3%',
            },
          ]}
          icon={
            <View style={Styles.buttonIcon}>
              <SVG_Google/>
            </View>
          }
          titleStyle={{fontSize: Res.Sizes.Header}}
          containerStyle={{width: '100%'}}
          onPress={() => {
            signinGoogle();
          }}
        />
      </View>
    );
  };
  return (
    <View style={[Styles.container, styles.center]}>
      <ImgBackground colorsGradient={Res.ColorsGradient.BlackToTransparent}>
        <View style={Styles.containerCover}>
          <Image source={Res.Images.MainLogo} style={Styles.mainLogo} />
        </View>
        <ScrollView>
        {_renderContainerButton()}
        </ScrollView>
      </ImgBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: Res.Sizes.Subhead,
    color: '#FFF',
    marginBottom: 8,
  },
  buttonStyle: {
    marginTop: '10%',
    textAlign: 'center',
    borderRadius: 7,
    paddingVertical: 12,
    backgroundColor: '#000',
  },
});

export default SignUp;
