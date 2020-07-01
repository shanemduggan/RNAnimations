/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Animations from './screens/FirstAnimation';
import PanResponderUsage from './screens/PanResponderUsage';

const App: () => React$Node = () => {

  // global.HermesInteral (Engine: Hermes)

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView> */}
        {/* <Animations /> */}
 
        <PanResponderUsage />

      {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: 500
  },
});

export default App;
