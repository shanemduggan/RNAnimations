import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text
} from "react-native";

class ExpandingNotifyInput extends Component {
  state = {
    animation: new Animated.Value(0),
    success: false
  }

  handlePress = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  }

  handleSend = () => {
    this.setState({ 
      success: true
    }, () => {
      Animated.sequence([
        Animated.timing(this.state.animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false
        }),
        Animated.delay(1500)
      ]).start(() => {
        this.setState({ success: false });
      });
    });
  }

  render() {
    const { success } = this.state;

    const widthInterplate = this.state.animation.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [150, 150, 300],
      extrapolate: 'clamp'
    });

    const buttonWrapStyle = {
      width: widthInterplate
    };

    const inputScaleInterpolate = this.state.animation.interpolate({
      inputRange: [0, .5, .6],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });

    const inputScaleStyle = {
      transform: [
        { scale: inputScaleInterpolate }
      ]
    };

    const sendButtonInterpolate = this.state.animation.interpolate({
      inputRange: [0, .6, 1],
      outputRange: [0, 0, 1]
    });

    const sendButtonStyle = {
      transform: [
        { scale: sendButtonInterpolate }
      ]
    }

    const notifyTextScaleInterpolate = this.state.animation.interpolate({
      inputRange: [0, .5],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const notifyTextStyle = {
      transform: [
        { scale: notifyTextScaleInterpolate }
      ]
    }

    const thankYouScaleInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });

    const thankYouTextStyle = {
      transform: [
        { scale: thankYouScaleInterpolate }
      ]
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Animated.View style={[styles.buttonWrap, buttonWrapStyle]}>
            {!success && <Animated.View style={[StyleSheet.absoluteFill, styles.inputWrap, inputScaleStyle]}>
                <TextInput
                  //autoFocus
                  keyboardType='email-address'
                  placeholder='email'
                  placeholderTextColor='rgba(255,123,115, 0.8)'
                  style={styles.textInput}
                />
                <TouchableWithoutFeedback onPress={this.handleSend}>
                  <Animated.View style={[styles.sendButton, sendButtonStyle]}>
                    <Text style={styles.sendText}>Send</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </Animated.View>
            }

            {!success && <Animated.View style={notifyTextStyle}>
              <Text style={styles.notifyText}>Notify Me</Text>
            </Animated.View>
            }

            {success && <Animated.View style={thankYouTextStyle}>
              <Text style={styles.notifyText}>Thank You</Text>
            </Animated.View>  
            }

          </Animated.View>
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
    backgroundColor: "#FF7B73"
  },
  buttonWrap: {
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  notifyText: {
    color: "#FF7B73",
    fontWeight: "bold"
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 4,
  },
  sendButton: {
    backgroundColor: "#FF7B73",
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  sendText: {
    color: "#FFF"
  }
});

export default ExpandingNotifyInput
