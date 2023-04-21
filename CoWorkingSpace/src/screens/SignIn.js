import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {KeyboardAwareListView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Res} from '../constants/env';
import {Styles} from '../styles/styles';
import {LocalizationContext} from '../Languages/translations';
import useFacebookLogin from '../hooks/useFacebookLogin';
import useGoogleLogin from '../hooks/useGoogleLogin';
import useApppleLogin from '../hooks/useApppleLogin';
import {ImgBackground} from '../components';
import handleCreateToken from '../api/handleCreateToken';
import appleAuth, {} from '@invertase/react-native-apple-authentication';
import {SVG_Apple, SVG_Facebook, SVG_Google} from '../assets/svg';
// import { Context as AuthContext } from '../controllers/AuthController';

const SignIn = (props) => {
  const {navigation} = props;
  // const { state, getAuth } = useContext(AuthContext);
  const [signinApple, errorApple] = useApppleLogin();
  const [signinFacebook, errorSignInFB] = useFacebookLogin();
  const [signinGoogle, errorGoogle] = useGoogleLogin();
  const [login] = handleCreateToken();
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  useEffect(() => {

    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return () => {
      if (Platform.OS == 'ios' && parseInt(Platform.Version, 10) >= 13) {
        console.log('Is ios 13 & Upper')
        appleAuth.onCredentialRevoked(async () => {
          console.warn(
            'If this function executes, User Credentials have been Revoked',
          );
        });
      }
    };
  }, []);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(translations['validate.email'])
      .required(translations['validate.require']),
    password: yup
      .string()
      .min(4, translations['validate.pass.min'])
      .max(16, translations['validate.pass.max'])
      .required(translations['validate.require']),
  });

  return (
    <View style={[Styles.container, Styles.center]}>
      <ImgBackground colorsGradient={Res.ColorsGradient.BlackToTransparent}>
        <View style={Styles.containerCover}>
          <Image source={Res.Images.MainLogo} style={[Styles.mainLogo]} />
        </View>
        <KeyboardAwareListView style={{}}>
          <Formik
            // enableReinitialize
            initialValues={{email: '', password: ''}}
            onSubmit={(values, actions) => {
              // Alert.alert(JSON.stringify(values))
              login(values.email, values.password);
              // actions.resetForm()
            }}
            // onSubmit={(values, actions) => {actions.resetForm()}}
            // validationSchema={validationSchema}
          >
            {({
              values,
              touched,
              errors,
              handleSubmit,
              handleBlur,
              handleChange,
            }) => (
              <View style={{marginHorizontal: 8, marginTop: '15%'}}>
                <View>
                  <Input
                    label={''}
                    labelStyle={styles.labelStyle}
                    placeholder={'Email'}
                    placeholderTextColor={'#C4C4C4'}
                    containerStyle={{marginBottom: 15}}
                    inputStyle={Styles.inputStyle}
                    inputContainerStyle={[
                      Styles.inputContainerStyle,
                      {borderWidth: 0},
                    ]}
                    autoCapitalize="none"
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    value={values.email}
                    errorStyle={{color: 'red'}}
                    errorMessage={
                      touched.email && errors.email ? errors.email : null
                    }
                    renderErrorMessage={
                      touched.email && errors.email ? true : false
                    }
                    // renderErrorMessage={false}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Input
                    label={''}
                    labelStyle={styles.labelStyle}
                    placeholder={'Password'}
                    placeholderTextColor={'#C4C4C4'}
                    containerStyle={{}}
                    inputStyle={Styles.inputStyle}
                    inputContainerStyle={[
                      Styles.inputContainerStyle,
                      {borderWidth: 0},
                    ]}
                    autoCapitalize="none"
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    errorStyle={{color: 'red'}}
                    errorMessage={
                      touched.password && errors.password
                        ? errors.password
                        : null
                    }
                    renderErrorMessage={
                      touched.password && errors.password ? true : false
                    }
                    // secureTextEntry={true}
                  />
                </View>

                <View style={{alignItems: 'center'}}>
                  <Button
                    title="Login"
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{fontSize: Res.Sizes.Header}}
                    containerStyle={{width: '65%'}}
                    onPress={
                      () => handleSubmit()
                      // () => {navigation.navigate('Result')}
                    }
                  />
                </View>
              </View>
            )}
          </Formik>
          <TouchableOpacity
            style={{alignItems: 'center', marginTop: 20}}
            onPress={() => {
              navigation.navigate('Forgot');
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: Res.Sizes.Header,
                textDecorationLine: 'underline',
              }}>
              Forget Password?
            </Text>
          </TouchableOpacity>

          {/* SOCIAL LOGIN */}
          <View style={{alignItems: 'center', paddingTop: '10%', flexGrow: 1}}>

            {/* !! Support iOS 13 & Upper !! */}
            {Platform.OS == 'ios' && parseInt(Platform.Version, 10) >= 13 ? (
              <Button
                title="Sign in with Apple"
                buttonStyle={[
                  styles.buttonStyle,
                  {
                    marginHorizontal: 16,
                    backgroundColor: Res.Colors.BT_Apple,
                    marginTop: 0,
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
            ) : null}
            <Button
              title="Sign in with Facebook"
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
              title="Sign in with Google"
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
                  <SVG_Google />
                </View>
              }
              titleStyle={{fontSize: Res.Sizes.Header}}
              containerStyle={{width: '100%'}}
              onPress={() => {
                signinGoogle();
              }}
            />
          </View>
        </KeyboardAwareListView>
      </ImgBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: undefined,
    resizeMode: 'contain',
    paddingVertical: 20,
  },
  inputContainerStyle: {
    backgroundColor: '#FFF',
    borderRadius: 7,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  inputStyle: {
    fontSize: Res.Sizes.Body,
  },
  labelStyle: {
    fontSize: Res.Sizes.Subhead,
    color: Res.Colors.White,
    marginBottom: 8,
  },
  buttonStyle: {
    marginTop: '10%',
    textAlign: 'center',
    borderRadius: 7,
    paddingVertical: 12,
    backgroundColor: Res.Colors.Black,
  },
});

export default SignIn;
