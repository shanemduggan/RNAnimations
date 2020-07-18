import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './screens/Home';

// class animations
import FourCorners from './screens/class/FourCorners';
import PanResponderUsage from './screens/class/PanResponderUsage';
import StaggeredHeads from './screens/class/StaggeredHeads';
import KittenCards from './screens/class/KittenCards';
import StaggerFormItems from './screens/class/StaggerFormItems';
import AnimatedProgressBar from './screens/class/AnimatedProgressBar';
import DynamicAnimatedNotifications from './screens/class/DynamicAnimatedNotifications';
import AnimatedQuestionnaire from './screens/class/AnimatedQuestionnaire';
import PhotoGridSharedElement from './screens/class/PhotoGridSharedElement';
import AnimatedColorPicker from './screens/class/AnimatedColorPicker';
import FloatingActionButton from './screens/class/FloatingActionButton';
import ApplicationIntro from './screens/class/ApplicationIntro';
import EvolvingWriteButton from './screens/class/EvolvingWriteButton';
import SocialCommentModal from './screens/class/SocialCommentModal';
import HorizontalParallax from './screens/class/HorizontalParallax';
import FloatingHearts from './screens/class/FloatingHearts';
import BouncingHeart from './screens/class/BouncingHeart';
import ExplodingHeart from './screens/class/ExplodingHeart';

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
          <Stack.Screen name='AnimatedProgressBar' component={AnimatedProgressBar} />
          <Stack.Screen name='DynamicAnimatedNotifications' component={DynamicAnimatedNotifications} />
          <Stack.Screen name='AnimatedQuestionnaire' component={AnimatedQuestionnaire} />
          <Stack.Screen name='PhotoGridSharedElement' component={PhotoGridSharedElement} />
          <Stack.Screen name='AnimatedColorPicker' component={AnimatedColorPicker} />
          <Stack.Screen name='FloatingActionButton' component={FloatingActionButton} />
          <Stack.Screen name='ApplicationIntro' component={ApplicationIntro} />
          <Stack.Screen name='EvolvingWriteButton' component={EvolvingWriteButton} />
          <Stack.Screen name='SocialCommentModal' component={SocialCommentModal} />
          <Stack.Screen name='HorizontalParallax' component={HorizontalParallax} />
          <Stack.Screen name='FloatingHearts' component={FloatingHearts} />
          <Stack.Screen name='BouncingHeart' component={BouncingHeart} />
          <Stack.Screen name='ExplodingHeart' component={ExplodingHeart} />

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
