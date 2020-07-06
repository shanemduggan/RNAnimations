import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './screens/Home';

import FourCorners from './screens/class/FourCorners';
import PanResponderUsage from './screens/class/PanResponderUsage';
import StaggeredHeads from './screens/class/StaggeredHeads';
import KittenCards from './screens/class/KittenCards';
import StaggerFormItems from './screens/class/StaggerFormItems';

// TODO: add navigation and screen with links. each screen should have back button

// TODO: make animation screen component with back button

function App() {

  // global.HermesInteral (Engine: Hermes)

  // <Stack.Screen name="route-name" component={ScreenComponent} />
  // <Stack.Navigator screenOptions={{ headerShown: false }}>
  // <Stack.Screen options={{headerShown: false}} name="route-name" component={ScreenComponent} />

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            //options={{ headerShown: false }}
          />
          <Stack.Screen name='FourCorners' component={FourCorners} />
          <Stack.Screen name='PanResponderUsage' component={PanResponderUsage} />
          <Stack.Screen name='StaggeredHeads' component={StaggeredHeads} />
          <Stack.Screen name='KittenCards' component={KittenCards} />
          <Stack.Screen name='StaggerFormItems' component={StaggerFormItems} />

          {/* // TODO: figure out which ones to keep and add to stack
          <Stack.Screen name='BoundPanResponder' component={BoundPanResponder} />
          <Stack.Screen name='CardFlip' component={CardFlip} />
          <Stack.Screen name='FirstAnimation' component={FirstAnimation} />
          <Stack.Screen name='TwitterHeader' component={FourCorners} /> 
          */}
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
