import React, { Component } from "react";
import {
    Animated,
  StatusBar,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const getDirectionAndColor = ({ moveX, moveY, dx, dy }) => {
  const draggedDown = dy > 30;
  const draggedUp = dy < -30;
  const draggedLeft = dx < -30;
  const draggedRight = dx > 30;
  const isRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;
  const isBlue = moveY > height - 50 && moveX > 0 && moveX < width;
  let dragDirection = "";

  if (draggedDown || draggedUp) {
    if (draggedDown) dragDirection += "dragged down ";
    if (draggedUp) dragDirection += "dragged up ";
  }

  if (draggedLeft || draggedRight) {
    if (draggedLeft) dragDirection += "dragged left ";
    if (draggedRight) dragDirection += "dragged right ";
  }

  if (isRed) return `red ${dragDirection}`;
  if (isBlue) return `blue ${dragDirection}`;
  if (dragDirection) return dragDirection;
};

const isOutofBounds = (gestureState) => {

    const { moveX, moveY, x0, y0, dx, dy, vx, vy } = gestureState;
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

    console.log('moveX', moveX);

    console.log('moveY', moveY);

    const isInRed = moveY < 90 && moveY > 40 && moveX > 0 && moveX < width;

    console.log(isInRed);


    //return false;
}

export default class App extends Component {
  state = {
    zone: "Still Touchable",
    animation: new Animated.ValueXY(0),
  };

  componentWillMount() {
    const event = Animated.event([
        null,
        { dx: this.state.animation.x, dy: this.state.animation.y },
    ], { useNativeDriver: false });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        //this.state.animation.setOffset({ x: this._x, y: this._y });
        //this.state.animation.setValue({ x: 0, y: 0 });
 
        this.state.animation.extractOffset();
       },
      onPanResponderMove: event,
      //onMoveShouldSetPanResponder: (evt, gestureState) => !!getDirectionAndColor(gestureState),
    //   onPanResponderMove: (evt, gestureState) => {
    //     const drag = getDirectionAndColor(gestureState);
    //     this.setState({
    //       zone: drag,
    //     });

    //     const isInRed = isOutofBounds(gestureState);

    //     //console.log(isInRed);
    //   },
      //onPanResponderTerminationRequest: (evt, gestureState) => true,
    });
  }

  onPress = () => {
    this.setState({
      zone: "I got touched with a parent pan responder",
    });
  };

  // TODO: create another example with bounds around PanResponder
  /*
  
    You can use the onLayout callback from any component to then define your layout constraints for your PanResponder. 
    You could position things off screen then drag them on screen by triggering an Animated value while your current view stays touchable.
  
  */

  render() {
    const animatedStyle = {
        transform: this.state.animation.getTranslateTransform(),
    };

    return (
      <View style={styles.container} 
      //{...this._panResponder.panHandlers}
      >
        <StatusBar hidden />
        {/* <View style={styles.zone1} /> */}
        <View style={styles.zone1}>
            <View style={[styles.box, animatedStyle]} {...this._panResponder.panHandlers} />
        </View>

        {/* <View style={styles.center}>
          <TouchableOpacity onPress={this.onPress}>
            <Text>{this.state.zone}</Text>
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.zone2} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  zone1: {
    top: 40,
    left: 0,
    right: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "red",
  },
  zone2: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: "absolute",
    backgroundColor: "blue",
  },
  box: {
      height: 25, 
      width: 25,
      backgroundColor: 'green'
  }
});
