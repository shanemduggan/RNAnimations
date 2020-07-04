import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from "react-native";

// TODO: define box dimensions as constants?

export default class FourCorners extends Component {
  state = {
    animation: new Animated.ValueXY()
  }

  startAnimation = () => {
    const { width, height } = Dimensions.get("window");

    Animated.sequence([
      Animated.spring(this.state.animation.y, {
        toValue: height - this._height,
        useNativeDriver: true
      }),
      Animated.spring(this.state.animation.x, {
        toValue: width - this._width,
        useNativeDriver: true
      }),
      Animated.spring(this.state.animation.y, {
        toValue: 0,
        useNativeDriver: true
      }),
      Animated.spring(this.state.animation.x, {
        toValue: 0,
        useNativeDriver: true
      })
    ]).start()
  }

  saveDimensions = (e) => {
    this._width = e.nativeEvent.layout.width;
    this._height = e.nativeEvent.layout.height;
  }

  render() {
    const animatedStyles = {
      transform: this.state.animation.getTranslateTransform()
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback 
          onPress={this.startAnimation}
          onLayout={this.saveDimensions}
        >
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0
  }
});