import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  PixelRatio
} from "react-native";

import Swiper from 'react-native-swiper';

import * as Images from '../../assets/appintro/images';

const getScreen1Styles = (animation, width) => {
  const image2TranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -100],
    extrapolate: 'clamp'
  });

  return {
    image2: {
      transform: [
        {
          translateX: image2TranslateX
        }
      ]
    }
  }
}

const getScreen2Styles = (animation, width) => {
  const inputRange = [0, width, width * 2];

  const image2TranslateY = animation.interpolate({
    inputRange,
    outputRange: [100, 0, -100],
    extrapolate: 'clamp'
  });

  const image2Opacity = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: 'clamp'
  });

  return {
    image2: {
      opacity: image2Opacity,
      transform: [
        {
          translateY: image2TranslateY
        }
      ]
    }
  }
}

const getScreen3Styles = (animation, width) => {
  const inputRange = [width, width * 2, width * 3];

  const imageScale = animation.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: 'clamp'
  });

  const image2Rotate = animation.interpolate({
    inputRange,
    outputRange: ['-180deg', '0deg', '180deg'],
    extrapolate: 'clamp'
  });

  return {
    image1: {
      transform: [
        {
          scale: imageScale
        }
      ]
    },
    image2: {
      transform: [
        {
          scale: imageScale
        },
        {
          rotate: image2Rotate
        }
      ]
    }
  }
}

class ApplicationIntro extends Component {
  state = {
    animation: new Animated.Value(0)
  }

  render() {
    const { width, height } = Dimensions.get('window');

    const screen1Styles = getScreen1Styles(this.state.animation, width);
    const screen2Styles = getScreen2Styles(this.state.animation, width);
    const screen3Styles = getScreen3Styles(this.state.animation, width);

    return (
      <View style={styles.container}>
        <Swiper
          loop={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.state.animation } } }],
            { useNativeDriver: false }
          )}
        >
          <View style={{ width, height, backgroundColor: '#F89E20' }}>
            <View style={styles.screenHeader}>
              <Animated.Image 
                source={Images.Image1}
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(75),
                  height: PixelRatio.getPixelSizeForLayoutSize(63)
                }}
                resizeMode='contain'
              />
              <Animated.Image
                source={Images.Image2}
                style={[
                  {
                    width: PixelRatio.getPixelSizeForLayoutSize(46),
                    height: PixelRatio.getPixelSizeForLayoutSize(28),
                    position: "absolute",
                    top: 200,
                    left: 60,
                  },
                  screen1Styles.image2
                ]}
                resizeMode="contain"
              />
              <Animated.Image
                source={Images.Image3}
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(23),
                  height: PixelRatio.getPixelSizeForLayoutSize(17),
                  position: "absolute",
                  top: 150,
                  left: 60,
                }}
                resizeMode="contain"
              />
            </View>

            <View style={styles.screenText}>
              <Text>Screen 1</Text>
            </View>
          </View>
          <View style={{ width, height, backgroundColor: '#F89E20' }}>
            <View style={styles.screenHeader}>
              <Animated.Image 
                source={Images.Image1}
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(75),
                  height: PixelRatio.getPixelSizeForLayoutSize(63)
                }}
                resizeMode='contain'
              />
              <Animated.Image
                source={Images.Image2}
                style={[
                  {
                    width: PixelRatio.getPixelSizeForLayoutSize(46),
                    height: PixelRatio.getPixelSizeForLayoutSize(28),
                    position: "absolute",
                    top: 200,
                    left: 60,
                  },
                  screen2Styles.image2
                ]}
                resizeMode="contain"
              />
              <Animated.Image
                source={Images.Image3}
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(23),
                  height: PixelRatio.getPixelSizeForLayoutSize(17),
                  position: "absolute",
                  top: 150,
                  left: 60,
                }}
                resizeMode="contain"
              />
            </View>

            <View style={styles.screenText}>
              <Text>Screen 2</Text>
            </View>
          </View>
          <View style={{ width, height, backgroundColor: '#F89E20' }}>
            <View style={styles.screenHeader}>
              <Animated.Image 
                source={Images.Image1}
                style={[{
                  width: PixelRatio.getPixelSizeForLayoutSize(75),
                  height: PixelRatio.getPixelSizeForLayoutSize(63)
                },
                screen3Styles.image1
              ]}
                resizeMode='contain'
              />
              <Animated.Image
                source={Images.Image2}
                style={[
                  {
                    width: PixelRatio.getPixelSizeForLayoutSize(46),
                    height: PixelRatio.getPixelSizeForLayoutSize(28),
                    position: "absolute",
                    top: 200,
                    left: 60,
                  },
                  screen3Styles.image2
                ]}
                resizeMode="contain"
              />
              <Animated.Image
                source={Images.Image3}
                style={{
                  width: PixelRatio.getPixelSizeForLayoutSize(23),
                  height: PixelRatio.getPixelSizeForLayoutSize(17),
                  position: "absolute",
                  top: 150,
                  left: 60,
                }}
                resizeMode="contain"
              />
            </View>

            <View style={styles.screenText}>
              <Text>Screen 3</Text>
            </View>
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  screenHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenText: {
    flex: 1
  }
});

export default ApplicationIntro
