import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class FloatingActionButton extends Component {
  state = {
    animation: new Animated.Value(0)
  }

  toggleOpen = () => {
    const toValue = this._isOpen ? 0 : 1;

    Animated.timing(this.state.animation, {
      //toValue: 1,
      toValue,
      duration: 200,
      useNativeDriver: true
    }).start();

    this._isOpen = !this._isOpen;
  }

  render() {
    const reloadStyle = {
      transform: [
        {
          scale: this.state.animation
        },
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -70]
          })
        }
      ]
    }

    const orderStyle = {
      transform: [
        {
          scale: this.state.animation
        },
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140]
          })
        }
      ]
    }

    const labelPositionInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-30, -90]
    });

    const opacityInterpolate = this.state.animation.interpolate({
      inputRange: [0, .8, 1],
      outputRange: [0, 0, 1]
    })

    const labelStyle = {
      opacity: opacityInterpolate,
      transform: [
        {
          translateX: labelPositionInterpolate
        }
      ]
    }

    const bgStyle = {
      transform: [
        {
          scale: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 30]
          })
        }
      ]
    }

    const rotate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const payStyle = {
      transform: [
        {
          rotate
        }
      ]
    };

    const payLabelPositionInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 90]
    });

    const payLabelStyle = {
      opacity: opacityInterpolate,
      transform: [
        {
          translateX: payLabelPositionInterpolate
        },
        {
          rotate
        }
      ]
    }

    // TODO: show them one at a time

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.background, bgStyle]} />

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.other, reloadStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>Order</Animated.Text>
            <Icon name='reload' size={20} color='#555' />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.other, orderStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>Reload</Animated.Text>
            <Icon name='food-fork-drink' size={20} color='#555' />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.toggleOpen}>
          <Animated.View style={[styles.button, styles.pay, payStyle]}>
            <Animated.Text style={[styles.label, payLabelStyle]}>Pay</Animated.Text>
            <Text style={styles.payText}>$5.00</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    backgroundColor: 'rgba(0,0,0, .2)',
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    borderRadius: 30
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#333',
    shadowOpacity: .1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  other: {
    backgroundColor: '#FFF'
  },
  pay: {
    backgroundColor: '#00B15E'
  },
  payText: {
    color: '#FFF'
  },
  label: {
    color: '#FFF',
    position: 'absolute',
    fontSize: 18
  }
});

export default FloatingActionButton
