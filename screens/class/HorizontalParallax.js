import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
  Text
} from "react-native";

import Moment from '../../helpers/moment';

const { width, height } = Dimensions.get("window");
const Images = [
  { image: require('../../assets/parallax/drink1.jpg'), title: "Vokda Cran" },
  { image: require('../../assets/parallax/drink2.jpg'), title: "Old Fashion"},
  { image: require('../../assets/parallax/drink3.jpg'), title: "Mule" },
  { image: require('../../assets/parallax/drink4.jpg'), title: "Strawberry Daiquiri" }
];

const getInterpolate = (animatedScroll, i, imageLength) => {
  const inputRange = [
    (i - 1) * width,
    i * width,
    (i + 1) * width
  ];

  const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];

  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp'
  });
}

const getSeparator = (i) => {
  return <View
    key={i}
    style={[styles.separator, { left: (i - 1) * width - 2.5 }]}
  />
}

class HorizontalParallax extends Component {
  state = {
    animatedScroll: new Animated.Value(0)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={
            Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.animatedScroll
                  }
                }
              }
            ], { useNativeDriver: false })
          }
        >
          { Images.map((image, i) => {
            return (
              <Moment
                key={i}
                {...image}
                translateX={getInterpolate(this.state.animatedScroll, i, Images.length)}
              />
            )
          })}
          {Array.apply( null, { length: Images.length + 1 } ).map((_, i) => getSeparator(i))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  },
  separator: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 5,
  },
});

export default HorizontalParallax
