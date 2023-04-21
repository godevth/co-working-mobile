import moment from 'moment';

const TH = 'th';
const EN = 'en';

export const ConvertDateFormat = (date, local) => {

    var eventdate = moment(date).format('YYYY-MM-DD');
    console.log('DATE FOR CONVERT : ', eventdate);
    var splitdate = eventdate.split("-");
    const year = splitdate[0];
    const month = splitdate[1];
    const day = splitdate[2];
    let convertMonth;
      if (month == '01') {
        convertMonth = local == TH ? "มกราคม" : "January"
      }
      if (month == '02') {
        convertMonth = local == TH ? "กุมภาพันธ์" : "February"
      }
      if (month == '03') {
        convertMonth = local == TH ? "มีนาคม" : "March"
      }
      if (month == '04') {
        convertMonth = local == TH ? "เมษายน" : "April"
      }
      if (month == '05') {
        convertMonth = local == TH ? "พฤษภาคม" : "May"
      }
      if (month == '06') {
        convertMonth = local == TH ? "มิถุนายน" : "June"
      }
      if (month == '07') {
        convertMonth = local == TH ? "กรกฎาคม" : "July"
      }
      if (month == '08') {
        convertMonth = local == TH ? "สิงหาคม" : "August"
      }
      if (month == '09') {
        convertMonth = local == TH ? "กันยายน" : "September"
      }
      if (month == '10') {
        convertMonth = local == TH ? "ตุลาคม" : "October"
      }
      if (month == '11') {
        convertMonth = local == TH ? "พฤศจิกายน" : "November"
      }
      if (month == '12') {
        convertMonth = local == TH ? "ธันวาคม" : "December"
      }
    const convertYearToInt = Number(year)
    const convertDayToInt = Number(day)

    // Show month name 
    var convertDateToThai = convertDayToInt + ' ' + convertMonth + ' ' + (convertYearToInt + 543);
    var convertDateToEN = convertMonth + ' ' + convertDayToInt + ', ' + (convertYearToInt + 543);

    // Show only number
    // var convertDateToThai = convertDayToInt + '-' + month + '-' + (convertYearToInt + 543);
    // var convertDateToEN = month + '-' + convertDayToInt + '-' + (convertYearToInt + 543);

    var convert = local === 'th' ? convertDateToThai : convertDateToEN
    console.log('AFTER_CONVERT : ', convert)

    return convert;
}