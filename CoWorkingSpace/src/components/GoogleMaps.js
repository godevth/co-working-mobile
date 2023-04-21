import React, {useState, useEffect} from 'react';
import {Divider, Image} from 'react-native-elements';
import {Styles} from '../styles/styles';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {markers, currentLocation} from '../constants/demo';
import StarRating from '../components/StarRating';
import {CARD_WIDTH, SPACING_FOR_CARD_INSET} from '../constants/scale';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {Dark, Standard} from '../utils/MapStyle';
import { Res } from '../constants/env';

function Maps() {

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const initialMapState = {
    markers,
    currentLocation
  };

  const [mapState, setMapState] = useState(initialMapState);
  const [tracksViewChanges, setTracksViewChanges] = useState(true);
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  useEffect(() => {
    let timer1 = setTimeout(() => setTracksViewChanges(false), 1000);
    // setTracksViewChanges(true)
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= mapState.markers.length) {
        index = mapState.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = mapState.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: mapState.currentLocation.latitudeDelta,
              longitudeDelta: mapState.currentLocation.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });

    return () => {
        clearTimeout(timer1)
        mapAnimation.removeAllListeners() // Add Test Maps
    };
  });

  const interpolations = mapState.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;
    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    // _scrollView.current.getNode().scrollTo({x: x, y: 0, animated: true})
  }

  const _renderMap = () => {
    return (
      <>
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{...StyleSheet.absoluteFillObject}}
          customMapStyle={Standard}
          zoomEnabled={true}
          zoomTapEnabled={true}
          zoomControlEnabled={true}
          showsScale={true}
          showsUserLocation={true}
          // followUserLocation={true}
          // showsTraffic
          showsCompass={true}
          region={mapState.currentLocation}>
          {mapState.markers.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
            return (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                tracksViewChanges={tracksViewChanges}
                source={Res.Images.LocationMarker}
                title={marker.title}
                onPress={(e) => onMarkerPress(e)}>
              
                  {/* <Animated.View style={Styles.markerWrap}> */}
                    <Callout tooltip>
                      <View>
                        <Image source={marker.image} style={Styles.imageMaps}/>
                        <View style={Styles.contentMaps}>
                          <Text style={Styles.textHaderMaps} numberOfLines={1} ellipsizeMode='tail'>{marker.title}</Text>
                          <Text style={{fontSize: Res.Sizes.Caption_2, color: Res.Colors.BlueLine}} numberOfLines={1} ellipsizeMode='tail'>
                            {marker.description}
                          </Text>
                        </View>
                        <View style={Styles.arrowBorder}/>
                        <View style={Styles.arrow}/>
                      </View>
                      {/* <Animated.Image
                        source={require('../assets/Icon/pin.png')}
                        // ต้องเปิด tracksViewChanges : true
                        // style={[Styles.marker, scaleStyle]}
                        style={[Styles.marker]}
                        resizeMode="cover"
                      /> */}
                    </Callout>
                  {/* </Animated.View> */}
                  
              </Marker>
            );
          })}
        </MapView>
      </>
    );
  };

  return (
    <>
      <View style={{flex: 1, ...StyleSheet.absoluteFillObject, zIndex: -1}}>
        {_renderMap()}
      </View>
      {/* <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={Styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {mapState.markers.map((marker, index) => (
          <View key={index} style={Styles.card}>
            <Image
              source={marker.image}
              style={Styles.cardImage}
              resizeMode="cover"
            />
            <View style={Styles.textContent}>
              <Text numberOfLines={1} style={Styles.cardtitle}>
                {marker.title}
              </Text>
              <StarRating ratings={marker.rating} reviews={marker.reviews} />
              <Text numberOfLines={1} style={Styles.cardDescription}>
                {marker.description}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView> */}
    </>
  );
};
const GoogleMaps = React.memo(Maps)
export default GoogleMaps;
