import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import LinearGradient from 'react-native-linear-gradient';
import {List} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Styles} from '../../../styles/styles';
import {Res} from '../../../constants/env';
import {moderateScale} from '../../../constants/scale';
import {LocalizationContext} from '../../../Languages/translations';
import {Accordian, Modal, Package} from '../../../components';
import {Input, Button, CheckBox, Divider} from 'react-native-elements';

import {menu} from '../../../constants/demo';

const OrderDetails = (props) => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const {navigation} = props;
  const [isStep, setStep] = useState('order');
  const [code, setCode] = useState('');
  const [confirmTotal, setConfirmTotal] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [visible, setVisible] = useState(false);
  const [expandCC, setExpandCC] = useState(false);
  const [expandAP, setExpandAP] = useState(false);
  const [expandEW, setExpandEW] = useState(false);
  const [expandOB, setExpandOB] = useState(false);

  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  const _renderNavigateBar = () => {
    return (
      <View style={[Styles.container, styles.navigateBar, {borderWidth: 0}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableNativeFeedback onPress={() => navigation.goBack()}>
            <Image source={Res.Images.Arrow_Back} style={Styles.navbarIcon} />
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  };

  const _renderCover = () => {
    function switchName() {
      switch (isStep) {
        case 'invoice':
          return 'Payment';
        case 'payment':
          return 'Invoice';
        default:
          return 'Order Details';
      }
    }
    return (
      <View style={Styles.containerCover}>
        <Text style={{fontSize: Res.Sizes.Huge, fontWeight: 'bold'}}>
          {switchName()}
        </Text>
        { confirmPayment && (
          <Text
            style={{
              fontSize: Res.Sizes.Caption_2,
              color: Res.Colors.Placeholder,
            }}>
            We have sent this invoice to your email.
          </Text>
        )}
      </View>
    );
  };

  const Order = () => {
    return (
      <View style={[Styles.container, {marginHorizontal: 18}]}>
        <Text style={styles.headerContent}>Promo Code</Text>
        <View
          style={[
            Styles.shadows,
            {
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Res.Colors.White,
              borderRadius: 7,
              height: 50,
              marginBottom: 15,
            },
          ]}>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={'Search'}
            placeholderTextColor={Res.Colors.Placeholder}
            containerStyle={{flex: 1}}
            inputContainerStyle={[{borderWidth: 0, borderBottomWidth: 0}]}
            inputStyle={{fontSize: Res.Sizes.Body}}
            renderErrorMessage={false}
            value={code}
            maxLength={20}
            // Support Function
            // onChangeText={newTerm => onTermChange(newTerm)}
            // onEndEditing={() => onTermSubmit()}

            onChangeText={(values) => setCode(values)}
            // onEndEditing={onTermSubmit}
          />
          <Text
            style={{
              fontSize: Res.Sizes.Body,
              fontWeight: 'bold',
              marginRight: 10,
            }}>
            Apply
          </Text>
        </View>
        <View
          style={[
            styles.headerContent,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <View style={{flex: 1}}>
            <View style={styles.price}>
              <Text>Total</Text>
              <Text>฿8,800.00</Text>
            </View>
            <View style={styles.price}>
              <Text>Discount</Text>
              <Text>-฿0.00</Text>
            </View>
            <View style={styles.price}>
              <Text>Tax</Text>
              <Text>฿616.00</Text>
            </View>
            <View style={styles.price}>
              <Text>Total Payment</Text>
              <Text>฿9,416.00</Text>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            title="Next"
            buttonStyle={Styles.buttonStyle}
            titleStyle={{fontSize: Res.Sizes.Header}}
            containerStyle={{width: '65%'}}
            onPress={() => {
              setStep('account');
              setConfirmTotal(true);
            }}
          />
        </View>
      </View>
    );
  };

  const Account = () => {
    return (
      <View style={[Styles.container, {marginHorizontal: 18}]}>
        <Text style={styles.headerContent}>Create Account</Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <Text>Already a member? </Text>
          <TouchableNativeFeedback
            onPress={() => console.log('Click to login')}>
            <Text style={{textDecorationLine: 'underline'}}>Log In</Text>
          </TouchableNativeFeedback>
        </View>
        <Formik
          // enableReinitialize
          initialValues={{
            fullname: '',
            username: '',
            password: '',
            confirmPass: '',
            email: '',
            phone: '',
            term: false,
          }}
          onSubmit={(values) => {
            Alert.alert(JSON.stringify(values));
          }}
          validationSchema={yup.object().shape({
            fullname: yup.string().required(translations['validate.require']),
            username: yup.string().required(translations['validate.require']),
            password: yup.string().required(translations['validate.require']),
            confirmPass: yup
              .string()
              .required(translations['validate.require']),
            email: yup.string().required(translations['validate.require']),
            phone: yup.string().required(translations['validate.require']),
            term: yup.boolean().required(translations['validate.require']),
          })}>
          {(props) => (
            <>
              <View style={[{marginTop: 10}]}>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={'Full Name*'}
                  placeholderTextColor={Res.Colors.Placeholder}
                  containerStyle={{paddingHorizontal: 0, marginBottom: 10}}
                  inputContainerStyle={[
                    Styles.inputContainerStyle,
                    Styles.shadows,
                    {borderWidth: 0, height: 50, marginHorizontal: 0},
                  ]}
                  inputStyle={{fontSize: Res.Sizes.Body}}
                  onChangeText={props.handleChange('fullname')}
                  value={props.values.fullname}
                  errorStyle={{color: 'red'}}
                  errorMessage={props.errors.fullname}
                  renderErrorMessage={props.errors.fullname ? true : false}
                />
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={'Username'}
                  placeholderTextColor={Res.Colors.Placeholder}
                  containerStyle={{paddingHorizontal: 0, marginBottom: 10}}
                  inputContainerStyle={[
                    Styles.inputContainerStyle,
                    Styles.shadows,
                    {borderWidth: 0, height: 50, marginHorizontal: 0},
                  ]}
                  inputStyle={{fontSize: Res.Sizes.Body}}
                  onChangeText={props.handleChange('username')}
                  value={props.values.username}
                  errorStyle={{color: 'red'}}
                  errorMessage={props.errors.username}
                  renderErrorMessage={props.errors.username ? true : false}
                />
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={'Password'}
                  placeholderTextColor={Res.Colors.Placeholder}
                  containerStyle={{paddingHorizontal: 0, marginBottom: 10}}
                  inputContainerStyle={[
                    Styles.inputContainerStyle,
                    Styles.shadows,
                    {borderWidth: 0, height: 50, marginHorizontal: 0},
                  ]}
                  inputStyle={{fontSize: Res.Sizes.Body}}
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  errorStyle={{color: 'red'}}
                  errorMessage={props.errors.password}
                  renderErrorMessage={props.errors.password ? true : false}
                />
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={'Confirm Password'}
                  placeholderTextColor={Res.Colors.Placeholder}
                  containerStyle={{paddingHorizontal: 0, marginBottom: 10}}
                  inputContainerStyle={[
                    Styles.inputContainerStyle,
                    Styles.shadows,
                    {borderWidth: 0, height: 50, marginHorizontal: 0},
                  ]}
                  inputStyle={{fontSize: Res.Sizes.Body}}
                  onChangeText={props.handleChange('confirmPass')}
                  value={props.values.confirmPass}
                  errorStyle={{color: 'red'}}
                  errorMessage={props.errors.confirmPass}
                  renderErrorMessage={props.errors.confirmPass ? true : false}
                />
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={'Email'}
                  placeholderTextColor={Res.Colors.Placeholder}
                  containerStyle={{paddingHorizontal: 0, marginBottom: 10}}
                  inputContainerStyle={[
                    Styles.inputContainerStyle,
                    Styles.shadows,
                    {borderWidth: 0, height: 50, marginHorizontal: 0},
                  ]}
                  inputStyle={{fontSize: Res.Sizes.Body}}
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  keyboardType="email-address"
                  errorStyle={{color: 'red'}}
                  errorMessage={props.errors.email}
                  renderErrorMessage={props.errors.email ? true : false}
                />
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={'Phone'}
                  placeholderTextColor={Res.Colors.Placeholder}
                  containerStyle={{paddingHorizontal: 0, marginBottom: 10}}
                  inputContainerStyle={[
                    Styles.inputContainerStyle,
                    Styles.shadows,
                    {borderWidth: 0, height: 50, marginHorizontal: 0},
                  ]}
                  inputStyle={{fontSize: Res.Sizes.Body}}
                  onChangeText={props.handleChange('phone')}
                  value={props.values.phone}
                  keyboardType="number-pad"
                  errorStyle={{color: 'red'}}
                  errorMessage={props.errors.phone}
                  renderErrorMessage={props.errors.phone ? true : false}
                />
              </View>

              <View style={{marginVertical: 10}}>
                <Text>
                  Please accept the Terms and Conditions in order to continue
                </Text>
              </View>

              <CheckBox
                title="I accept the Terms and Conditions. You are entering into an agreement with COSPACE."
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                  padding: 0,
                  marginLeft: 0,
                  marginVertical: 15,
                }}
                textStyle={{
                  fontSize: Res.Sizes.Subhead,
                  color: Res.Colors.Black,
                  fontWeight: 'normal',
                }}
                checkedColor={Res.Colors.Black}
                checked={props.values.term}
                onPress={() => props.setFieldValue('term', !props.values.term)}
              />

              <View style={{alignItems: 'center'}}>
                <Button
                  title="Next"
                  buttonStyle={Styles.buttonStyle}
                  titleStyle={{fontSize: Res.Sizes.Header}}
                  containerStyle={{width: '65%'}}
                  // onPress={() => props.handleSubmit()}
                  onPress={() => setStep('payment')}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    );
  };

  const renderAccordians = () => {
    const items = [];
    for (item of menu) {
      items.push(<Accordian title={item.title} data={item.data} />);
    }
    return items;
  };

  function toggleExpand(type) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (type === 'CC') {
      setExpandCC(!expandCC);
      setExpandAP(false);
      setExpandEW(false);
      setExpandOB(false);
    } else if (type === 'AP') {
      setExpandAP(!expandAP);
      setExpandCC(false);
      setExpandEW(false);
      setExpandOB(false);
    } else if (type === 'EW') {
      setExpandEW(!expandEW);
      setExpandAP(false);
      setExpandCC(false);
      setExpandOB(false);
    } else if (type === 'OB') {
      setExpandOB(!expandOB);
      setExpandCC(false);
      setExpandAP(false);
      setExpandEW(false);
    } else {
      console.log('Not fonud type...')
    }
  }

  const Payment = () => {
    return (
      <View style={[Styles.container, {marginHorizontal: 18}]}>
        <Text style={[styles.headerContent, {fontWeight: 'bold'}]}>Payment Information</Text>

        {/* *********************** START Credit Card *********************** */}
        <Divider style={[Styles.devider, {marginVertical: '2%'}]} />
        <TouchableNativeFeedback onPress={() => toggleExpand('CC')}>
          <View
            style={{flexDirection: 'row', marginVertical: moderateScale(10)}}>
            <Text>Credit Card</Text>
          </View>
        </TouchableNativeFeedback>
        {expandCC && (
          <Formik
            // enableReinitialize
            initialValues={{
              cardHolder: '',
              cardNumber: '',
              cardPostal: '',
              expiryDate: '',
              CVC: '',
            }}
            onSubmit={(values) => {
              Alert.alert(JSON.stringify(values));
            }}
            validationSchema={yup.object().shape({
              cardHolder: yup
                .string()
                .required(translations['validate.require']),
              cardNumber: yup
                .number()
                .required(translations['validate.require']),
              cardPostal: yup
                .number()
                .required(translations['validate.require']),
              expiryDate: yup
                .string()
                .required(translations['validate.require']),
              CVC: yup.number().required(translations['validate.require']),
            })}>
            {(props) => (
              <>
                <View style={[{marginTop: 10}]}>
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={'Card Holder Name*'}
                    placeholderTextColor={Res.Colors.Placeholder}
                    containerStyle={{paddingHorizontal: 0, marginBottom: 10}}
                    inputContainerStyle={[
                      Styles.inputContainerStyle,
                      Styles.shadows,
                      {borderWidth: 0, height: 50, marginHorizontal: 0},
                    ]}
                    inputStyle={{fontSize: Res.Sizes.Body}}
                    onChangeText={props.handleChange('cardHolder')}
                    value={props.values.cardHolder}
                    errorStyle={{color: 'red'}}
                    errorMessage={props.errors.cardHolder}
                    renderErrorMessage={props.errors.cardHolder ? true : false}
                  />
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={'Card Number*'}
                    placeholderTextColor={Res.Colors.Placeholder}
                    containerStyle={{paddingHorizontal: 0, marginBottom: 10}}
                    inputContainerStyle={[
                      Styles.inputContainerStyle,
                      Styles.shadows,
                      {borderWidth: 0, height: 50, marginHorizontal: 0},
                    ]}
                    inputStyle={{fontSize: Res.Sizes.Body}}
                    onChangeText={props.handleChange('cardNumber')}
                    value={props.values.cardNumber}
                    keyboardType="number-pad"
                    errorStyle={{color: 'red'}}
                    errorMessage={props.errors.cardNumber}
                    renderErrorMessage={props.errors.cardNumber ? true : false}
                  />
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={'Card Postal Code*'}
                    placeholderTextColor={Res.Colors.Placeholder}
                    containerStyle={{paddingHorizontal: 0, marginBottom: 10}}
                    inputContainerStyle={[
                      Styles.inputContainerStyle,
                      Styles.shadows,
                      {borderWidth: 0, height: 50, marginHorizontal: 0},
                    ]}
                    inputStyle={{fontSize: Res.Sizes.Body}}
                    onChangeText={props.handleChange('cardPostal')}
                    value={props.values.cardPostal}
                    keyboardType="number-pad"
                    errorStyle={{color: 'red'}}
                    errorMessage={props.errors.cardPostal}
                    renderErrorMessage={props.errors.cardPostal ? true : false}
                  />
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder={'Expiry Date*'}
                      placeholderTextColor={Res.Colors.Placeholder}
                      containerStyle={{
                        paddingHorizontal: 0,
                        marginBottom: 10,
                        flex: 1,
                        marginRight: moderateScale(10),
                      }}
                      inputContainerStyle={[
                        Styles.inputContainerStyle,
                        Styles.shadows,
                        {borderWidth: 0, height: 50, marginHorizontal: 0},
                      ]}
                      inputStyle={{fontSize: Res.Sizes.Body}}
                      onChangeText={props.handleChange('expiryDate')}
                      value={props.values.expiryDate}
                      errorStyle={{color: 'red'}}
                      errorMessage={props.errors.expiryDate}
                      renderErrorMessage={
                        props.errors.expiryDate ? true : false
                      }
                    />
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder={'CVC*'}
                      placeholderTextColor={Res.Colors.Placeholder}
                      containerStyle={{
                        paddingHorizontal: 0,
                        marginBottom: 10,
                        flex: 1,
                      }}
                      inputContainerStyle={[
                        Styles.inputContainerStyle,
                        Styles.shadows,
                        {borderWidth: 0, height: 50, marginHorizontal: 0},
                      ]}
                      inputStyle={{fontSize: Res.Sizes.Body}}
                      onChangeText={props.handleChange('CVC')}
                      value={props.values.CVC}
                      maxLength={3}
                      keyboardType="number-pad"
                      errorStyle={{color: 'red'}}
                      errorMessage={props.errors.CVC}
                      renderErrorMessage={props.errors.CVC ? true : false}
                    />
                  </View>
                </View>

                <View style={{alignItems: 'center'}}>
                  <Button
                    title="Submit Payment"
                    buttonStyle={Styles.buttonStyle}
                    titleStyle={{fontSize: Res.Sizes.Header}}
                    containerStyle={{width: '65%'}}
                    // onPress={() => props.handleSubmit()}
                    onPress={() => {
                      setStep('invoice');
                      setConfirmPayment(true);
                    }}
                  />
                </View>
              </>
            )}
          </Formik>
        )}
        {/* ************************* END Credit Card *********************** */}

        {/* ************************** START AirPay ************************* */}
        <Divider style={[Styles.devider, {marginVertical: '2%'}]} />
        <TouchableNativeFeedback onPress={() => toggleExpand('AP')}>
          <View
            style={{flexDirection: 'row', marginVertical: moderateScale(10)}}>
            <Text>Airpay</Text>
          </View>
        </TouchableNativeFeedback>
        { expandAP && (
          <>
          <Text>Airpay</Text>
          </>
        )}
        {/* **************************** END AirPay ************************* */}

        {/* ************************** START E-Wallet *********************** */}
        <Divider style={[Styles.devider, {marginVertical: '2%'}]} />
        <TouchableNativeFeedback onPress={() => toggleExpand('EW')}>
          <View style={{flexDirection: 'row', marginVertical: moderateScale(10)}}>
            <Text>E-wallet</Text>
          </View>
        </TouchableNativeFeedback>
        { expandEW && (
          <>
          <Text>E-Wallet</Text>
          </>
        )}
        {/* *************************** END E-Wallet ************************* */}

        {/* ************************** START E-Wallet *********************** */}
        <Divider style={[Styles.devider, {marginVertical: '2%'}]} />
        <TouchableNativeFeedback onPress={() => toggleExpand('OB')}>
          <View style={{flexDirection: 'row', marginVertical: moderateScale(10)}}>
            <Text>Online Banking</Text>
          </View>
        </TouchableNativeFeedback>
        { expandOB && (
          <>
          <Text>Online Banking</Text>
          </>
        )}
        {/* *************************** END E-Wallet ************************* */}
        <Divider style={[Styles.devider, {marginVertical: '2%'}]} />

        {/* {renderAccordians()} */}

        {/* <Accordian
            title = {'5555'}
            data = {'444'}
          /> */}
      </View>
    );
  };

  const _renderStepForm = () => {
    switch (isStep) {
      case 'order':
        return Order();
      case 'account':
        return Account();
      case 'payment':
        return Payment();
      case 'invoice':
        return (
          <View style={{alignItems: 'center'}}>
            <Button
              title="Go to your booked place"
              buttonStyle={Styles.buttonStyle}
              titleStyle={{fontSize: Res.Sizes.Header}}
              containerStyle={{width: '65%'}}
              onPress={() => {
                Submit()
              }}
            />
          </View>
        )
      default:
        return null;
    }
  };

  function Submit() {
    setVisible(true)
    try {
      setTimeout(() => {
        setVisible(false)
        navigation.navigate('List')
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={[Styles.container, {backgroundColor: Res.Colors.White}]}>
      {_renderNavigateBar()}
      <Modal
          modalVisible={visible}
          animationType={'fade'}
          showImage
          imagePath={Res.Images.Success}
          title="Success"
          subTitle="Thank you for your booking."
          // showTitle
          // showSubTitle
          // textCancel="Cancel"
          // textConfirm="Call"
          BGColor={{backgroundColor: '#00000044'}}
        />
      <KeyboardAwareScrollView>
        {_renderCover()}
        <Package
          title={'Private Desk'}
          price={'8,800.00'}
          location={
            'Boonrwad Brewery 1003 Thanon Samsen, Thanon Nakhon Chai Si, Dusit District, Bangkok 10300'
          }
          capacity={'10'}
          dateStart={'July 13th,2020'}
          dateEnd={'July 17th,2020'}
        />
        {
          confirmTotal && (
            <View style={[Styles.shadows, {marginHorizontal: 18, marginBottom: 15}]}>
              <LinearGradient
                colors={Res.ColorsGradient.BlueToWhite}
                style={{flex: 1, borderRadius: 7}}>
                  <View style={styles.total}>
                    <Text style={{fontWeight: 'bold'}}>Total</Text>
                    <Text style={{fontWeight: 'bold'}}>฿ {'9,416.00'}</Text>
                  </View>
              </LinearGradient>
            </View>
          )
        }
        {
          confirmPayment && (
            <View style={[Styles.shadows, {marginHorizontal: 18, marginBottom: 20}]}>
              <LinearGradient
                colors={Res.ColorsGradient.BlueToWhite}
                style={{flex: 1, borderRadius: 7}}>
                  <View style={styles.total}>
                    <Text style={{fontWeight: 'bold'}}>Payment method</Text>
                    <Text style={{fontWeight: 'bold'}}>Mastercard *5678</Text>
                  </View>
              </LinearGradient>
            </View>
          )
        }
        {_renderStepForm()}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    marginBottom: 12,
    paddingTop: 40,
    fontSize: Res.Sizes.Header,
  },
  navigateBar: {
    flex: 1,
    height: 50,
    width: '100%',
    zIndex: 5,
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  total: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15
  }
});

export default OrderDetails;
