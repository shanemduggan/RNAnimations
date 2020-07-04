import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
} from "react-native";

const isOutofBounds = (e, gestureState) => {

    let { moveX, moveY, x0, y0, dx, dy, vx, vy } = gestureState;
    //console.log(gestureState);

    /*

moveX: 0
moveY: 0
x0: 0
y0: 0
dx: 0
dy: 0
vx: 0
vy: 0

    */

    // console.log('moveX', moveX);
    // console.log('moveY', moveY);

    //console.log('dx', dx);

    // console.log('x0', x0);

    //console.log('locationX', e.nativeEvent.locationX);


    //const isInRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;

    // TODO: need to clean this up (what needs to happen here?)

    //const maxMoveX = 100 - e.nativeEvent.locationX;

    //const maxMoveY = 100 - e.nativeEvent.locationY;

    moveX = moveX + e.nativeEvent.locationX;

    const isInBox = moveX > 0 && moveX < 100 && moveY < 100 && moveY > 0;

   // const isInBox = moveX > 0 && moveX < maxMoveX && moveY < maxMoveY && moveY > 0;

    //const isInBox = moveX > 0 && moveX < maxMoveX;

    //const isInBox = moveX > 0 && (moveX + e.nativeEvent.location) < 100;


    console.log(isInBox);

    return isInBox;

    //return false;
}

export default class animations extends Component {
  state = {
    animation: new Animated.ValueXY(0),
  };

  componentWillMount() {
    // this._x = 0;
    // this._y = 0;

    // this.state.animation.addListener(value => {
    //   this._x = value.x;
    //   this._y = value.y;
    // });

    const event = Animated.event([
        null,
        { dx: this.state.animation.x, dy: this.state.animation.y },
    ], { useNativeDriver: false });

    this._panResponder = PanResponder.create({
      //onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
     // onMoveShouldSetPanResponder: (evt, gestureState) => !!isOutofBounds(gestureState),
      onStartShouldSetPanResponderCapture: (e, gestureState) => {

        // console.log('locationX', e.nativeEvent.locationX);

        return true;
      },
      onPanResponderGrant: () => {
       //this.state.animation.setOffset({ x: this._x, y: this._y });
       //this.state.animation.setValue({ x: 0, y: 0 });

       this.state.animation.extractOffset();
      },
      //onPanResponderMove: event,
      onPanResponderMove: (e, gestureState) => {

        console.log('locationX', e.nativeEvent.locationX);


        const isInBox = isOutofBounds(e, gestureState);

        if (isInBox) {
            this.state.animation.x.setValue(gestureState.dx);
            this.state.animation.y.setValue(gestureState.dy);
        }

        // this.state.animation.x.setValue(gestureState.dx);
        // this.state.animation.y.setValue(gestureState.dy);

      },
      onPanResponderRelease: (e, gestureState) => {
        //   if (Math.abs(gestureState.moveX) >= 100 || Math.abs(gestureState.moveY) >= 100) {
        //     this.state.animation.x.setValue(0);
        //     this.state.animation.y.setValue(0);
        //     return;
        //   }

        // top: 100,
        // bottom: 100

        //console.log('moveX', gestureState.moveX);

        //const isInBox = isOutofBounds(gestureState);


        // Animated.decay(this.state.animation, {
        //   velocity: { x: gestureState.vx, y: gestureState.vy },
        //   deceleration: 0.997,
        //   useNativeDriver: false
        // }).start();
      },
    });
  }

  // TODO: clean up
  //       center align box (make it bigger area)
  //       detect where click took place on (e.g. if in corner or middle of box) then add or subtract that from moveX, moveY

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
