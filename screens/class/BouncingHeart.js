import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableWithoutFeedback
} from "react-native";

import Heart from '../../helpers/heart';

class BouncingHeart extends Component {
  state = {
    liked: false,
    scale: new Animated.Value(0)
  }

  triggerLike = () => {
    this.setState({
      liked: !this.state.liked
    });

    Animated.spring(this.state.scale, {
      toValue: 2,
      friction: 3,
      useNativeDriver: true
    }).start(() => {
      this.state.scale.setValue(0);
    });
  }

  render() {
    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, .8, 1]
    });

    const heartButtonStyle = {
      transform: [
        {
          scale: bouncyHeart
        }
      ]
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.triggerLike}>
          <Animated.View style={heartButtonStyle}>
            <Heart filled={this.state.liked} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BouncingHeart
