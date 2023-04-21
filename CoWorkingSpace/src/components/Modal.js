import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal as RNModal,
} from 'react-native';
import {Res} from '../constants/env';
import {Styles} from '../styles/styles';
import {moderateScale} from '../constants/scale';
import Text from './Text';
import PropTypes from 'prop-types';

function Modal({
  modalVisible,
  animationType,
  showImage,
  imagePath,
  title,
  subTitle,
  titleStyle,
  subTitleStyle,
  onConfirm,
  onCancel,
  onClose,
  textConfirm,
  textCancel,
  showTitle,
  showSubTitle,
  showCancel,
  showConfirm,
  BGColor,
}) {
    
  return (
    <RNModal
      animationType={animationType}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onClose()}>
      <View style={[styles.centeredView, BGColor]}>
        <View style={[styles.modalStyle, Styles.Shadow]}>
          {showImage ? (
            <View style={{paddingTop: moderateScale(15)}}>
              <Image source={imagePath} style={styles.logoStyle} />
            </View>
          ) : null}
          <View style={{alignItems: 'center'}}>
            {showTitle ? (
              <Text
                bold
                color={Res.Colors.White}
                size={Res.Sizes.Body}
                style={[
                    styles.textHeadContent, titleStyle, 
                    showSubTitle 
                        ? {paddingBottom: moderateScale(10)} 
                        : {paddingBottom: moderateScale(20)}
                ]}>
                {title}
              </Text>
            ) : null}
            {showSubTitle ? (
              <Text
                regular
                color={Res.Colors.White}
                size={Res.Sizes.Body}
                style={[styles.textSubContent, subTitleStyle]}>
                {subTitle}
              </Text>
            ) : null}
          </View>

          {showConfirm || showCancel ? (
            <View style={styles.containerEvent}>
              {/* Button cancel */}
              {showCancel ? (
                <TouchableOpacity
                  onPress={() => onCancel()}
                  activeOpacity={Res.Bt_Active}
                  style={[
                    styles.button,
                    {
                      backgroundColor: Res.Colors.Placeholder,
                      borderBottomLeftRadius: 7,
                      borderBottomRightRadius: showConfirm ? 0 : 7,
                    },
                  ]}>
                  <Text
                    bold
                    color={Res.Colors.White}
                    size={Res.Sizes.Subhead}
                    style={styles.textButton}>
                    {textCancel ? textCancel : 'No'}
                  </Text>
                </TouchableOpacity>
              ) : null}

              {/* Button confirm */}
              {showConfirm ? (
                <TouchableOpacity
                  onPress={() => onConfirm()}
                  activeOpacity={Res.Bt_Active}
                  style={[
                    styles.button,
                    {
                      backgroundColor: Res.Colors.Main,
                      borderBottomLeftRadius: showCancel ? 0 : 7,
                      borderBottomRightRadius: 7,
                    },
                  ]}>
                  <Text
                    bold
                    color={Res.Colors.White}
                    size={Res.Sizes.Subhead}
                    style={styles.textButton}>
                    {textConfirm ? textConfirm : 'Yes'}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#00000044'
  },
  modalStyle: {
    borderRadius: 7,
    borderWidth: 0,
    width: moderateScale(300),
    // minHeight: moderateScale(200),
    alignItems: 'center',
    backgroundColor: Res.Colors.BlueLine,
    // // paddingHorizontal: moderateScale(15)
  },
  containerEvent: {
    //   borderWidth: 1,
    bottom: -1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    borderWidth: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {},
  textHeadContent: {
    // borderWidth: 1,
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    color: Res.Colors.White,
    fontSize: Res.Sizes.Headline
  },
  textSubContent: {
    // borderWidth: 1,
    paddingBottom: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    color: Res.Colors.White,
    fontSize: Res.Sizes.Body
  },
  logoStyle: {
    // borderWidth: 1,
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'contain',
  },
});

Modal.defaultProps = {
  modalVisible: true,
  animationType: 'none',
  imagePath: Res.Images.Alert,
  onConfirm: () => {},
  onCancel: () => {},
  onClose: () => {},
  textConfirm: 'Yes',
  textCancel: 'No',
  title: 'Header Content',
  subTitle: 'Sub title',
  showTitle: true,
  showSubTitle: true,
};

Modal.propTypes = {
  modalVisible: PropTypes.bool,
  animationType: PropTypes.string,
  imagePath: PropTypes.number,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  textConfirm: PropTypes.string,
  textCancel: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  showTitle: PropTypes.bool,
  showSubTitle: PropTypes.bool,
  showCancel: PropTypes.bool,
  showConfirm: PropTypes.bool,
  BGColor: PropTypes.object,
  titleStyle: PropTypes.object,
  subTitleStyle: PropTypes.object,
};

export default Modal;
