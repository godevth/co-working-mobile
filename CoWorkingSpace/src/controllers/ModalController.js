import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Loading, Modal } from '../components';
import { Res } from '../constants/env';
import {View, Text} from 'react';
import { ActivityIndicator } from 'react-native-paper';
import LottieView from 'lottie-react-native/src/js';
import { Styles } from '../styles/styles';

const initialState = {
  visible: false,
  title: 'Title',
  subTitle: 'Sub Title'
};

export const ModalContext = React.createContext();

export function ModalProvider(props) {
  const [modalState, setModalState] = useState(initialState);
  const [isload, setIsLoad] = useState(false);

  function toggleModal(title, subTitle) {
    console.log('Title : ', title);
    console.log('SubTitle : ', subTitle);
    setModalState({
      title,
      subTitle,
      visible: !modalState.visible,
    });
  }

  function toggleLoading(value) {
    setIsLoad(value)
  }

  return (
    <ModalContext.Provider value={{modalState, toggleModal, toggleLoading}}>
      <Modal
        modalVisible={modalState.visible}
        animationType={'fade'}
        // showImage
        // imagePath={Res.Images.Success}
        title={modalState.title}
        subTitle={modalState.subTitle}
        // showTitle
        // showSubTitle
        showCancel
        textCancel="Close"
        onCancel={() => toggleModal()}
        // textConfirm="Call"
        BGColor={{backgroundColor: '#00000044'}}
      />
      {isload ? <Loading/> : null}
      {props.children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
