import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import {TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {Input, Button, CheckBox} from 'react-native-elements';
import {Menu, TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import * as yup from 'yup';
import qs from 'qs';
import {LocalizationContext} from '../Languages/translations';
import { ImgBackground } from '../components';
import {Styles} from '../styles/styles';
import {Res} from '../constants/env';
import moment from 'moment';
import 'moment/locale/th';
import * as RNLocalize from 'react-native-localize';
import handleCreateUser from '../api/handleCreateUser';
import { TH, EN, maxSelect, minSelect } from '../constants/calendarData';
import { ConvertDateFormat } from '../utils/ConvertDateFormat';
import { moderateScale } from '../constants/scale';
import { API } from '../api/config';


const Register = (props) => {
  const data = props.route.params;
  const {navigation} = props;
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPass: "",
    gender: 'M',
    birthDate: "",
    address: "",
    tumbolId: null,
    amphurId: null,
    provinceId: null,
    postCode: null,
    phone: "",
    PhoneCountryCode: "",
    term: false,

    LoginProvider: null,
    ProviderKey: null,
    ProviderDisplayName: null,

    inputEmailDisable: true,
  }
  const [state, setState] = useState(initialState);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [createUser] = handleCreateUser();
  const {translations, initializeAppLanguage, appLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  const submit = (values) => {
    console.log('SUBMIT_VALUE : ', values)
    const data = {
      Email: values.email,
      Password: values.password,
      ConfirmPassword: values.confirmPass,
      FirstName: values.firstname,
      LastName: values.lastname,
      Gender: values.gender,
      BirthDate: moment(values.birthDate).format('YYYY-MM-DD'),
      Address: values.address,
      tumbolId: null,
      amphurId: null,
      provinceId: null,
      postCode: null,
      PhoneNumber: values.phone,
      PhoneCountryCode: values.phoneCode,

      LoginProvider :  null, // !Social type to login ('google')
      ProviderKey : null, // !Social User Id ('test2key')
      ProviderDisplayName : null, // !Social name
    }
    const body = JSON.stringify(data);
    // const body = JSON.stringify(values);
    console.log(body);
    createUser(body);
  }

  const getCountry = RNLocalize.getCountry()
  console.log('REGIEN : ', getCountry);

  useEffect(() => {
    checkTokenForSignUp()
    return () => {
      checkTokenForSignUp()
    }
  },[])

  const checkTokenForSignUp = () => {
    console.log('DATA_PARAMS : ', data)
    
    if (data) {
      const {social_type, social_token} = data;
      if (social_type === API.APPLE) {
        console.log('⬛ SIGN_UP_APPLE')
        if (social_token.is_private_email) {
          console.log('APPLE_NO_EMIAL')
          setState({
            LoginProvider: social_type,
            ProviderKey: social_token.sub,
            ProviderDisplayName: null,
            inputEmailDisable: true
          })
        } else {
          console.log('APPLE_NO_EMIAL')
          setState({
            email: social_token.email,
            LoginProvider: social_type,
            ProviderKey: social_token.sub,
            ProviderDisplayName: null,
            inputEmailDisable: false
          })
        }
        
      } else if (social_type === API.FACEBOOK) {
        console.log('🟦 SIGN_UP_FACEBOOK')
        getInfoFacebook(social_token);
        // setState({
        //   LoginProvider: social_type,
        //   ProviderKey: social_token.userID,
        //   ProviderDisplayName: null,
        // })
      } else if (social_type === API.GOOGLE) {
        console.log('🟥 SIGN_UP_GOOGLE')
        setState({
          firstname: social_token.user.givenName,
          lastname: social_token.user.familyName,
          email: social_token.user.email,
          LoginProvider: social_type,
          ProviderKey: social_token.user.id,
          ProviderDisplayName: null,
          inputEmailDisable: false
        })
      } else {
        console.log('🟨 SIGN_UP_DEFAULT')
      }
    } else {
      console.log('🟨 SIGN_UP_DEFAULT')
    }
  }

  // console.log('LOG_STATE : ', state)

  const getInfoFacebook = (social_token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        // string: 'email, id, name, first_name, last_name, birthday, gender',
        string: 'email, id, name, first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {social_token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setState({
            firstname: result.first_name,
            lastname: result.last_name,
            email: result.email,

            LoginProvider: 'facebook',
            ProviderKey: result.id,
            ProviderDisplayName: result.name,
            inputEmailDisable: false, // ห้ามแก้ไข Email
          });

          console.log('result:', result);
          if (
            state.email === '' ||
            state.email == null ||
            state.email.length == 0
          )
          return setState({inputEmailDisable: true});
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  } 

  const handleMenu = () => setToggleMenu(!toggleMenu);
  const country = (value) => {
    switch (value) {
      case 'TH':
        return Res.Images.Flag_TH;
      case 'US':
        return Res.Images.Flag_US;
      case 'JP':
        return Res.Images.Flag_JP;
      case 'CH':
        return Res.Images.Flag_CH;
      default:
        console.log('------> Null')
        return null;
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const inputTheme = {
    roundness: 8,
    colors: { 
      placeholder: 'transparent', 
      text: Res.Colors.Black, 
      primary: Res.Colors.BlueLine, 
      background : Res.Colors.White,
      underlineColor:'transparent',
    }
  }

  const gender = [{id: 1, value: 'M', name: translations['label.male']}, {id: 2, value: 'F', name: translations['label.female']}];

  const _renderSelectItem = (setFieldValue) => {
    const country = [
      {name: 'Thailand', value: 'TH', code: '+66', source: Res.Images.Flag_TH},
      {name: 'United States', value: 'US', code: '+1', source: Res.Images.Flag_US},
      {name: 'Japan', value: 'JP', code: '+81', source: Res.Images.Flag_JP},
      {name: 'China', value: 'CH', code: '+86', source: Res.Images.Flag_CH},
    ];
    return (
      <>
      { country.map((item, index) => {
        return (
          <View key={index} style={{flexDirection: 'row',paddingHorizontal: 10}}>
            <View style={{justifyContent: 'center'}}>
              <Image source={item.source} style={[Styles.navbarIcon]}/>
            </View>
            <Menu.Item
              title={item.name}
              onPress={() => {
                setFieldValue('region', item.value),
                setFieldValue('phoneCode', item.code),
                handleMenu()
              }}/>
          </View>
        )
      })}
      </>
    )
  }

  const validationSchema = yup.object({
    firstname: yup.string().required(translations['validate.require']),
    lastname: yup.string().required(translations['validate.require']),
    password: yup.string().min(4, translations['validate.pass.min'])
      .max(16, translations['validate.pass.max'])
      .matches(
        /^(?=.*[0-9])(?=.*[a-zA-Z])([0-9a-zA-Z!@#$%^&amp;*()_+}{&quot;:;?/&gt;.&lt;,]+)$/,
        translations['validate.require.character'])
      .required(translations['validate.require']),
    confirmPass: yup.string().oneOf([yup.ref('password'), null], translations['validate.pass.confirm']),
    email: yup.string().email(translations['validate.email']).required(translations['validate.require']),
    gender: yup.string().required('Please select gender'),
    region: yup.string().required('Please select region'),
    phoneCode: yup.string().required('Please select region'),
    phone: yup.number().required(translations['validate.require']),
    birthDate: yup.string().test('birthDate', translations['validate.birthDate.age'], value => {
      return moment().diff(moment(value), 'years') >= 15
    }),
    address: yup.string().required(translations['validate.require']),
    term: yup.boolean().oneOf([true], 'Field must be checked'),
  })

  return (
    <View style={[Styles.container, Styles.center]}>
        <ImgBackground colorsGradient={Res.ColorsGradient.BlackToTransparent}>
          <KeyboardAwareScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              <View style={{flex: 1, alignItems: 'center', marginVertical: 25}}>
                <Image source={Res.Images.MainLogo} style={Styles.mainLogo} />
              </View>
              <Formik
                // enableReinitialize
                initialValues={{
                  firstname: '', lastname: '', email: '', password: '', confirmPass: '', gender: 'M', birthDate: new Date(), region: 'TH', phoneCode: '+66', phone: '', address: '', term: false
                }}
                onSubmit={
                  (values) => 
                    submit(values)
                    // Alert.alert(JSON.stringify(values))
                    // console.log(qs.stringify({values}))
                }
                validationSchema={validationSchema}
                >
                {({values, touched, errors, handleSubmit, handleBlur, handleChange, setFieldValue}) => (
                  
                  <View
                    style={{
                      marginHorizontal: 8,
                      // marginTop: 0,
                    }}>
                    {/* <Text>{errors.firstname}</Text>
                    <Text>{errors.lastname}</Text>
                    <Text>{errors.password}</Text>
                    <Text>{errors.confirmPass}</Text>
                    <Text>{errors.gender}</Text>
                    <Text>{errors.birthDate}</Text>
                    <Text>{errors.region}</Text>
                    <Text>{errors.phone}</Text>
                    <Text>{errors.address}</Text>
                    <Text>{errors.term}</Text> */}
                    <Input
                      label={translations['label.firstname']}
                      labelStyle={styles.labelStyle}
                      placeholder={translations['label.firstname']}
                      placeholderTextColor={Res.Colors.Placeholder}
                      containerStyle={{}}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.inputContainerStyle}
                      autoCapitalize={'none'}
                      onBlur={handleBlur('firstname')}
                      onChangeText={handleChange('firstname')}
                      value={values.firstname}
                      errorStyle={{color: 'red'}}
                      errorMessage={touched.firstname && errors.firstname ? errors.firstname : null}
                    />
                    <Input
                      label={translations['label.lastname']}
                      labelStyle={styles.labelStyle}
                      placeholder={translations['label.lastname']}
                      placeholderTextColor={Res.Colors.Placeholder}
                      containerStyle={{}}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.inputContainerStyle}
                      autoCapitalize={'none'}
                      onBlur={handleBlur('lastname')}
                      onChangeText={handleChange('lastname')}
                      value={values.lastname}
                      errorStyle={{color: 'red'}}
                      errorMessage={touched.lastname && errors.lastname ? errors.lastname : null}
                    />
                    <Input
                      label={translations['label.email']}
                      labelStyle={styles.labelStyle}
                      placeholder={translations['label.email']}
                      placeholderTextColor={Res.Colors.Placeholder}
                      containerStyle={{}}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.inputContainerStyle}
                      autoCapitalize={'none'}
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
                      editable={state.inputEmailDisable}
                      value={values.email}
                      errorStyle={{color: 'red'}}
                      errorMessage={touched.email && errors.email ? errors.email : null}
                    />
                    <Input
                      label={translations['label.password']}
                      labelStyle={styles.labelStyle}
                      placeholder={translations['label.password']}
                      placeholderTextColor={Res.Colors.Placeholder}
                      containerStyle={{}}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.inputContainerStyle}
                      autoCapitalize={'none'}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      value={values.password}
                      errorStyle={{color: 'red'}}
                      errorMessage={touched.password && errors.password ? errors.password : null}
                    />
                    <Input
                      label={translations['label.password.con']}
                      labelStyle={styles.labelStyle}
                      placeholder={translations['label.password.con']}
                      placeholderTextColor={Res.Colors.Placeholder}
                      containerStyle={{}}
                      inputStyle={styles.inputStyle}
                      inputContainerStyle={styles.inputContainerStyle}
                      autoCapitalize={'none'}
                      onBlur={handleBlur('confirmPass')}
                      onChangeText={handleChange('confirmPass')}
                      value={values.confirmPass}
                      errorStyle={{color: 'red'}}
                      errorMessage={touched.confirmPass && errors.confirmPass ? errors.confirmPass : null}
                    />
                    
                    <FlatList
                      data={gender}
                      horizontal
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item, index}) => (
                        <View 
                          key={item.id} 
                          style={{marginRight: moderateScale(12), marginBottom: moderateScale(12)}}>
                          <TouchableOpacity
                            key={item.id}
                            style={{flexDirection: 'row'}}
                            onPress={() => setFieldValue('gender', item.value)}>
                            <View style={{margin: moderateScale(10)}}>
                              <View style={Styles.Circle}>
                                {item.value == values.gender ? (
                                  <View
                                    style={{
                                      height: 17,
                                      width: 17,
                                      borderRadius: 20,
                                      backgroundColor: Res.Colors.Black,
                                    }}
                                  />
                                ) : null}
                              </View>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Text style={styles.genderText}>{item.name}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    />

                    <TouchableWithoutFeedback 
                      // onPress={() => showDatePicker()} 
                      // onPressIn={() => showDatePicker()}
                      onPressOut={() => showDatePicker()}>
                      <Input
                        label={translations['label.birthday']}
                        labelStyle={styles.labelStyle}
                        placeholder={translations['label.birthday']}
                        placeholderTextColor={Res.Colors.Placeholder}
                        containerStyle={{}}
                        editable={false}
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        onFocus={() => showDatePicker()}
                        onBlur={handleBlur('birthDate')}
                        onChangeText={handleChange('birthDate')}
                        value={
                          values.birthDate 
                          ? // TODO: เช็คภาษาของเครื่อง
                            getCountry === 'TH'
                              // TODO: เช็คภาษาของแอพ
                              ? appLanguage === 'th'
                                ? ConvertDateFormat(values.birthDate, 'th')
                                : ConvertDateFormat(values.birthDate, 'en')
                              : appLanguage === 'th'
                                ? moment(values.birthDate).locale('th').format('LL')
                                : moment(values.birthDate).locale('en').format('LL')
                          : values.birthDate 
                        }
                        errorStyle={{color: 'red'}}
                        errorMessage={touched.birthDate && errors.birthDate ? errors.birthDate : null}
                      />
                    </TouchableWithoutFeedback>
                    <DateTimePickerModal
                      headerTextIOS={'เลือกวันเกิด'}
                      isVisible={isDatePickerVisible}
                      mode="date"
                      locale={appLanguage == 'th' ? TH : EN}
                      date={values.birthDate}
                      isDarkModeEnabled={false}
                      minimumDate={minSelect}
                      maximumDate={maxSelect}
                      onConfirm={date => {
                        console.log('DATE_PICKER : ', date)
                        setFieldValue('birthDate', date)
                        hideDatePicker()
                      }}
                      onCancel={hideDatePicker}
                    />

                    <>
                    <View style={{paddingHorizontal: 10}}>
                      <Text style={[{fontWeight: '700', fontSize: 12, color: Res.Colors.White}]}>{translations['label.phonenumber']}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 0.2,  paddingLeft: 10}}>
                        <Menu
                          visible={toggleMenu}
                          onDismiss={handleMenu}
                          anchor={
                            <TouchableOpacity onPress={handleMenu}>
                              <View style={{position: "absolute", left: 10, bottom: 0, top: 0, zIndex: 1,justifyContent: 'center', marginTop: 5}}>
                                <Image source={country(values.region)} style={[Styles.navbarIcon]}/>
                              </View>
                              <TextInput
                                left={<View/>}
                                style={{height: 43, fontSize: Res.Sizes.Body, paddingTop: 0}}
                                theme={inputTheme}
                                onBlur={handleBlur('region')}
                                pointerEvents={'none'}
                                editable={false}
                                mode='outlined'
                                value={values.region}
                                onChangeText={handleChange('region')}/>
                            </TouchableOpacity>
                          }>
                          {_renderSelectItem(setFieldValue)}
                        </Menu>
                      </View>

                      <Input
                        // label={'Telephone Number'}
                        labelStyle={styles.labelStyle}
                        placeholder={translations['label.phonenumber']}
                        placeholderTextColor={Res.Colors.Placeholder}
                        containerStyle={{flex: 0.8, paddingTop: 6}}
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        autoCapitalize={'none'}
                        onBlur={handleBlur('phone')}
                        onChangeText={handleChange('phone')}
                        value={values.phone}
                        errorStyle={{color: 'red'}}
                        errorMessage={touched.phone && errors.phone ? errors.phone : null}
                      />
                    </View>
                    </>

                    <Input
                      label={translations['label.address']}
                      labelStyle={styles.labelStyle}
                      placeholder={translations['label.address']}
                      placeholderTextColor={Res.Colors.Placeholder}
                      containerStyle={{}}
                      inputStyle={[styles.inputStyle, {height: 80}]}
                      inputContainerStyle={styles.inputContainerStyle}
                      autoCapitalize={'none'}
                      onBlur={handleBlur('address')}
                      onChangeText={handleChange('address')}
                      multiline={true}
                      value={values.address}
                      errorStyle={{color: 'red'}}
                      errorMessage={touched.address && errors.address ? errors.address : null}
                    />
                    <CheckBox
                      title='I accept the Terms and Conditions. You are entering into an agreement with COSPACE.'
                      containerStyle={{backgroundColor: 'transparent', borderWidth: 1, borderColor: 'transparent'}}
                      textStyle={{fontSize: Res.Sizes.Subhead, color: Res.Colors.White}}
                      checkedColor={Res.Colors.White}
                      uncheckedColor={errors.term ? Res.Colors.Error : Res.Colors.White }
                      checked={values.term}
                      onPress={() => setFieldValue('term', !values.term)}
                    />
                    <View style={{alignItems: 'center'}}>
                      <Button
                        title="Submit"
                        buttonStyle={styles.buttonStyle}
                        titleStyle={{fontSize: Res.Sizes.Header}}
                        containerStyle={{width: '65%'}}
                        // onPress={() => {
                        //   navigation.navigate('Result');
                        // }}
                        onPress={() => handleSubmit()}
                      />
                    </View>
                  </View>
                )}
              </Formik>
          </KeyboardAwareScrollView>
      </ImgBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: Res.Colors.White,
    borderRadius: 7,
    borderBottomWidth: 0,
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
  genderText: {
    fontSize: Res.Sizes.body,
    color: Res.Colors.White,
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 25,
    textAlign: 'center',
    borderRadius: 7,
    paddingVertical: 12,
    backgroundColor: Res.Colors.Black,
  },
});

export default Register;
