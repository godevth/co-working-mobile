import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {Styles} from '../../../styles/styles';
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../../../constants/scale';
import {Divider, Input} from 'react-native-elements';
import { Res } from '../../../constants/env';
import { Title, TagsView, ReviewForm, Comment } from '../../../components';
import { Dark, Standard } from '../../../utils/MapStyle';

const AVG_HEIGHT = Math.round((DEVICE_WIDTH * 9) / 16);
const listColor = ['rgba(255,255,255,0)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)'];
const selected = ['Swift', 'Kotlin'];
const tags = ['Swift', 'Kotlin'];

const ResultShowScreen = (props) => {
  const data = props.route.params;
  const { navigation } = props;
  const scrollA = useRef(new Animated.Value(0)).current;
  const isFloating = !!scrollA;
  const [rating, setRating] = useState(3.5);
  const [ratingComent, setRatingComment] = useState(0);
  const [isTransparent, setTransparent] = useState(isFloating);
  console.log('==> ',isFloating);

  useEffect(() => {
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
    return () => scrollA.removeListener(listenerId)
  })

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

  const _renderContent = () => {
    return (
      // <TouchableHighlight onPress={() => console.log('Select Package')}>
        <View style={{flex: 1, paddingHorizontal: 18}}>

          =================== Available Workspace ====================
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
            customMapStyle={Dark}
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
              coordinate={{
                latitude: 13.789775, 
                longitude: 100.515301,
              }}
              image={Res.Images.LocationMarker}
              title="Co-working Space Sbpds"
              description="This is the test description"
            />
          </MapView>
          {/* ============================================================ */}

          {/* ========================= Amenities ======================== */}
          {_renderContentHeader('Amenities')}
          <Text>Update with your health and safety in mind</Text>
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
          <Comment/>
          <Comment/>
          <Divider style={[Styles.devider, {marginTop: 20}]} />
          {/* ============================================================ */}

          {/* ========================== Review ========================== */}
          {_renderContentHeader('Write a review')}
          <Rating 
            imageSize={22} 
            startingValue={ratingComent}
            ratingCount={5} 
            ratingColor='#3498db'
            onFinishRating={rating => console.log('Click', rating)}
            ratingBackgroundColor='#c8c7c8' style={{alignItems: 'flex-start', width: 150, borderWidth: 0}}/>

            <View style={{alignItems: 'center'}}>
              <Input multiline/>
              <TouchableHighlight style={{width: 150, height: 50 ,backgroundColor: '#024D82', alignItems: 'center', justifyContent: 'center', borderRadius: 7}}>
                <Text style={{color: '#FFF'}}>Submit</Text>
              </TouchableHighlight>
            </View>
            
          {/* ============================================================ */}

        </View>
      // </TouchableHighlight>
    )
  }

  const _renderPackage = () => {
    return (
      <>
      <Divider style={[Styles.devider, {marginTop: '2%'}]} />
        <View style={styles.contentListStyle}>
            <View style={{flexDirection: 'row',}}>
              <Image source={Res.Images.Favorite} style={{width: 50, height: 50, marginRight: 20}} resizeMode={'contain'}/>
              <View>
                <Text style={{fontSize: Res.Sizes.Header, fontWeight: 'bold'}}>Private Desk</Text>
                <Text style={{color: '#999999'}}>Workspace and mentorship</Text>
                <Text style={{color: '#408ABF'}}>฿8,800.00/mo</Text>
              </View>
            </View>
            <Image source={Res.Images.Next} style={{width: 15, height: 15}} resizeMode={'contain'}/>
        </View>
      </>
    )
  }

  console.log(data);
  return (
    <>
      <View style={[Styles.container, {backgroundColor: '#FFF'}]}>
      {/* <KeyboardAwareScrollView  keyboardVerticalOffset={150} behavior={Platform.OS == 'ios' ? "position" : null}> */}
        {_renderNavigateBar(scrollA)}

        <Animated.ScrollView
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
          
        </Animated.ScrollView>
        {/* </KeyboardAwareScrollView> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 0,
    // bottom: 0,
    // position: 'absolute',
    height: 50,
    // top: '-10%',
    flex: 1,
    width: '100%',
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
});

export default ResultShowScreen;
