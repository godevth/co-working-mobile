import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  Animated
} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {Styles} from '../../styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import {SearchBar, ResultList, TagsView} from '../../components';
import {LocalizationContext} from '../../Languages/translations';
import yelp from '../../api/yelp';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {Dark, Standard} from '../../utils/MapStyle';
import {markers} from '../../constants/mapData';

const {width, height} = Dimensions.get('window');

const List = () => {
  const initialMapState = {
    markers,
    region: {
      latitude: 13.789775,
      longitude: 100.515301,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }
  }
  const [mapState, setMapState] = useState(initialMapState);
  const [list, setList] = useState([{id: 1}]);
  const [term, setTerm] = useState('');
  const [workingSpace, setWorkingSpace] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [listPage, setListPage] = useState(true);
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  useEffect(() => {
    searchWorkingSpace('Pasta');
  }, []);
  //  ^  ถ้าหากส่ง argument ไปด้วยจะทำงานแค่ครั้งเดียวเหมือย componnetDidmount

  const toggleSwitchPage = () => {
    setListPage(!listPage);
  };

  const searchWorkingSpace = async (searchTerm) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'new york',
        },
      });
      setWorkingSpace(response.data.businesses);
    } catch (err) {
      setErrorMessage('Error Something' + err);
    }
  };

  const filterResultByPrice = (price) => {
    const results = workingSpace;
    return results.filter((result) => {
      return result.price === price;
    });
  };

  const _renderListLocation = () => {
    return (
      <>
        <ResultList
          horizontal={true}
          title={translations['title.recommend']}
          results={filterResultByPrice('$')}
        />
        <ResultList
          horizontal={true}
          title={translations['title.nearby']}
          results={filterResultByPrice('$$')}
        />
        <ResultList
          horizontal={true}
          title={translations['title.promotion']}
          results={filterResultByPrice('$$$')}
        />
        <ResultList
          horizontal={false}
          title={translations['title.result']}
          results={filterResultByPrice('$$')}
        />
      </>
    );
  };
  console.log('Google Maps ==> ', PROVIDER_GOOGLE);

  const _renderMap = () => {
    return (
      <>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{...StyleSheet.absoluteFillObject}}
          customMapStyle={Standard}
          // zoomEnabled={true}
          //  showsUserLocation
          // followUserLocation={true}
          // showsTraffic
          // showsCompass
          region={mapState.region}>
            {mapState.markers.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  // tracksViewChanges={false}
                >
                  <Animated.View style={Styles.markerWrap}>
                    <Animated.Image
                      source={require('../../assets/Icon/pin.png')}
                      style={Styles.marker}
                      resizeMode='cover'
                    />
                  </Animated.View>
                </Marker>
              );
            })}
        </MapView>
      </>
    );
  };

  const selected = ['4', '13/07-17/07'];
  const tags = ['4', '13/07-17/07', 'C#', 'Haskell', 'Java'];
  console.log(term);
  console.log(listPage);
  // console.log('Result >> ', this.state.workingSpace);
  return (
    <View style={[Styles.container, Styles.center]}>
      <ImageBackground
        source={require('../../assets/workingSpace.jpg')}
        style={{flex: 1, width: '100%'}}>
        <LinearGradient
          colors={['#FFFFFFCC', '#FFFFFF80', '#FFFFFF00']}
          style={{flex: 1}}>
          <SearchBar
            term={term}
            onTermChange={(newTerm) => setTerm(newTerm)}
            onTermSubmit={() => searchWorkingSpace(term)}
            onToggleSwitchPage={() => toggleSwitchPage()}
          />
          <View style={{marginHorizontal: 18}}>
            <TagsView all={tags} selected={selected} isExclusive={false} />
            <Divider style={Styles.devider} />
          </View>

          {listPage == true ? (
            <FlatList
              data={list}
              renderItem={_renderListLocation}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            // <SafeAreaView style={{flex: 1}}>
            //   {errorMessage ? (
            //     <Text>{errorMessage}</Text>
            //   ) : null}
            //   {_renderListLocation()}
            // </SafeAreaView>
            <View style={{flex: 1}}>{_renderMap()}</View>
          )}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default List;
