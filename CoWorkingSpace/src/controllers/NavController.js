import React, {useState} from 'react';
import createDataContext from './createDataContext';

const initialState = {
    tabbarVisible: true,
};

const NavReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_TAB_BUTTON':
      return {...state, tabbarVisible: true};
    case 'CLOSE_TAB_BUTTON':
      return {...state, tabbarVisible: false};
    default:
      return state;
  }
};

const TabButtonToggle = (dispatch) => {
  return async (value) => {
    console.log('Click Toggle Button ==> ', value)
    if (value) {
        console.log('Check True')
        return dispatch({type: 'OPEN_TAB_BUTTON'});
    } else {
        console.log('Check False')
        return dispatch({type: 'CLOSE_TAB_BUTTON'});
    }
    
  };
};

export const {Context, Provider} = createDataContext(
  NavReducer,
  {TabButtonToggle},
  initialState,
);
