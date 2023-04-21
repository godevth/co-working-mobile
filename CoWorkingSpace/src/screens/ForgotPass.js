import React, {useState, useContext} from 'react';
import {View, Alert, StyleSheet, Image} from 'react-native';
import {Input, Button, CheckBox} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import * as yup from 'yup';
import {LocalizationContext} from '../Languages/translations';
import {ImgBackground, Modal} from '../components';
import {Styles} from '../styles/styles';
import {Res} from '../constants/env';
import handleForgotPassword from '../api/handleForgotPassword';

const ForgotPass = (props) => {
  const {navigation} = props;
  const [state, setState] = useState({
    email: '',
  });
  const [forgotPassword] = handleForgotPassword();
  const [visible, setVisible] = useState(false);
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  function Submit(value) {
    // setVisible(true)
    // try {
    //   setTimeout(() => {
    //     setVisible(false)
    //     // navigation.navigate('List')
    //   }, 1000);
    // } catch (e) {
    //   console.log(e);
    // }
    console.log(value);
    const data = { Email: value.email }
    forgotPassword(data)
  }

  return (
    <View style={[Styles.container, Styles.center]}>
      <ImgBackground colorsGradient={Res.ColorsGradient.BlackToTransparent}>
        <Modal
          modalVisible={visible}
          animationType={'fade'}
          showImage
          imagePath={Res.Images.Success}
          title="Success"
          subTitle="Please check your email."
          BGColor={{backgroundColor: '#00000044'}}
        />
        <View style={Styles.containerCover}>
          <Image source={Res.Images.MainLogo} style={styles.logo} />
        </View>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <Formik
            // enableReinitialize
            initialValues={{email: ''}}
            onSubmit={(values, actions) => {
              // Alert.alert(JSON.stringify(values))
              actions.resetForm();
              Submit(values);
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email(translations['validate.email'])
                .required(translations['validate.require']),
            })}>
            {(props) => (
              <View style={{marginHorizontal: 8}}>
                <Input
                  // label={'Email'}
                  labelStyle={styles.labelStyle}
                  placeholder={'Email'}
                  placeholderTextColor={Res.Colors.Placeholder}
                  containerStyle={{}}
                  inputStyle={Styles.inputStyle}
                  inputContainerStyle={[
                    Styles.inputContainerStyle,
                    {borderWidth: 0},
                  ]}
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  errorStyle={{color: 'red'}}
                  errorMessage={props.errors.email}
                />
                <View style={{alignItems: 'center'}}>
                  <Button
                    title={translations['bt.submit']}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{fontSize: Res.Sizes.Header}}
                    containerStyle={{width: '65%'}}
                    // onPress={() => { Submit() }}
                    onPress={() => props.handleSubmit()}
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
  logo: {
    width: 150,
    height: undefined,
    resizeMode: 'contain',
    paddingVertical: 20,
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
    backgroundColor: '#000',
  },
});

export default ForgotPass;
