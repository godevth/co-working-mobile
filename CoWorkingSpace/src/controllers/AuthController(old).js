import React, {useReducer, useMemo, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

const USER_TOKEN = 'userToken';
const USER_EXPIRY = 'userExpiry';

const initialState = {
  loggedIn: false,
  user: {},
};

const initialContext = [{...initialState}, () => {}];

export const AuthContext = React.createContext(initialContext);

const updater = (state, update) => {
  return {...state, ...update};
};

export function AuthController(props) {

  const [authState, updateAuth] = useReducer(updater, initialState);
  const value = useMemo(() => [authState, updateAuth], [authState]);

  // useEffect(() => {
  //   initialAuth();
  //   return () => {
  //     console.log('Auth Effect 1')
  //   }
  // },[])

  // const initialAuth = async () => {
  //   const currentAuth = await AsyncStorage.getItem(USER_TOKEN);

  //   if (currentAuth) {
  //     console.log('Auth Effect', currentAuth);
  //     updateAuth(currentAuth);
  //   } else {
  //     console.log('Auth Effect ==> Null');
  //   }
  // }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

AuthController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
