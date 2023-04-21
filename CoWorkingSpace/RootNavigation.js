
import * as React from 'react';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
    // Example
    // ภายใน Stack
    // > naviagte('Screen Name', {})
    // ถ้าจะไปที่หน้าภายใน Stack อื่นๆ
    // > naviagte('Screen Name', { screen: 'Screen Name' })
  } else {
    console.log('Navigation is not ready ...')
  }
}