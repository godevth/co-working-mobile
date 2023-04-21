import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert, TouchableWithoutFeedback} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Input, Button} from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Menu, Divider, TextInput, List } from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import { LocalizationContext } from '../../../Languages/translations';
import {Styles} from '../../../styles/styles';
import {Res} from '../../../constants/env';
import moment from 'moment';
import 'moment/locale/th';
import * as RNLocalize from 'react-native-localize';
import handleGetUserData from '../../../api/handleGetUserData';
import { ConvertDateFormat } from '../../../utils/ConvertDateFormat';
import {Context as AuthContext} from '../../../controllers/AuthController';
import { Loading } from '../../../components';
import { moderateScale } from '../../../constants/scale';
import { EN, maxSelect, minSelect, now, TH } from '../../../constants/calendarData';

const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const ccvRegExp = /^[0-9]{3,3}$/

const initialUserState = {
  firstname: '', 
  lastname: '', 
  address: 'SBP Digital Services', 
  region: 'TH',
  phoneCode: '+66',
  gender: 'M',
  phone: '', 
  email: 'johndoe@mail.com', 
  birthDate: now,
  password: '12345678', 
  cardName: 'John Doe',
  cardNumber: '2345 7632 4570 8532',
  cardPostal: '10700',
  expiryDate: '12/20',
  CVV: '567'
}

const User = (props) => {

  const {navigation} = props;
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const {state, getAuth, SignOut} = useContext(AuthContext);
  const [userState, setUserState] = useState(state.userData);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [getUserData, updateUserData, userLoading] = handleGetUserData();

  const {translations, initializeAppLanguage, appLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  useEffect(() => {
    // getUserData();
    const listener = navigation.addListener('focus', () => {
      console.log('didFocus');
      getUserData();
    });
    return () => {
      listener();
    }
  })

  // console.log('AUTH_CONTEXT_USER_DATA : ', state.userData);

  const toggleMenu = () => setVisible(!visible);

  const inputTheme = {
    roundness: 7,
    colors: { 
      // placeholder: Res.Colors.Placeholder, 
      placeholder: 'transparent', 
      text: Res.Colors.Black, 
      primary: Res.Colors.BlueLine, 
      background : Res.Colors.White,
      underlineColor:'transparent',
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const validationSchema = yup.object().shape({
    firstname: yup.string().required(translations['validate.require']),
    lastname: yup.string().required(translations['validate.require']),
    gender: yup.string().required(translations['validate.require']),
    region: yup.string().typeError(translations['validate.require']).required(translations['validate.require']),
    phone: yup.string().typeError(translations['validate.require']).matches(phoneRegExp, translations['validate.phone']).required(translations['validate.require']),
    phoneCode: yup.string().typeError(translations['validate.require']).required(translations['validate.require']),
    // email: yup.string().email(translations['validate.email']).required(translations['validate.require']),
    // password: yup.string().min(4, translations['validate.pass.min']).max(16, translations['validate.pass.max']).required(translations['validate.require']),
    address: yup.string().required(translations['validate.require']),
    birthDate: yup.string().typeError(translations['validate.require']).test('birthDate', translations['validate.birthDate.age'], value => {
      return moment().diff(moment(value), 'years') >= 15
    }).required(translations['validate.require']),
    // cardName: yup.string().required(translations['validate.card.name']),
    // cardNumber: yup.number().required(translations['validate.require']),
    // cardPostal: yup.number(translations['validate.card.postal.number']).required(translations['validate.require']),
    // expiryDate: yup.string().required(translations['validate.require']),
    // CVV: yup.string().matches(ccvRegExp, translations['validate.card.cvv']).required(translations['validate.require']),
  })

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
                toggleMenu()
              }}/>
          </View>
        )
      })}
      </>
    )
  }

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

  const getCountry = RNLocalize.getCountry()
  console.log('REGIEN : ', getCountry);

  const submit = (values) => {
    console.log('SUBMIT_VALUE : ', values)
    const data = {
      FirstName: values.firstname,
      LastName: values.lastname,
      Address: values.address,
      TumbolId: null,
      AmphurId: null,
      ProvinceId: null,
      PostCode: null,
      PhoneNumber: values.phone,
      Gender: values.gender,
      BirthDate: moment(values.birthDate).format('YYYY-MM-DD'),
      PhoneCountryCode: values.phoneCode,
      Companyname: null,

      // Email: values.email,
      // Password: values.password,
      // ConfirmPassword: values.confirmPass,
    }
    const body = JSON.stringify(data);
    // const body = JSON.stringify(values);
    // console.log(body);
    updateUserData(body);
  }

  if (userLoading) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: Res.Colors.White
      }}>
        <Loading />
      </View>
    )
  }
  return (
    <View
      style={[
        Styles.container,
        {backgroundColor: Res.Colors.White},
      ]}>
      { userLoading ?  <Loading /> : null }

      <Formik
        // enableReinitialize
        initialValues={{
          firstname: state.userData.firstName, 
          lastname: state.userData.lastName, 
          address: state.userData.address || '', 
          region: state.userData.phoneCountryCode === '+66' 
            ? 'TH'
            : state.userData.phoneCountryCode === '+1' 
              ? 'US'
              : state.userData.phoneCountryCode === '+81'
                ? 'JP'
                : state.userData.phoneCountryCode === '+86'
                  ? 'CH'
                  : '', 
          phoneCode: state.userData.phoneCountryCode || '',
          gender: state.userData.gender || '',
          phone: state.userData.phoneNumber, 
          email: state.userData.email, 
          birthDate: state.userData.birthDateString,
          password: '', 
          cardName: '',
          cardNumber: '',
          cardPostal: '',
          expiryDate: '',
          CVV: ''
        }}
        onSubmit={
          (values) => 
            submit(values)
            // Alert.alert(JSON.stringify(values))
        }
        validationSchema={validationSchema}>
        {({values, touched, errors, handleSubmit, handleBlur, handleChange, setFieldValue}) => {
          // useEffect(() => {
          //   setFieldValue('firstname', '100')
          // },[])
          return (
            <>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={[styles.headerContent]}>
                <Text style={styles.headerLabel}>Personal Details</Text>
              </View>

                <Text style={styles.textLabel}>{translations['label.firstname']}</Text>
                <TextInput
                  mode='outlined'
                  placeholder={translations['label.firstname']}
                  placeholderTextColor={Res.Colors.Placeholder}
                  style={[Styles.shadows, styles.inputContainer, {}]}
                  theme={inputTheme}
                  value={values.firstname}
                  onBlur={handleBlur('firstname')}
                  onChangeText={handleChange('firstname')}
                  error={touched.firstname && errors.firstname ? errors.firstname : null}
                />
                {
                  touched.firstname && errors.firstname &&
                  <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.firstname}</Text>
                }

                <Text style={[styles.textLabel]}>{translations['label.lastname']}</Text>
                <TextInput
                  mode='outlined'
                  placeholder={translations['label.lastname']}
                  placeholderTextColor={Res.Colors.Placeholder}
                  style={[Styles.shadows, styles.inputContainer, {}]}
                  theme={inputTheme}
                  value={values.lastname}
                  onBlur={handleBlur('lastname')}
                  onChangeText={handleChange('lastname')}
                  error={touched.lastname && errors.lastname ? errors.lastname : null}
                />
                {
                  touched.lastname && errors.lastname &&
                  <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.lastname}</Text>
                }

                      <FlatList
                        data={gender}
                        horizontal
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item, index}) => (
                          <View 
                            key={item.id} 
                            style={{
                              marginVertical: moderateScale(10),
                              marginRight: moderateScale(25)
                            }}>
                            <TouchableOpacity
                              key={item.id}
                              style={{flexDirection: 'row', paddingLeft: 18}}
                              onPress={() => setFieldValue('gender', item.value)}>
                              <View style={[ Styles.shadows, {margin: moderateScale(10)}]}>
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

                {
                  touched.gender && errors.gender &&
                  <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.gender}</Text>
                }

                <Text style={styles.textLabel}>{translations['label.birthday']}</Text>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={showDatePicker}
                >
                  <>
                  <TextInput
                    style={[Styles.shadows,styles.inputContainer, {marginTop: 5}]}
                    theme={inputTheme}
                    placeholder={translations['label.birthday']}
                    placeholderTextColor={Res.Colors.Placeholder}
                    value={
                      values.birthDate 
                      ? values.birthDate 
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
                      : ''
                    }
                    onBlur={handleBlur('birthDate')}
                    mode='outlined'
                    pointerEvents={'none'}
                    editable={false}
                    onChangeText={handleChange('birthDate')}
                    error={touched.birthDate && errors.birthDate ? errors.birthDate : null}
                  />
                  {
                    touched.birthDate && errors.birthDate &&
                    <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.birthDate}</Text>
                  }
                  </>
                </TouchableOpacity>

                <DateTimePickerModal
                  headerTextIOS={translations['label.birthday']}
                  isVisible={isDatePickerVisible}
                  mode="date"
                  locale={appLanguage == 'th' ? TH : EN}
                  date={values.birthDate == null ? new Date() : values.birthDate}
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

                <Text style={styles.textLabel}>{translations['label.phonenumber']}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                  <View style={{flex: 0.2, paddingLeft: 18}}>
                    <Menu
                      visible={visible}
                      onDismiss={toggleMenu}
                      anchor={
                        <TouchableOpacity 
                          onLayout={({
                            nativeEvent: {
                              layout: { x, y, width, height }
                            }
                          }) => {
                            setWidth( width )
                            setHeight( height )
                          }}
                          onPress={toggleMenu}>
                          <View style={{position: "absolute", left: 10, bottom: 0, top: 0, zIndex: 1,justifyContent: 'center', marginTop: 5}}>
                            <Image source={country(values.region)} style={[Styles.navbarIcon]}/>
                          </View>
                          <TextInput
                            left={<View/>}
                            placeholder={'TH'}
                            placeholderTextColor={Res.Colors.Placeholder}
                            style={[Styles.shadows, styles.inputContainer, { paddingHorizontal: 0}]}
                            theme={inputTheme}
                            onBlur={handleBlur('region')}
                            pointerEvents={'none'}
                            editable={false}
                            mode='outlined'
                            value={values.region == null ? '' : ' ' + values.region}
                            onChangeText={handleChange('region')}
                            error={touched.region && errors.region ? errors.region : null}/>
                        </TouchableOpacity>
                      }>
                      {_renderSelectItem(setFieldValue)}
                    </Menu>
                    {
                      touched.region && errors.region &&
                      <Text style={Styles.textError}>{errors.region}</Text>
                    }
                  </View>

                  <View style={{flexDirection: 'column', flex: 0.78}}>
                    <TextInput
                      mode='outlined'
                      placeholder={translations['label.phonenumber']}
                      placeholderTextColor={Res.Colors.Placeholder}
                      style={[Styles.shadows, styles.inputContainer, { paddingHorizontal: 0, paddingRight: 18}]}
                      theme={inputTheme}
                      value={values.phone == null ? '' : values.phone}
                      onBlur={handleBlur('phone')}
                      onChangeText={handleChange('phone')}
                      keyboardType='number-pad'
                      error={touched.phone && errors.phone ? errors.phone : null}
                    />
                    {
                      touched.phone && errors.phone &&
                      <Text style={Styles.textError}>{errors.phone}</Text>
                    }
                  </View>
                </View>

                <Text style={styles.textLabel}>{translations['label.address']}</Text>
                <TextInput
                  mode='outlined'
                  placeholder={translations['label.add']}
                  placeholderTextColor={Res.Colors.Placeholder}
                  multiline={true}
                  numberOfLines={8}
                  style={[
                    Styles.shadows, styles.inputContainer, 
                    {marginTop: 5, height: moderateScale(90), textAlignVertical: 'top'}
                  ]}
                  theme={inputTheme}
                  value={values.address}
                  onBlur={handleBlur('address')}
                  onChangeText={handleChange('address')}
                  error={touched.address && errors.address ? errors.address : null}
                />
                {
                  touched.address && errors.address &&
                  <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.address}</Text>
                }

                <View style={[styles.headerContent]}>
                  <Text style={[styles.headerLabel, {marginTop: moderateScale(10)}]}>Login Details</Text>
                </View>

                <Text style={styles.textLabel}>{translations['label.email']}</Text>
                <TextInput
                    mode='outlined'
                    placeholder={translations['label.email']}
                    placeholderTextColor={Res.Colors.Placeholder}
                    style={[Styles.shadows, styles.inputContainer, {}]}
                    theme={inputTheme}
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    keyboardType='email-address'
                    error={touched.email && errors.email ? errors.email : null}
                  />
                {
                  touched.email && errors.email &&
                  <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.email}</Text>
                }

                <Text style={styles.textLabel}>{translations['label.password']}</Text>
                <TextInput
                  mode='outlined'
                  placeholder={translations['label.password']}
                  placeholderTextColor={Res.Colors.Placeholder}
                  style={[Styles.shadows, styles.inputContainer, {marginTop: 5}]}
                  theme={inputTheme}
                  value={values.password}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  error={touched.password && errors.password ? errors.password : null}
                />
                {
                  touched.password && errors.password &&
                  <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.password}</Text>
                }


                <View style={[styles.headerContent]}>
                  <Text style={styles.headerLabel}>Payment Details</Text>
                </View>

                <Text style={styles.textLabel}>{translations['label.care.name']}</Text>
                <TextInput
                  mode='outlined'
                  placeholder={translations['label.care.name']}
                  placeholderTextColor={Res.Colors.Placeholder}
                  style={[Styles.shadows, styles.inputContainer, {}]}
                  theme={inputTheme}
                  value={values.cardName}
                  onBlur={handleBlur('cardName')}
                  onChangeText={handleChange('cardName')}
                  error={touched.cardName && errors.cardName ? errors.cardName : null}
                />
                {
                  touched.cardName && errors.cardName &&
                  <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.cardName}</Text>
                }

              <Text style={styles.textLabel}>{translations['label.care.number']}</Text>
                <TextInput
                  mode='outlined'
                  placeholder={translations['label.care.number']}
                  placeholderTextColor={Res.Colors.Placeholder}
                  style={[Styles.shadows, styles.inputContainer, {marginTop: 5}]}
                  theme={inputTheme}
                  value={values.cardNumber}
                  onBlur={handleBlur('cardNumber')}
                  onChangeText={handleChange('cardNumber')}
                  error={touched.cardNumber && errors.cardNumber ? errors.cardNumber : null}
                />
                {
                  touched.cardNumber && errors.cardNumber &&
                  <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.cardNumber}</Text>
                }

                <Text style={styles.textLabel}>{translations['label.care.postal']}</Text>
                <TextInput
                  mode='outlined'
                  placeholder={translations['label.care.postal']}
                  placeholderTextColor={Res.Colors.Placeholder}
                  style={[Styles.shadows, styles.inputContainer, {marginTop: 5}]}
                  theme={inputTheme}
                  value={values.cardPostal}
                  onBlur={handleBlur('cardPostal')}
                  onChangeText={handleChange('cardPostal')}
                  keyboardType='number-pad'
                  maxLength={5}
                  error={touched.cardPostal && errors.cardPostal ? errors.cardPostal : null}
                />
                {
                  touched.cardPostal && errors.cardPostal &&
                  <Text style={[Styles.textError, {paddingLeft: 18}]}>{errors.cardPostal}</Text>
                }

                <Text style={styles.textLabel}>{translations['label.care.expiry']}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                  <View style={{flexDirection: 'column', flex: 0.49, paddingLeft: 18}}>
                    <TextInput
                      mode='outlined'
                      placeholder={translations['label.care.expiry']}
                      placeholderTextColor={Res.Colors.Placeholder}
                      style={[Styles.shadows, styles.inputContainer, {paddingHorizontal: 0}]}
                      theme={inputTheme}
                      value={values.expiryDate}
                      onBlur={handleBlur('expiryDate')}
                      onChangeText={handleChange('expiryDate')}
                      keyboardType='number-pad'
                      error={touched.expiryDate && errors.expiryDate ? errors.expiryDate : null}
                    />
                    {
                      touched.expiryDate && errors.expiryDate &&
                      <Text style={Styles.textError}>{errors.expiryDate}</Text>
                    }
                  </View>

                  <View style={{flexDirection: 'column', flex: 0.49, paddingRight: 18}}>
                    <TextInput
                      mode='outlined'
                      placeholder={'CVC'}
                      placeholderTextColor={Res.Colors.Placeholder}
                      style={[Styles.shadows, styles.inputContainer, {paddingHorizontal: 0}]}
                      theme={inputTheme}
                      selectionColor='green'
                      value={values.CVV}
                      onBlur={handleBlur('CVV')}
                      onChangeText={handleChange('CVV')}
                      keyboardType='number-pad'
                      maxLength={3}
                      secureTextEntry
                      error={touched.CVV && errors.CVV ? errors.CVV : null}
                    />
                    {
                      touched.CVV && errors.CVV &&
                      <Text style={[Styles.textError, {}]}>{errors.CVV}</Text>
                    }
                  </View>
                </View>

                <View style={{alignItems: 'center', }}>
                  <Button
                    activeOpacity={Res.Bt_Active}
                    title={translations['bt.save']}
                    buttonStyle={[Styles.buttonStyle ,{marginTop: 25}]}
                    titleStyle={{fontSize: Res.Sizes.Header}}
                    containerStyle={{width: '65%'}}
                    onPress={() => handleSubmit()}
                  />
                </View>
              </KeyboardAwareScrollView>
            </>
          )
      }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 45, 
    fontSize: Res.Sizes.Body, 
    paddingHorizontal: 18
  },
  headerLabel: {
    fontSize: Res.Sizes.Title, 
    fontWeight: '700'
  },
  headerContent: {
    paddingTop: 25, 
    paddingBottom: 15,
    paddingHorizontal: 18
  },
  inputStyle: {
    fontSize: Res.Sizes.Body,
    color: Res.Colors.Black,
  },
  textLabel: {
    paddingLeft: 18,
    fontSize: Res.Sizes.Label,
    marginTop: moderateScale(15)
  },
  labelStyle: {
    fontSize: Res.Sizes.Subhead,
    color: '#FFF',
    marginBottom: 8,
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 25,
    textAlign: 'center',
    borderRadius: 7,
    paddingVertical: 12,
    backgroundColor: Res.Colors.BT_Sign_In,
  },

});

export default User;
