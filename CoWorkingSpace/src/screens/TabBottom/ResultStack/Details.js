import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableHighlight,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import {Divider, Input} from 'react-native-elements';
import { Title, TagsView, ReviewForm, Review } from '../../../components';
import { Dark, Standard } from '../../../utils/MapStyle';
import Menu from '../../../components/MenuButton';
import {Styles} from '../../../styles/styles';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../../../constants/scale';
import { Res } from '../../../constants/env';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;
const AVG_HEIGHT = Math.round((DEVICE_WIDTH * 9) / 16);
const listColor = ['rgba(255,255,255,0)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)'];
const selected = ['Swift', 'Kotlin'];
const tags = ['Swift', 'Kotlin'];
const BUTTON_LIST = [
  {
    // page: 'Menu',
    label: 'Wellness Room',
    sourceImg: Res.Images.QRcode,
  },
  {
    // page: 'Promotion',
    label: 'Bike Storage',
    sourceImg: Res.Images.Bell,
  },
  {
    // page: 'Gift',
    label: 'Food Hall',
    sourceImg: Res.Images.Locker,
  },
  {
    // page: 'History',
    label: 'Fitness Center',
    sourceImg: Res.Images.Monitor,
  },
  {
    // page: 'History',
    label: 'Shower Room',
    sourceImg: Res.Images.Light,
  },
  {
    // page: 'History',
    label: 'Games',
    sourceImg: Res.Images.Mail,
  },
];
const numColumns = Res.NumberColumns;

const Details = (props) => {
  const data = props.route.params;
  const { navigation } = props;
  const navTitleView = useRef(null);
  const scrollA = useRef(new Animated.Value(0)).current;
  const isFloating = !!scrollA;

  const [isLoading, setIsLoading] = useState(true);
  const [tracksViewChanges, setTracksViewChanges] = useState(true);
  const [rating, setRating] = useState(3.5);
  const [isTransparent, setTransparent] = useState(isFloating);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    {detail: 'Great Place!', auth: 'Same', rating: 4, key: 1},
    {detail: 'Great Full!', auth: 'Kom', rating: 5, key: 2}
  ])
  // console.log('==> ',isFloating);
  console.log('Track ==> ', tracksViewChanges)

  const addReview = (review) => {
    review.key = Math.random().toString();
    setReviews((currentReviews) => {
      return [review, ...currentReviews];
    })
    setModalOpen(false)
  }

  useEffect(() => {
    setIsLoading(false)
    let timer1 = setTimeout(() => setTracksViewChanges(false), 1000)
    if(!scrollA) {
      return;
    } 
    const listenerId = scrollA.addListener(a => {
      const topNaviOffset = AVG_HEIGHT - 50;
      isTransparent !== (a.value < topNaviOffset) && setTransparent(!isTransparent);
      // if(isTransparent && a.value > topNaviOffset) {
      //   setTransparent(false)
      // } else if (!isTransparent && a.value < topNaviOffset) {
      //   setTransparent(true)
      // }
    })
    return () => {
      scrollA.removeListener(listenerId),
      clearTimeout(timer1)
    };
  }, [])

  const _renderNavigateBar = () => {
    if (!isTransparent) return null;
    return (
      <Animated.View style={styles.navigateBar(isFloating, isTransparent, scrollA)}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            // borderWidth: 4,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableHighlight onPress={() => navigation.goBack()}>
              <Image source={Res.Images.Arrow_Back} style={styles.icon}/>
            </TouchableHighlight>
            <Text style={{marginLeft: 10, fontSize: Res.Sizes.Header}}>Search</Text>
          </View>
          <View style={{ alignItems: 'center'}}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Image source={Res.Images.Share} style={[styles.icon]}/>
              <Image source={Res.Images.Favorite} style={[styles.icon, {marginLeft: 15}]}/>
              <Image source={Res.Images.Chat} style={[styles.icon, {marginLeft: 15}]}/>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  const _renderImageCover = (scrollA) => {
    console.log(scrollA);
    return <Animated.Image source={Res.Images.BackgroundTest_2} style={styles.imageView(scrollA)} />
  };

  const _renderHeader = () => {
    return (
      <>
        <LinearGradient
            colors={listColor}
            style={[styles.linearGradient, {borderWidth: 0, zIndex: 2,}]}/>
        <View
          style={{
            flex: 1,
            paddingTop: 40,
            paddingHorizontal: 18,
          }}>
          <Text style={{fontSize: Res.Sizes.Caption_2}}>Data : {data.id}</Text>
          <Title 
            title={'Boonrawd Brewery'} 
            subtitle={'1003 Thanon Samsen, Thanon Nakhon Chai Si, Dusit District, Bangkok 10300'}
          />
        </View>
      </>
    );
  };

  const _renderContentHeader = (title) => {
    return (
      <Text style={styles.headerContent}>{title}</Text>
    )
  }

  const _renderPackage = (props) => {
    // const { available } = props;
    const available = true;
    return (
      <>
      <Divider style={[Styles.devider, {marginTop: '2%'}]} />
        <TouchableNativeFeedback onPress={() => navigation.navigate('OrderDetails')}>
        <View style={styles.contentListStyle}>
            <View style={{flexDirection: 'row',}}>
              <Image source={Res.Images.Favorite} style={{width: 50, height: 50, marginRight: 20}} resizeMode={'contain'}/>
              <View>
                <Text style={{fontSize: Res.Sizes.Header, fontWeight: 'bold'}}>Private Desk</Text>
                <Text style={{color: Res.Colors.Detail}}>Workspace and mentorship</Text>
                { available ? 
                  <Text style={{color: available == true? Res.Colors.Available : Res.Colors.Unavailable}}>฿8,800.00/mo</Text>
                  :
                  <Text style={{color: Res.Colors.Unavailable}}>Unavailable</Text>
                }
              </View>
            </View>
            <Image source={Res.Images.Next} style={{width: 15, height: 15}} resizeMode={'contain'}/>
        </View>
        </TouchableNativeFeedback>
      </>
    )
  }

  const _renderContent = () => {
    return (
        <View style={{flex: 1, paddingHorizontal: 18}}>

          {/* =================== Available Workspace ==================== */}
          {_renderContentHeader('Available Workspace')}
          <TagsView all={tags} selected={selected} isExclusive={false} />
          {_renderPackage()}
          {_renderPackage()}
          {_renderPackage()}
          <Divider style={[Styles.devider, {marginTop: '2%'}]} />
          {/* ============================================================ */}

          {/* ========================= Location ========================= */}
          {_renderContentHeader('Location')}
          <Text>1003 Thanon Samsen, Thanon Nakhon Chai Si, Dusit District, Bangkok 10300</Text>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{width: '100%', height: 160, marginTop: 20, borderRadius: 7}}
            customMapStyle={Standard}
            zoomEnabled={true}
            //  showsUserLocation
            followUserLocation={true}
            showsTraffic
            showsCompass
            region={{
              latitude: 13.789775, 
              longitude: 100.515301,
              latitudeDelta: 0.010,
              longitudeDelta: 0.001,
            }}
          >
            <Marker
              key={'1'}
              tracksViewChanges={tracksViewChanges}
              coordinate={{
                latitude: 13.789775, 
                longitude: 100.515301,
              }}
              style={{}}
              // image={Res.Images.LocationMarker}
              title="Co-working Space Sbpds"
              description="This is the test description"
            >
              <Image 
                style={Styles.markerMedium}
                source={Res.Images.LocationMarker}/>
            </Marker>
          </MapView>
          <Text style={{marginTop: 10}}>Nearby Transit</Text>
          <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <Image source={Res.Images.Bus} style={[Styles.footerIcon, {marginRight: 10}]}/>
            <Text>Bus No. 66</Text>
          </View>
          {/* ============================================================ */}

          {/* ========================= Amenities ======================== */}
          {_renderContentHeader('Amenities')}
          <Text>Update with your health and safety in mind</Text>
          <Menu
            // renderHeader={_renderHeader}
            // renderButton={_renderRecommend}
            containerStyle={{marginTop: 10}}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 5}}
            buttonList={BUTTON_LIST}
            numColumns={numColumns}
          />
          <TouchableNativeFeedback onPress={() => console.log('Click')}>
            <Text style={{textAlign: 'center', paddingVertical: 10, textDecorationLine: 'underline'}}>View all amenities</Text>
          </TouchableNativeFeedback>
          {/* ============================================================ */}

          {/* ========================= Amenities ======================== */}
          {_renderContentHeader('Workspace Profile')}
          <Text>Lorem Ipsum is simply dummy text of the 
            printing and typesetting industry. Lorem 
            Ipsum has been the industry’s standard 
            dummy text ever since the 1500s, when an 
            unknown printer took a galley of type and 
            scrambled it to make a type specimen 
            book. It has survived not only five 
            centuries, but also the leap into electronic 
            typesetting, remaining essentially 
            unchanged. It was popularised in the 1960s 
            with the release of Letraset sheets 
            containing Lorem Ipsum passages, and 
            more recently with desktop publishing 
            software like Aldus PageMaker including 
            versions of Lorem Ipsum.
          </Text>
          {/* ============================================================ */}

          {/* ========================== Review ========================== */}
          {_renderContentHeader('Review')}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Rating 
              imageSize={22} 
              readonly 
              startingValue={rating}
              ratingCount={5} 
              ratingColor='#3498db'
              onFinishRating={rating => console.log('Click', rating)}
              ratingBackgroundColor='#c8c7c8' style={{alignItems: 'flex-start', width: 150, borderWidth: 0}}/>
            <Text style={{fontWeight: 'bold'}}>{rating}</Text>
          </View>
          {/* <Comment/>
          <Comment/> */}
          {/* <FlatList data={reviews} renderItem={({ item }) => (
            <Comment item={item}/>
          )} /> */}
          {reviews.map((item) => {
            return (<View key={item.key.toString()}><Review item={item}/></View>)
          })}
          <Divider style={[Styles.devider, {marginTop: 20}]} />
          {/* ============================================================ */}

          {/* ======================= Write Review ======================= */}
          {_renderContentHeader('Write a review')}
          {/* <Rating 
            imageSize={22} 
            startingValue={ratingComent}
            ratingCount={5} 
            ratingColor='#3498db'
            onFinishRating={rating => console.log('Click', rating)}
            ratingBackgroundColor='#c8c7c8' style={{alignItems: 'flex-start', width: 150, borderWidth: 0}}/> */}
            <TouchableHighlight
                onPress={() => setModalOpen(true)}
                style={styles.buttonStyle}>
                <Text style={{color: '#FFF'}}>Comment</Text>
            </TouchableHighlight>
            <Modal visible={modalOpen} animationType={'slide'}>
              <ReviewForm addReview={addReview} closeModal={setModalOpen}/>
            </Modal>
          {/* ============================================================ */}

        </View>
    )
  }

  const _renderFooter = () => {
    return (
      <View style={Styles.footerContainer}>
        <Image source={Res.Images.F_Facebook} style={Styles.footerIcon}/>
        <Image source={Res.Images.F_Instagram} style={Styles.footerIcon}/>
        <Image source={Res.Images.F_Linkedin} style={Styles.footerIcon}/>
        <Image source={Res.Images.F_Twitter} style={Styles.footerIcon}/>
      </View>
    )
  }

  console.log(data);
  // if (isLoading) return (<View style={{flex: 1}}><Text>Loading</Text></View>)
  return (
    <>
      <View style={[Styles.container, {backgroundColor: Res.Colors.Black}]}>
        {/* {_renderNavigateBar(scrollA)} */}
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT-100}
          minHeight={0}
          maxOverlayOpacity={0.7}
          minOverlayOpacity={0.1}
          renderHeader={() => (
            <Image source={Res.Images.BackgroundTest_2} style={styles.image}/>
            )}
          
          renderForeground={() => (
            _renderNavigateBar(scrollA)
          )}
          renderFixedForeground={() => (
            <Animatable.View ref={navTitleView} style={styles.navTitleView}>
              {/* <Text style={styles.navTitle}>Boonrawd</Text> */}
            </Animatable.View>
          )}
        >
          <TriggeringView 
            onHide={() => navTitleView.current.fadeInUp(200)}
            onDisplay={() => navTitleView.current.fadeOut(100)}
          >
              {_renderHeader()}
              {_renderContent()}
              {_renderFooter()}
          </TriggeringView>
        </HeaderImageScrollView>

        {/* <Animated.ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollA}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}>
            
          {_renderImageCover(scrollA)}
          <LinearGradient
            colors={listColor}
            style={styles.linearGradient}/>
          <View style={{backgroundColor: '#FFFFFF', borderWidth: 0}}>
            {_renderHeader()}
            {_renderContent()}
          </View>
          
        </Animated.ScrollView> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover'
  },
  navigateBar: (isFloating, isTransparent, scrollA) => ({
    flex: 1,
    // height: isTransparent ? 50 : 0,
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-AVG_HEIGHT, 0, AVG_HEIGHT, AVG_HEIGHT + 1],
          outputRange: [
            40,0,-60,-100
          ],
        }),
      },
    ],
    height: 50,
    // borderWidth: 2,
    // borderColor: 'red',
    width: '100%',
    zIndex: 5,
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: 18,
  }),
  imageView: (scrollA) => ({
    width: DEVICE_WIDTH,
    height: AVG_HEIGHT,
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-AVG_HEIGHT, 0, AVG_HEIGHT, AVG_HEIGHT + 1],
          outputRange: [
            -AVG_HEIGHT / 2,
            0,
            AVG_HEIGHT * 0.75,
            AVG_HEIGHT * 0.75,
          ],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-AVG_HEIGHT, 0, AVG_HEIGHT, AVG_HEIGHT + 1],
          outputRange: [1.5,1.5,1,1],
          // outputRange: [2, 1, 0.5, 0.5]
        }),
      },
    ],
  }),
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  linearGradient: {
    // ...StyleSheet.absoluteFillObject,
    // bottom: 0,
    // borderWidth: 4,
    position: 'absolute',
    height: 50,
    top: -50,
    flex: 1,
    width: '100%',
    // height: undefined,
    paddingLeft: 15,
    paddingRight: 15,
    // borderTopLeftRadius: 20,
  },
  headerContent: {
    marginBottom: 12,
    paddingTop: 40,
    fontSize: Res.Sizes.Header
  },
  contentListStyle: {
    borderWidth: 0, 
    paddingHorizontal: '3%', 
    paddingVertical: '3%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
    zIndex: 10
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    width: 150,
    height: 50,
    backgroundColor: '#024D82',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 20,
  },
});

export default Details;
