import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Image as RNImage, Modal, TouchableNativeFeedback} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ButtonGroup, Image, Overlay} from 'react-native-elements';
import {LocalizationContext} from '../../../Languages/translations';
import QRCode from 'react-native-qrcode-svg';
import {Styles} from '../../../styles/styles';
import {Res} from '../../../constants/env';
import {SVG_CheckIn, SVG_CheckOut} from '../../../assets/svg';
import Menu from '../../../components/MenuButton';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../../../constants/scale';
import {Package} from '../../../components';

const Booking = () => {
  const [selectedIndexPage, setSelectedIndexPage] = useState(0);
  const [selectedIndexCheck, setSelectedIndexCheck] = useState(0);
  const [numQrcode, setNumQrcode] = useState('874302284');
  const [visibleQrCode, setVisibleQrCode] = useState(false);
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  const updateIndexPage = (selectedIndexPage) => {
    setSelectedIndexPage(selectedIndexPage);
  };

  const updateIndexCheck = (selectedIndexCheck) => {
    setSelectedIndexCheck(selectedIndexCheck);
  };

  function toggleOverlay() {
    setVisibleQrCode(!visibleQrCode);
  }

  const _renderQrcodeModal = () => {
    console.log('Open');
    return (
      <Overlay
        isVisible={visibleQrCode}
        ModalComponent={Modal}
        onBackdropPress={toggleOverlay}
        overlayStyle={Styles.Modal}
        animationType={'slide'}>
        <View style={[styles.qrcode, {}]}>
          <TouchableNativeFeedback onPress={toggleOverlay}>
            <View style={{position: 'absolute',width: 40, height: 40, right: 0, top: -50, justifyContent: 'center'}}>
              <RNImage 
                source={Res.Images.Close}
                style={{width: 23, height: 23, resizeMode: 'contain', tintColor: Res.Colors.White}}/>
            </View>
          </TouchableNativeFeedback>
          <QRCode
            value={numQrcode ? numQrcode : 'NA'}
            ecl="H"
            size={DEVICE_WIDTH * 0.7}
            //Color of the QR Code (Optional)
            color={Res.Colors.Black}
            //Background Color of the QR Code (Optional)
            backgroundColor={Res.Colors.White}
          />
          <View style={{marginTop: 25, alignItems: 'center'}}>
            <Text style={{fontSize: Res.Sizes.Header, fontWeight: 'bold', marginBottom: 5}}>{numQrcode}</Text>
            <Text style={{fontSize: Res.Sizes.Body}}>For entering buildings.</Text>
          </View>
        </View>
      </Overlay>
    );
  };

  const _renderButtonPageGroup = () => {
    const buttons = [translations['bt.my.pass'], translations['bt.up.coming']];
    return (
      <View style={styles.select}>
        <ButtonGroup
          // disabled={true}
          onPress={updateIndexPage}
          selectedIndex={selectedIndexPage}
          buttons={buttons}
          textStyle={{color: Res.Colors.White, fontSize: Res.Sizes.Body}}
          containerStyle={{
            marginHorizontal: 18,
            borderRadius: 7,
            backgroundColor: Res.Colors.Gray,
          }}
          selectedButtonStyle={{backgroundColor: Res.Colors.Black}}
          innerBorderStyle={{borderWidth: 0}}
          activeOpacity={Res.Bt_Active}
        />
      </View>
    );
  };

  const _renderImageCover = () => {
    const path = Res.Images.BackgroundTest;
    return <RNImage source={path} style={styles.imageView} />;
  };

  const _renderCheckInAndOut = () => {
    const component1 = () => (
      <>
        <SVG_CheckIn/>
        <Text style={{color: Res.Colors.White, marginTop: 10}}>
          {translations['bt.check.in']}
        </Text>
      </>
    );
    const component2 = () => (
      <>
        <SVG_CheckOut/>
        <Text style={{color: Res.Colors.White, marginTop: 10}}>
          {translations['bt.check.out']}
        </Text>
      </>
    );

    const buttons = [{element: component1}, {element: component2}];
    // const buttons = ['Check In', 'Check Out'];
    return (
      <View style={styles.select}>
        <ButtonGroup
          // disabled={true}
          buttons={buttons}
          onPress={updateIndexCheck}
          selectedIndex={selectedIndexCheck}
          textStyle={{color: Res.Colors.White, fontSize: Res.Sizes.Body}}
          containerStyle={{
            marginHorizontal: 18,
            height: 104,
            borderRadius: 7,
            backgroundColor: '#C4C4C4',
          }}
          selectedButtonStyle={{
            backgroundColor:
              selectedIndexCheck == 0
                ? Res.Colors.Check_In
                : Res.Colors.Check_Out,
          }}
          innerBorderStyle={{borderWidth: 0}}
          activeOpacity={0.8}
        />
      </View>
    );
  };

  const _renderUpcoming = () => {
    const MockUp = [
      {id: 1, name: 'Sun Tower'},
      {id: 2, name: 'Singha Complex'},
    ];
    const _renderItem = ({item, index}) => (
      <View style={{padding: 10, marginBottom: 10}} key={item.id}>
        <Text style={{marginBottom: 10}}>{item.name}</Text>
        <Image
          source={Res.Images.BackgroundTest}
          resizeMode="center"
          style={{
            height: Math.round((DEVICE_WIDTH * 9) / 30),
            width: DEVICE_WIDTH,
          }}
        />
        <Text style={{marginTop: '2%'}}>20 Jul 2020 - 24 Jul 2020</Text>
      </View>
    );
    return (
      <FlatList
        data={MockUp}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const BUTTON_LIST = [
    {
      // page: 'Menu',
      label: translations['bt.qrcode'],
      sourceImg: Res.Images.QRcode,
      onPress: toggleOverlay,
    },
    {
      // page: 'Promotion',
      label: translations['bt.reserved'],
      sourceImg: Res.Images.Bell,
    },
    {
      // page: 'Gift',
      label: translations['bt.locker'],
      sourceImg: Res.Images.Locker,
    },
    {
      // page: 'History',
      label: translations['bt.monitoring'],
      sourceImg: Res.Images.Monitor,
    },
    {
      // page: 'History',
      label: translations['bt.light'],
      sourceImg: Res.Images.Light,
    },
    {
      // page: 'History',
      label: translations['bt.mail.package'],
      sourceImg: Res.Images.Mail,
    },
    {
      // page: 'History',
      label: translations['bt.extra.need'],
      sourceImg: Res.Images.Request,
    },
    {
      // page: 'History',
      label: translations['bt.contact'],
      sourceImg: Res.Images.Contact,
    },
  ];
  const numColumns = Res.NumberColumns;

  const _renderHeader = () => {
    return (
      <>
        {_renderImageCover()}
        {_renderCheckInAndOut()}
      </>
    );
  };

  const _renderPackage = () => {
    return (
      <Package
        title={'Private Desk'}
        price={'8,800.00'}
        location={
          'Boonrwad Brewery 1003 Thanon Samsen, Thanon Nakhon Chai Si, Dusit District, Bangkok 10300'
        }
        capacity={'10'}
        dateStart={'July 13th,2020'}
        dateEnd={'July 17th,2020'}
        showButton
      />
    );
  };

  return (
    <View style={[Styles.container, {backgroundColor: Res.Colors.White}]}>
      {_renderButtonPageGroup()}
      {selectedIndexPage == 0 ? (
        <>
          {_renderQrcodeModal()}
          <Menu
            renderHeader={_renderHeader}
            renderButton={_renderPackage}
            columnWrapperStyle={{
              marginHorizontal: 18,
              justifyContent: 'space-between',
            }}
            buttonList={BUTTON_LIST}
            numColumns={numColumns}
          />
        </>
      ) : (
        <View style={{flex: 1}}>{_renderUpcoming()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    marginVertical: '3%',
  },
  imageView: {
    width: DEVICE_WIDTH,
    height: Math.round((DEVICE_WIDTH * 9) / 16),
  },
  qrcode: {
    backgroundColor: Res.Colors.White, 
    padding: 25,
    borderRadius: 7
  }
});

export default Booking;
