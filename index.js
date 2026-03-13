/**
 * @format
 */


import 'react-native-gesture-handler'; // MUST be first import for navigation
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
