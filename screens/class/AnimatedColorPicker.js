import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

import Icon from 'react-native-vector-icons/Foundation';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class AnimatedColorPicker extends Component {
  state = {
    animation: new Animated.Value(0),
    buttonAnimation: new Animated.Value(0),
    color: '#000',
    inputOpen: false
  }

  handleToggle = () => {
    const toValue = this._open ? 0 : 1;
    Animated.spring(this.state.animation, {
      toValue
    }).start();

    this._open = !this._open;
  }

  toggleInput = () => {
    const toValue = this._inputOpen ? 0 : 1;
    Animated.timing(this.state.buttonAnimation, {
      toValue,
      duration: 350
    }).start();

    this._inputOpen = !this._inputOpen;
    this.setState({ 
      inputOpen: this._inputOpen 
    }, () => {
      !this.state.inputOpen ? this._input.blur() : this._input.focus();
    });
  }

  render() {
    const scaleXInterpolate = this.state.animation.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [0, 0, 1]
    });

    const translateYInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 0]
    });

    const rowStyle = {
      opacity: this.state.animation,
      transform: [
        {
          translateY: translateYInterpolate
        },
        {
          scaleX: scaleXInterpolate
        },
        {
          scaleY: this.state.animation
        }
      ]
    }

    const moveInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    });

    const buttonStyle = {
      transform: [
        {
          translateX: moveInterpolate
        },
        {
          scale: this.state.buttonAnimation
        }
      ]
    }

    const colorRowInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 0.01],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
 
    const colorRowStyles = {
      opacity: colorRowInterpolate,
    };

    const inputOpacityInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, .8, 1],
      outputRange: [0, 0, 1]
    });

    const inputStyle = {
      opacity: inputOpacityInterpolate
    }

    const iconTranslate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20]
    });

    const opacityIconInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, .2],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const iconStyle = {
      opacity: opacityIconInterpolate,
      transform: [
        {
          translateX: iconTranslate
        }
      ]
    };

    const colorStyle = {
      backgroundColor: this.state.color
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.rowWrap, rowStyle]}>
          <TouchableWithoutFeedback onPress={this.toggleInput}>
            <Animated.View style={[styles.colorBall, colorStyle]} />
          </TouchableWithoutFeedback>
          <View style={styles.row}>
            <TouchableOpacity>
              <AnimatedIcon name="bold" size={30} color="#555" style={iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon name="italic" size={30} color="#555" style={iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon name="align-center" size={30} color="#555" style={iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AnimatedIcon name="link" size={30} color="#555" style={iconStyle} />
            </TouchableOpacity>

            <Animated.View
              style={[StyleSheet.absoluteFill, styles.colorRowWrap, colorRowStyles]}
              pointerEvents={this.state.inputOpen ? 'auto' : 'none'}
            >
              <AnimatedTextInput
                style={[styles.input, inputStyle]}
                value={this.state.color}
                onChangeText={(color) => this.setState({ color })}
                ref={input => (this._input = input)}
              />
              <TouchableWithoutFeedback onPress={this.toggleInput}>
                <Animated.View style={[styles.okayButton, buttonStyle]}>
                  <Text style={styles.okayText}>OK</Text>
                </Animated.View>
              </TouchableWithoutFeedback>     
            </Animated.View>
          </View>
        </Animated.View>
        <TouchableOpacity 
          onPress={this.handleToggle}
          style={styles.button}
        >
          <Text>Toggle Open/Closed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '50%',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#333',
    shadowOpacity: .2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  colorRowWrap: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 5
  },
  input: {
    flex: 1
  },
  okayButton: {
    borderRadius: 20,
    width: 40,
    height: '100%',
    backgroundColor: '#309EEB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  okayText: {
    color: '#fff'
  },
  button: {
    marginTop: 50
  },
  colorBall: {
    width: 15,
    height: 15,
    borderRadius: 8
  }
});

export default AnimatedColorPicker
