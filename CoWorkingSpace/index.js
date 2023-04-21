/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs();

if (__DEV__) {
  console.log('Start Version ==> Development');
} else {
  console.log('Start Version ==> Production');
}

AppRegistry.registerComponent(appName, () => App);
