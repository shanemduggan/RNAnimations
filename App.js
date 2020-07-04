/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Animations from './screens/FirstAnimation';
//import PanResponderUsage from './screens/PanResponderUsage';
// import BoundPanResponder from './screens/BoundPanResponder';

import FourCorners from './screens/class/FourCorners';

// TODO: add navigation and screen with links. each screen should have back button

const App: () => React$Node = () => {

  // global.HermesInteral (Engine: Hermes)

  /*
    // <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        // {/* <Animations />

       // {/* <FourCorners /> 
 
       // {/* <PanResponderUsage /> 

       // {/* <BoundPanResponder /> 

     // {/* </SafeAreaView> 
    {/* </View> 

    */

  return (

    <NavigationContainer>
    {/* Rest of your app code */}
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          //component={Home}
          component={FourCorners}
          options={{ title: 'Welcome' }}
        />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
      </Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: 500
  },
});

export default App;
