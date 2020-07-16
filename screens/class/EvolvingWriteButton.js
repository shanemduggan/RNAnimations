import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Text,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class EvolvingWriteButton extends Component {
  state = {
    animation: new Animated.Value(0),
    isOpen: false
  }

  onPress = () => {
    const toValue = this._open ? 0 : 1;

    Animated.timing(this.state.animation, {
      toValue,
      duration: 750
    }).start((() => {
      this._open ? this._input.blur() : this._input.focus();

      this._open = !this._open;
      this.setState({ isOpen: this._open });
    }));
  }

  render() {
    const { width } = Dimensions.get('window');

    const widthInterpolate = this.state.animation.interpolate({
      inputRange: [0, .5],
      outputRange: [100, width - 40],
      extrapolate: 'clamp'
    });

    const editorStyle = {
      width: widthInterpolate
    };

    const opacityToolbarInterpolate = this.state.animation.interpolate({
      inputRange: [0, .5],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const toolbarStyles = {
      opacity: opacityToolbarInterpolate
    };

    const editorHeightInterpolate = this.state.animation.interpolate({
      inputRange: [.7, 1],
      outputRange: [0, 150],
      extrapolate: 'clamp'
    });

    const inputStyle = {
      opacity: this.state.animation,
      height: editorHeightInterpolate
    };

    const opacityButtonInterpolate = this.state.animation.interpolate({
      inputRange: [0, .5],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const buttonStyle = {
      opacity: opacityButtonInterpolate
    };

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={styles.center}>
          <TouchableWithoutFeedback onPress={this.onPress}>
            <Animated.View style={toolbarStyles}>
              <Text style={styles.close}>Close</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.editor, editorStyle]}>
            <View style={styles.bar}>
              <Animated.View style={[styles.toolbar, toolbarStyles]}>
                <Icon name='format-bold' color='#FFF' size={20} />
                <Icon name='format-italic' color='#FFF' size={20} />
                <Icon name='format-underline' color='#FFF' size={20} />
                <Icon name='format-list-bulleted' color='#FFF' size={20} />
                <Icon name='format-list-numbered' color='#FFF' size={20} />
             
                <View style={styles.rightInnerBar}>
                  <Icon name='link' color='#FFF' size={20} />
                  <Icon name='image' color='#FFF' size={20} />
                  <Icon name='arrow-down-bold-box' color='#FFF' size={20} />
                </View>
              </Animated.View>

              <Animated.View
                style={[StyleSheet.absoluteFill, styles.center, buttonStyle]}
                pointerEvents={this.state.isOpen ? 'none' : 'auto'}
              >
                <TouchableWithoutFeedback onPress={this.onPress}>
                  <View>
                    <Text style={styles.buttonText}>Write</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>

            </View>
            <Animated.View style={[styles.lowerView, inputStyle]}>
              <TextInput
                placeholder='Start writing ...'
                multiline
                ref={input => this._input = input}
                style={[StyleSheet.absoluteFill, styles.input]}
              />
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  editor: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.1)'
  },
  bar: {
    height: 50,
    backgroundColor: '#2979FF',
    justifyContent: 'center'
  },
  toolbar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  rightInnerBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  lowerView: {
    height: 150
  },
  input: {
    padding: 10,
    fontSize: 20
  },
  buttonText: {
    color: '#FFF'
  },
  close: {
    color: '#2979FF',
    marginBottom: 20
  }
});

export default EvolvingWriteButton
