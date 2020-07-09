import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if(__DEV__)
  require('react-native').unstable_enableLogBox();

AppRegistry.registerComponent(appName, () => App);
