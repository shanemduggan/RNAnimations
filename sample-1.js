import React, { Component } from "react";
import { StyleSheet, View, Animated, TouchableWithoutFeedback } from "react-native";

export default class animations extends Component {
  state = {
    animation: new Animated.Value(1),
    width: new Animated.Value(150)
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      //duration: 350
      duration: 10000
    }).start(() => {
      // Animated.timing(this.state.animation, {
      //   toValue: 1,
      //   duration: 500,
      // }).start();

      // Animated.timing(this.state.animation, {
      //   toValue: 1,
      //   duration: 500,
      // }).start();
    });

    Animated.timing(this.state.width, {
      toValue: 250,
      duration: 350
    }).start(() => {
      Animated.timing(this.state.width, {
        toValue: 150,
        duration: 500,
      }).start();
    });
  }
  
  render() {
    const RotateData = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const animatedStyles = {
      //opacity: this.state.animation,
      width: this.state.width,
      height: this.state.width,
      transform: [{ rotate: RotateData }],
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "tomato",
  }
});