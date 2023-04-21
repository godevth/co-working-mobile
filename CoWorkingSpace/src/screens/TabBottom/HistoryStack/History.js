import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  Modal,
  Image as RNImage
} from 'react-native';
import {LocalizationContext} from '../../../Languages/translations';
import {Input, Image, Overlay} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
// import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Res} from '../../../constants/env';
import {Styles} from '../../../styles/styles';
import {DEVICE_WIDTH, moderateScale} from '../../../constants/scale';
import { weekdays, months } from '../../../constants/calendarData';

const _format = 'YYYY-MM-DD';
const _format2 = 'DD/MM/YYYY';
const _today = moment(new Date().dateString).format(_format);
const _minDate = moment().add(-15, 'days').format(_format);
const _maxDate = moment().add(15, 'days').format(_format);

const minDate = new Date(2018, 1, 1); // Min date
const maxDate = new Date(2050, 6, 3); // Max date

const History = () => {
  const [selected, setSelected] = useState([]);
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const startDate_ = startDate ? startDate.toString() : ''; //Start date
  const endDate_ = endDate ? endDate.toString() : ''; //End date
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();

  console.log('State --> ', selected)

  const onDayPress = (day) => {
    console.log('', day);
    const markedDate = Object.assign({});
    markedDate[day.dateString] = {
      selected: true,
      selectedColor: '#DFA460',
      selectedTextColor: 'white',
      // disableTouchEvent: true,
    };
    // setSelected((selected) => {
    //   console.log('Selected --> ', selected)
    //   return [day.dateString, ...selected]
    // });
    setSelected(markedDate)
  };

  const selectDate = (day) => {
    let selectedDate = day.dateString;
    if(selected[selectedDate]){
      const newDates = selected;
      delete newDates[selectedDate]
      setSelected(newDates);
    } else {
       const newDates = selected;
       newDates[selectedDate] = [
          {selected: true, startingDay: true, color: '#d6b161'},
          {selected: true, endingDay: true, color: '#d6b161'},
        ]
      setSelected(newDates);
    }
  };

  const onDaySelect = (day) => {
    const _selectedDay = moment(day.dateString).format(_format);
    
    let se = true;
    if (selected[_selectedDay]) {
      // Already in marked dates, so reverse current marked state
      se = !selected[_selectedDay].selected;
      // // setSelected(!selected[_selectedDay].selected)
      console.log('Select Already --> ', !selected[_selectedDay].selected)
    }
    
    // Create a new object using object property spread since it should be immutable
    // Reading: https://davidwalsh.name/merge-objects
    const updatedMarkedDates = {...selected, ...{ [_selectedDay]: { selected: se } }}
    
    // Triggers component to render again, picking up the new state
    setSelected(updatedMarkedDates)
    // console.log('State --> ', selected)
  };

  const onDateChange = (date, type) => {
    //function to handle the date change 
    if (type === 'END_DATE') {
      setEndDate(date)
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const _renderUpcoming = () => {
    const MockUp = [
      {id: 1, name: 'Sun Tower'},
      {id: 2, name: 'Singha Complex'},
    ];
    const _renderItem = ({item, index}) => (
      <View style={{paddingVertical: moderateScale(5), marginBottom: moderateScale(10)}} key={item.id}>
        <Text style={{marginBottom: moderateScale(5), fontSize: Res.Sizes.Header, fontWeight: 'bold'}}>{item.name}</Text>
        <Image
          source={Res.Images.BackgroundTest}
          resizeMode='cover'
          style={{
            height: Math.round((DEVICE_WIDTH * 9) / 30),
            width: DEVICE_WIDTH,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: '2%',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: Res.Sizes.Caption_2}}>20 Jul 2020 - 24 Jul 2020</Text>
          <TouchableNativeFeedback onPress={() => console.log('Click')}>
            <Text style={{textDecorationLine: 'underline', fontSize: Res.Sizes.Caption_2}}>Book again?</Text>
          </TouchableNativeFeedback>
        </View>
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

  const customDayHeaderStylesCallback = ({dayOfWeek, month, year}) => {
    switch(dayOfWeek) { // can also evaluate month, year
      case 4: // Thursday
        return {
          style: {
            // borderRadius: 12,
            // backgroundColor: 'cyan',
          },
          textStyle: {
            color: Res.Colors.BlueLine,
            fontWeight: 'bold',
          }
        };
    }
  }

  return (
    <View style={[Styles.container, {backgroundColor: Res.Colors.White, paddingHorizontal: 18,}]}>
        <View style={[{ paddingVertical: 20 }]}>
          <Text>{translations['name.page.history']}</Text>
        </View>
        <Formik
          // enableReinitialize
          initialValues={{email: ''}}
          onSubmit={(values) => Alert.alert(JSON.stringify(values))}
          // validationSchema={yup.object().shape({
          // email: yup.string().required()})}
          >
          {(props) => (
            <>
              <View style={[Styles.searchBar, Styles.shadows, {flex: 0, marginBottom: moderateScale(10)}]}>
                <Feather name="search" size={20} style={{marginLeft: 10}} />
                <Input
                  autoCapitalize='none'
                  autoCorrect={false}
                  placeholder={'Search'}
                  placeholderTextColor={Res.Colors.Placeholder}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  inputStyle={{fontSize: Res.Sizes.Body}}
                  renderErrorMessage={false}
                  // value={term}
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  errorStyle={{color: 'red'}}
                  errorMessage={props.errors.email}
                />
              </View>
              <TouchableNativeFeedback onPress={toggleOverlay}>
                <View style={{flexDirection: 'row', marginBottom: 15, borderWidth: 0, alignItems: 'center'}}>
                  <RNImage source={Res.Images.Calendar} style={{resizeMode: 'contain', width: moderateScale(18), height: moderateScale(18)}} />
                  <View style={[Styles.shadows, {flex: 1, borderWidth: 0, paddingVertical: 5, paddingHorizontal: 10, marginLeft: 10, backgroundColor: Res.Colors.White, borderRadius: 7 }]}>
                    <Text>
                      {startDate ? moment(startDate).format(_format2) : 'Start Date'} - {endDate ? moment(endDate).format(_format2) : 'End Date'}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </>
          )}
        </Formik>

        {/* <KeyboardAwareScrollView> */}
          <Overlay
            isVisible={visible} 
            ModalComponent={Modal}
            onBackdropPress={toggleOverlay} 
            overlayStyle={{borderRadius: 7, backgroundColor: Res.Colors.White, borderWidth: 0}}
          >
            <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                // selectedDayStyle={{colors: Res.Colors.White}}
                // textStyle={{fontSize: Res.Sizes.Title}}
                selectedRangeStartStyle={{backgroundColor: Res.Colors.Available}}
                selectedRangeEndStyle={{backgroundColor: Res.Colors.Available}}
                selectedRangeStyle={{backgroundColor: Res.Colors.isSelect}}
                minDate={minDate}
                maxDate={maxDate}
                weekdays={weekdays}
                months={months}
                previousComponent={<Image source={Res.Images.Calendar_Previous} style={{width: 20, height: 20, resizeMode: 'contain'}}/>}
                previousTitle="Back"
                nextTitle="Next"
                nextComponent={<Image source={Res.Images.Calendar_Next} style={{width: 20, height: 20}}/>}
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
          </Overlay>

        {/* <View style={{padding:16}}>
          <Text style={{padding:16}}>SELECTED START DATE :</Text>
          <Text style={{padding:16}}>{startDate_}</Text>
          <Text style={{padding:16}}>SELECTED END DATE : </Text>
          <Text style={{padding:16}}>{endDate_}</Text>
        </View> */}

        {/* <CalendarList
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          // Set custom calendarWidth.
          calendarWidth={DEVICE_WIDTH}
          // enableSwipeMonths={true}
          // onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          current={_today}
          minDate={_minDate}
          maxDate={_maxDate}
          style={styles.calendar}
          // hideExtraDays
          // onDayPress={(day) => onDayPress(day)}
          // onDayPress={(day) => selectDate(day)}
          onDayPress={(day) => onDaySelect(day)}
          // markedDates={{
          //   [selected]: {
          //     selected: true,
          //     disableTouchEvent: true,
          //     selectedColor: 'orange',
          //     selectedTextColor: 'white',
          //   },
          // }}
          markedDates={selected}
          // markingType={'interactive'}
        /> */}

        {_renderUpcoming()}
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: Res.Colors.White,
    borderRadius: 7,
    borderBottomWidth: 0,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  inputStyle: {
    fontSize: Res.Sizes.Body,
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
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});

export default History;
