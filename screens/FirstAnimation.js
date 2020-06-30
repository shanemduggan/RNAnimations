import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
} from "react-native";

export default class animations extends Component {
  state = {
    animation: new Animated.ValueXY(0),
  };

  componentWillMount() {
    this._x = 0;
    this._y = 0;

    this.state.animation.addListener(value => {
      this._x = value.x;
      this._y = value.y;
    });

    const event = Animated.event([
        null,
        { dx: this.state.animation.x, dy: this.state.animation.y },
    ], { useNativeDriver: false });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
       this.state.animation.setOffset({ x: this._x, y: this._y });
       this.state.animation.setValue({ x: 0, y: 0 });

       //this.state.animation.extractOffset();
      },
      onPanResponderMove: event,
      onPanResponderRelease: (e, gestureState) => {
          if (Math.abs(gestureState.moveX) >= 100 || Math.abs(gestureState.moveY) >= 100) {
            this.state.animation.x.setValue(0);
            this.state.animation.y.setValue(0);
            return;
          }

        Animated.decay(this.state.animation, {
          velocity: { x: gestureState.vx, y: gestureState.vy },
          deceleration: 0.997,
          useNativeDriver: false
        }).start();
      },
    });
  }

  render() {
    const animatedStyle = {
      transform: this.state.animation.getTranslateTransform(),
    };

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.box, animatedStyle]}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    backgroundColor: 'blue'
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "tomato",
  },
});