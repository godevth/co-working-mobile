import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  Modal,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import {
  SearchBar,
  ResultList,
  Button,
  TagFilter,
  Loading,
  ImgBackground,
} from '../../../components';
import {Divider, Overlay, Image, Input} from 'react-native-elements';
import {Styles} from '../../../styles/styles';
import {LocalizationContext} from '../../../Languages/translations';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import yelp from '../../../api/yelp';
import {Formik} from 'formik';
import * as yup from 'yup';
import {categories} from '../../../constants/config';
import {markers} from '../../../constants/demo';
import GoogleMaps from '../../../components/GoogleMaps';
import {Res} from '../../../constants/env';
import {DEVICE_WIDTH} from '../../../constants/scale';
import {
  weekdays,
  months,
  minDate,
  maxDate,
} from '../../../constants/calendarData';
import useResults from '../../../hooks/useResults';
import { Context as NavContext } from '../../../controllers/NavController'
import _ from 'lodash';

const List = () => {
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const initialMapState = {
    markers,
    categories,
    region: {
      latitude: 13.789775,
      longitude: 100.515301,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  };
  const [loading, setLoading] = useState(false);
  const [mapState, setMapState] = useState(initialMapState);
  const [onFilter, setOnFilter] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [visiblePerson, setVisiblePerson] = useState(false);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [list, setList] = useState([{id: 1}]);
  const [term, setTerm] = useState('');
  // const [workingSpace, setWorkingSpace] = useState([]);
  const [person, setPerson] = useState(0);
  // const [errorMessage, setErrorMessage] = useState('');
  const [listPage, setListPage] = useState(true);
  const [searchWorkingSpace, response, errorMessage, onload] = useResults();
  const { TabButtonToggle } = useContext(NavContext);

  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  console.log(errorMessage)

  useEffect(() => {
    // let arr = mapState.categories.map((item, index) => {
    //   item.isSelect = false;
    //   return {...item};
    // });
    
    let arr = _.map(mapState.categories, function(x) { 
      return _.assign(x, { isSelect: false })
    })
    setMapState({categories: arr});

    console.log(mapState.categories);
  }, []);
  //  ^  ถ้าหากส่ง argument ไปด้วยจะทำงานแค่ครั้งเดียวเหมือย componnetDidmount

  console.log(_.filter(mapState.categories,(data)=> { 
    _.filter(data.isSelect, (x) => {return x}) 
  }))

  const toggleSwitchPage = async () => {
    setListPage(!listPage);
    TabButtonToggle(!listPage)
  };

  const selectCategories = (select) => {
    // Set Select Filter
    let arr = mapState.categories.map((item, index) => {
      if (select == index) {
        item.isSelect = !item.isSelect;
      }
      return {...item};
    });
    setMapState({categories: arr});

    // Check when filter is select
    let checkArr = mapState.categories;
    const find = checkArr.filter((item) => item.isSelect === true);
    console.log('Find Index ==> ', find.length);
    if (find.length > 0) {
      return setOnFilter(true);
    } else {
      return setOnFilter(false);
    }
  };

  const filterResultByPrice = (price) => {
    // console.log('==> ', response )
    // const results = response;
    return response.filter((result) => {
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

  const toggleOverlay = () => setVisibleFilter(!visibleFilter);
  const toggleOverlayPerson = () => setVisiblePerson(!visiblePerson);
  const toggleOverlayCalendar = () => setVisibleCalendar(!visibleCalendar);

  const _renderPersonModal = () => {
    return (
      <Overlay
        isVisible={visiblePerson}
        ModalComponent={Modal}
        onBackdropPress={toggleOverlayPerson}
        overlayStyle={Styles.Modal}
        animationType={'fade'}>
        <Formik
          enableReinitialize
          initialValues={{person: ''}}
          onSubmit={(values) => {
            // console.log(values)
            setPerson(values.person), toggleOverlayPerson();
          }}
          validationSchema={yup.object().shape({
            person: yup
              .number()
              .typeError('กรุณาระบุตัวเลขเท่านั้น')
              .min(1, 'อย่างน้อย 1 คน')
              .required('จำเป็นต้องระบุ'),
          })}>
          {(props) => (
            <>
              <View style={Styles.containerPerson}>
                <Input
                  label={'Number of People'}
                  labelStyle={Styles.labelStyleInLine}
                  containerStyle={{}}
                  inputStyle={Styles.inputStyle}
                  containerStyle={{paddingHorizontal: 0}}
                  inputContainerStyle={[Styles.inputContainerStyle]}
                  onChangeText={props.handleChange('person')}
                  value={props.values.person}
                  errorStyle={{color: 'red'}}
                  errorMessage={props.errors.person}
                  keyboardType="number-pad"
                />
              </View>
              <Button
                title={'Submit'}
                onPress={() => props.handleSubmit()}
                buttonTextStyle={{color: Res.Colors.White, textAlign: 'center'}}
                buttonContainer={Styles.buttonModal}
              />
            </>
          )}
        </Formik>
      </Overlay>
    );
  };

  const _renderCalendarModal = () => {
    const customDayHeaderStylesCallback = ({dayOfWeek, month, year}) => {
      switch (
        dayOfWeek // can also evaluate month, year
      ) {
        case 4: // Thursday
          return {
            style: {
              // borderRadius: 12,
              // backgroundColor: 'cyan',
            },
            textStyle: {
              color: Res.Colors.BlueLine,
              fontWeight: 'bold',
            },
          };
      }
    };

    return (
      <Overlay
        isVisible={visibleCalendar}
        ModalComponent={Modal}
        onBackdropPress={toggleOverlayCalendar}
        overlayStyle={Styles.Modal}
        animationType={'fade'}>
        <>
          <View style={Styles.containerCalendar}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              // selectedDayStyle={{colors: Res.Colors.White}}
              // textStyle={{fontSize: Res.Sizes.Title}}
              previousTitle="Anterior"
              nextTitle="Próximo"
              selectedRangeStartStyle={{backgroundColor: Res.Colors.Available}}
              selectedRangeEndStyle={{backgroundColor: Res.Colors.Available}}
              selectedRangeStyle={{backgroundColor: Res.Colors.isSelect}}
              minDate={minDate}
              maxDate={maxDate}
              weekdays={weekdays}
              months={months}
              previousComponent={
                <Image
                  source={Res.Images.Calendar_Previous}
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                />
              }
              previousTitle="Previous"
              nextComponent={
                <Image
                  source={Res.Images.Calendar_Next}
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                />
              }
              nextTitle="Next"
              // monthYearHeaderWrapperStyle={{backgroundColor: 'red'}}
              customDayHeaderStyles={customDayHeaderStylesCallback}
              todayBackgroundColor="#e6ffe6"
              todayTextStyle={{color: '#000000'}}
              selectedDayColor="#d6b161"
              selectedDayTextColor="#FFF"
              width={DEVICE_WIDTH - 50}
              // scaleFactor={375}
              textStyle={{
                // fontFamily: 'Cochin',
                color: '#000000',
              }}
              onDateChange={onDateChange}
            />
          </View>
          <Button
            title={'Submit'}
            onPress={() =>
              startDate && endDate != null
                ? toggleOverlayCalendar()
                : Alert.alert('ยังเลือกไม่ครบ')
            }
            buttonTextStyle={{color: Res.Colors.White, textAlign: 'center'}}
            buttonContainer={Styles.buttonModal}
          />
        </>
      </Overlay>
    );
  };

  const convertDateToShow = (date) => {
    // console.log(date);
    if (date != null) {
      var convert = moment(date).format('L');
      var splitdate = convert.split('/');
      const month = splitdate[0];
      const day = splitdate[1];
      const year = splitdate[2];

      var showDate = day + '/' + month;
      return showDate;
    } else {
      return 'Not Select';
    }
  };

  const _renderFilterModal = () => {
    return (
      <Overlay
        isVisible={visibleFilter}
        ModalComponent={Modal}
        onBackdropPress={toggleOverlay}
        overlayStyle={[Styles.Modal, Styles.shadows]}
        animationType={'fade'}>
        <>
          <View style={[Styles.headerFilter]}>
            <Text style={Styles.Text_White}>Filter</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              backgroundColor: Res.Colors.White,
              borderBottomLeftRadius: 7,
              borderBottomRightRadius: 7,
            }}>
            {mapState.categories.map((cate, index) => {
              return (
                <TouchableNativeFeedback
                  onPress={() => selectCategories(index)}
                  key={index}>
                  <View
                    style={{
                      width: '50%',
                      backgroundColor: cate.isSelect
                        ? Res.Colors.isSelect
                        : 'transparent',
                    }}>
                    <Text style={Styles.textCategories}>{cate.name}</Text>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </View>
          <Button
            title={'Submit'}
            onPress={toggleOverlay}
            buttonTextStyle={{color: Res.Colors.White, textAlign: 'center'}}
            buttonContainer={[Styles.buttonModal]}
          />
        </>
      </Overlay>
    );
  };

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  const selected = ['4', '13/07-17/07'];
  const tags = ['4', '13/07-17/07', 'C#', 'Haskell', 'Java'];

  // console.log('Current Page ==> ',listPage);
  // console.log('Track View ==> ',tracksViewChanges);

  return (
    <View style={[Styles.container]}>
      {listPage == true ? (
        <ImgBackground colorsGradient={Res.ColorsGradient.whiteToBlack}>
          <SearchBar
            term={term}
            onTermChange={(newTerm) => setTerm(newTerm)}
            onTermSubmit={() => searchWorkingSpace(term)}
            onToggleSwitchPage={() => toggleSwitchPage()}
            isSreenList={listPage}
            isVisibleTab={true}
          />
          <View style={{marginHorizontal: 18}}>
            <TagFilter
              person={person}
              // date={'13/07 - 17/07'}
              date={
                convertDateToShow(startDate) + '-' + convertDateToShow(endDate)
              }
              onFilterSelect={onFilter}
              toggleOverlay={toggleOverlay}
              toggleOverlayPerson={toggleOverlayPerson}
              toggleOverlayCalendar={toggleOverlayCalendar}
            />
            {_renderFilterModal()}
            {_renderPersonModal()}
            {_renderCalendarModal()}
            <Divider style={Styles.devider} />
          </View>
          {onload ? (
            <Loading type='Search' />
          ) : (
            <>
            { 
              errorMessage == ''
              ? <FlatList
                  data={list}
                  renderItem={_renderListLocation}
                  keyExtractor={(item) => item.id.toString()}
                />
              : <View style={[Styles.container, Styles.center, {}]}>
                  <Text style={{fontSize: Res.Sizes.Large_Title, fontWeight: 'bold'}}>Cannot Load ...</Text>
                </View>
            }
            </>
          )}
        </ImgBackground>
      ) : (
        <>
          <SearchBar
            term={term}
            onTermChange={(newTerm) => setTerm(newTerm)}
            onTermSubmit={() => searchWorkingSpace(term)}
            onToggleSwitchPage={() => toggleSwitchPage()}
            isSreenList={listPage}
            isVisibleTab={false}
          />
          <View style={{marginHorizontal: 18}}>
            <TagFilter
              person={person}
              date={
                convertDateToShow(startDate) + '-' + convertDateToShow(endDate)
              }
              onFilterSelect={onFilter}
              toggleOverlay={toggleOverlay}
              toggleOverlayPerson={toggleOverlayPerson}
              toggleOverlayCalendar={toggleOverlayCalendar}
            />
            {_renderFilterModal()}
            {_renderPersonModal()}
            {_renderCalendarModal()}
          </View>
          <GoogleMaps />
          {/* <View style={{flex: 1, ...StyleSheet.absoluteFillObject, zIndex: -1,}}>{_renderMap()}</View>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment='center'
            style={Styles.scrollView}
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET
            }}
            contentContainerStyle={{
              paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    }
                  },
                },
              ],
              {useNativeDriver: true}
            )}
          >
            {mapState.markers.map((marker, index)  => (
              <View key={index} style={Styles.card}>
                <Image
                  source={require('../../assets/workingSpace2.jpg')}
                  style={Styles.cardImage}
                  resizeMode='cover'
                />
                <View style={Styles.textContent}>
                  <Text numberOfLines={1} style={Styles.cardtitle}>{marker.title}</Text>
                  <StarRating ratings={marker.rating} reviews={marker.reviews}/>
                  <Text numberOfLines={1} style={Styles.cardDescription}>{marker.description}</Text>
                </View>
              </View>
            ))}
          </Animated.ScrollView> */}
        </>
      )}
    </View>
  );
};

export default List;
