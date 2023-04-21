import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useSafeArea} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Input, Button} from 'react-native-elements';
import {LocalizationContext} from '../Languages/translations';
import {ImgBackground} from '../components';
import {moderateScale} from '../constants/scale';
import {Styles} from '../styles/styles';
import {Res} from '../constants/env';
import {Context as AuthContext} from '../controllers/AuthController';
import handleRefreshToken from '../api/handleRefreshToken';
import * as RootNavigation from '../../RootNavigation';
import handleCreateUser from '../api/handleCreateUser';

const Search = (props) => {
  const {navigation} = props;
  const {state, getAuth, SignOut} = useContext(AuthContext);
  const [refreshToken] = handleRefreshToken();
  const [createUser] = handleCreateUser();
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  useEffect(() => {
    // Get Or Check Authen in AsyncStorage
    getAuth(() => refreshToken());
    const listener = navigation.addListener('focus', () => {
      console.log('didFocus');
      getAuth(() => refreshToken());
    });

    return () => {
      // DidFocus
      listener();
    };
  }, []);

  // console.log('State : ', state);

  const validationSchema = yup.object().shape({
    location: yup.string().required(),
    date: yup.date().typeError('Must be Date').required(),
    people: yup
      .number()
      .typeError('Must be number')
      .min(1)
      .required('Please fill number people'),
  });

  return (
    <View style={[Styles.container]}>
      <ImgBackground colorsGradient={Res.ColorsGradient.BlackToTransparent}>
        <KeyboardAwareScrollView style={{flex: 1}} enableOnAndroid={true}>
          <Formik
            enableReinitialize
            initialValues={{location: '', date: '', people: ''}}
            onSubmit={(values) => Alert.alert(JSON.stringify(values))}
            validationSchema={validationSchema}>
            {({
              values,
              touched,
              errors,
              handleSubmit,
              handleBlur,
              handleChange,
              setFieldValue,
            }) => (
              <View
                style={{
                  flex: 1,
                  marginHorizontal: moderateScale(8),
                  marginTop: moderateScale(30),
                }}>
                <View>
                  <Input
                    label={'Find Workspace by Name or Location'}
                    labelStyle={styles.labelStyle}
                    placeholder={'Workspace Name / Location'}
                    placeholderTextColor={Res.Colors.Placeholder}
                    containerStyle={{}}
                    inputStyle={Styles.inputStyle}
                    inputContainerStyle={[
                      Styles.inputContainerStyle,
                      {borderWidth: 0},
                    ]}
                    onBlur={handleBlur('location')}
                    onChangeText={handleChange('location')}
                    value={values.location}
                    errorStyle={{color: 'red'}}
                    errorMessage={
                      touched.location && errors.location
                        ? errors.location
                        : null
                    }
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Input
                    label={'Move-in Date'}
                    labelStyle={styles.labelStyle}
                    placeholder={'11/07-12/07'}
                    placeholderTextColor={Res.Colors.Placeholder}
                    containerStyle={{width: '50%'}}
                    inputStyle={Styles.inputStyle}
                    inputContainerStyle={[
                      Styles.inputContainerStyle,
                      {borderWidth: 0},
                    ]}
                    onBlur={handleBlur('date')}
                    onChangeText={handleChange('date')}
                    value={values.date}
                    errorStyle={{color: 'red'}}
                    errorMessage={
                      touched.date && errors.date ? errors.date : null
                    }
                  />
                  <Input
                    label={'Number of People'}
                    labelStyle={styles.labelStyle}
                    placeholder={'1'}
                    placeholderTextColor={'#C4C4C4'}
                    containerStyle={{width: '50%'}}
                    inputStyle={Styles.inputStyle}
                    inputContainerStyle={[
                      Styles.inputContainerStyle,
                      {borderWidth: 0},
                    ]}
                    onBlur={handleBlur('people')}
                    onChangeText={handleChange('people')}
                    value={values.people}
                    errorStyle={{color: 'red'}}
                    errorMessage={
                      touched.people && errors.people ? errors.date : null
                    }
                  />
                </View>
                <View style={{alignItems: 'center'}}>
                  <Button
                    title={translations['bt.find.now']}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{fontSize: Res.Sizes.Header}}
                    containerStyle={{width: '65%'}}
                    activeOpacity={0.8}
                    // onPress={() => RootNavigation.navigate('Result')}
                    onPress={() => navigation.navigate('Result')}
                    // onPress={() => handleSubmit()}
                  />
                </View>
              </View>
            )}
          </Formik>

          {/* {state.user && (
            <Text style={{color: '#FFF'}}>
              AsyncStorage ( UserToken ) : { JSON.stringify(state.user) }
            </Text>
          )} */}
        </KeyboardAwareScrollView>

        <View style={[styles.containerSignin, {}]}>
          {
            // Show Button when state === false
            state.loggedIn == false ? (
              <>
                <Button
                  title={translations['bt.sign.up']}
                  buttonStyle={[
                    styles.buttonStyle,
                    {
                      backgroundColor: Res.Colors.BT_Sign_Up,
                      marginBottom: 10,
                      marginTop: 10,
                    },
                  ]}
                  titleStyle={{fontSize: Res.Sizes.Header}}
                  containerStyle={{width: '48%'}}
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}
                />
                <Button
                  title={translations['bt.sign.in']}
                  buttonStyle={[
                    styles.buttonStyle,
                    {
                      backgroundColor: Res.Colors.BT_Sign_In,
                      marginBottom: 10,
                      marginTop: 10,
                    },
                  ]}
                  titleStyle={{fontSize: Res.Sizes.Header}}
                  containerStyle={{width: '48%'}}
                  onPress={() => {
                    navigation.navigate('SignIn');
                  }}
                />
              </>
            ) : (
              <>
                <Button
                  title={'Logout'}
                  buttonStyle={[
                    styles.buttonStyle,
                    {
                      backgroundColor: Res.Colors.Error,
                      marginBottom: 10,
                      marginTop: 10,
                    },
                  ]}
                  titleStyle={{fontSize: Res.Sizes.Header}}
                  containerStyle={{width: '48%'}}
                  onPress={() => {
                    SignOut();
                  }}
                />
                <Button
                  title={'Refresh Token'}
                  buttonStyle={[
                    styles.buttonStyle,
                    {
                      backgroundColor: Res.Colors.Black,
                      marginBottom: 10,
                      marginTop: 10,
                    },
                  ]}
                  titleStyle={{fontSize: Res.Sizes.Header}}
                  containerStyle={{width: '48%'}}
                  onPress={() => {
                    refreshToken();
                  }}
                />
              </>
            )
          }
        </View>
        {useSafeArea().bottom > 0 && (
          <View
            style={{
              height: useSafeArea().bottom - 5,
              backgroundColor: 'transparent',
            }}
          />
        )}
      </ImgBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSignin: {
    flexGrow: 0,
    // borderWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  labelStyle: {
    fontSize: 12,
    color: '#FFF',
    marginBottom: 8,
  },
  buttonStyle: {
    marginTop: '10%',
    textAlign: 'center',
    borderRadius: 7,
    paddingVertical: moderateScale(12),
    backgroundColor: '#000',
    marginBottom: '20%',
  },
});

export default Search;
