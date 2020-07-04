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
//import PanResponderUsage from './screens/PanResponderUsage';
// import BoundPanResponder from './screens/BoundPanResponder';

import FourCorners from './screens/class/FourCorners';

// TODO: add navigation and screen with links. each screen should have back button

const App: () => React$Node = () => {

  // global.HermesInteral (Engine: Hermes)

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView> */}
        {/* <Animations /> */}

        <FourCorners />
 
        {/* <PanResponderUsage /> */}

        {/* <BoundPanResponder /> */}

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
