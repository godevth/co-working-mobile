import {StyleSheet} from 'react-native';
import { Res } from '../constants/env';
import { CARD_HEIGHT, CARD_WIDTH, moderateScale } from '../constants/scale';

export const Styles = StyleSheet.create({
  // All Components
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  devider: {
    backgroundColor: '#999999',
    // marginBottom: 10,
    // zIndex: 2,
    borderWidth: 0,
  },
  Text_White: {
    color: Res.Colors.White,
    textAlign: 'center',
    fontSize: Res.Sizes.Header,
  },
  containerCover: {
    flex: 0, 
    height: moderateScale(100, 0), 
    alignItems: 'center', 
    // borderWidth: 3, 
    // borderColor: 'red', 
    justifyContent: 'center'
  },
  mainLogo: {
    width: 150,
    height: undefined,
    resizeMode: 'contain',
    paddingVertical: 20,
  },
  navbarIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  searchBar: {
    flex: 1,
    backgroundColor: Res.Colors.White,
    // height: 50,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Ribbon
  sale: {
    // flex: 1,
    position: 'absolute',
    zIndex: 1,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 90,
    borderTopWidth: 90,
    borderRightColor: 'transparent',
    borderTopColor: '#F55353',
    borderTopLeftRadius: 10,
  },
  sale2: {
    // flex: 1,
    position: 'absolute',
    zIndex: 1,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 90,
    borderTopWidth: 90,
    borderRightColor: 'transparent',
    // borderTopColor: '#F55353',
    borderTopLeftRadius: 10,
  },
  saleText: {
    position: 'absolute',
    transform: [{rotate: '-45deg'}],
  },
  ribbin: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    // borderWidth: 4
  },

  // Google Maps
  imageMaps: {
    width: undefined, 
    height: 100, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10
  },
  textHaderMaps: {
    fontSize: Res.Sizes.Header,
    marginBottom: 5
  },  
  contentMaps: {
    width: undefined, 
    minWidth: 200,
    maxWidth: 250,
    height: undefined, 
    backgroundColor: '#FFF', 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    padding: 15, 
    borderBottomEndRadius: 10, 
    borderBottomStartRadius: 10
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#FFF',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  ChatContainer: {
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  footerContainer: {
    backgroundColor: Res.Colors.Black, 
    paddingTop: 20,
    width: '100%', 
    height: 100, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  footerIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    // marginRight: 20
  },

  // For Maps
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  markerMedium: {
    width: 40,
    height: 40,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: Res.Colors.White,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: Res.Colors.Black,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    // overflow: "hidden",
  },
  cardImage: {
    // flex: 3,
    width: "100%",
    height: CARD_HEIGHT / 2,
    alignSelf: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    // borderWidth: 4,
    // borderColor: 'red'
  },
  textContent: {
    // borderWidth: 4,
    flex: 1,
    padding: 10,
  },
  cardtitle: {
    fontSize: Res.Sizes.Subhead,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: Res.Sizes.Subhead,
    color: "#444",
  },
  shadows: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2.5,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.00,
    elevation: 10,
    // backgroundColor: '#0000'
  },

  // Input User
  labelStyleInLine: {
    fontSize: Res.Sizes.Tiny, 
    bottom: -5, 
    left: 10, 
    zIndex: 1, 
    borderWidth: 0, 
    backgroundColor: Res.Colors.White, 
    alignSelf: 'baseline',
    paddingHorizontal: 5
  },
  inputContainerStyle: {
    backgroundColor: Res.Colors.White,
    borderRadius: 7,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Res.Colors.Placeholder
  },
  inputStyle: {
    fontSize: Res.Sizes.Body,
    color: Res.Colors.Black,
  },
  buttonIcon: {
    position: 'absolute',
    left: 20,
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 25,
    textAlign: 'center',
    borderRadius: 7,
    paddingVertical: 12,
    backgroundColor: Res.Colors.BT_Sign_In,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },

  // Modal
  Modal: {
    width: '90%', 
    maxWidth: 500,
    backgroundColor: 'transparent', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  headerFilter: {
    backgroundColor: Res.Colors.BlueLine,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  buttonModal: {
    backgroundColor: Res.Colors.BlueLine,
    width: '70%',
    maxWidth: 300,
    borderRadius: 7,
    marginTop: 25,
  },
  containerPerson: {
    backgroundColor: Res.Colors.White,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 5,
  },
  containerCalendar: {
    backgroundColor: Res.Colors.White,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  textCategories: {
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: Res.Sizes.Subhead,
  },

  // Notification
  notification: {
    paddingLeft: 10,
    // marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 0,
    marginHorizontal: 18,
    backgroundColor: Res.Colors.White,
    borderRadius: 7
  },

  // Order Detail
  containerPackage: {
    marginHorizontal: 18,
    paddingHorizontal: '4%',
    paddingVertical: '6%',
    borderRadius: 7,
    backgroundColor: Res.Colors.White,
    marginBottom: '4%',
  },

  // Validation Error
  textError: {
    fontSize: Res.Sizes.Subhead,
    color: Res.Colors.Error,
    marginLeft: 10,
    marginTop: 5
  },

  Circle: {
    height: 22,
    width: 22,
    borderRadius: 12,
    backgroundColor: Res.Colors.White,
    // borderWidth: 2,
    // borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
