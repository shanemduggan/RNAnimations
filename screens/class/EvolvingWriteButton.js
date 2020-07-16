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
    animation: new Animated.Value(0)
  }

  render() {

    const { width } = Dimensions.get('window');


    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={styles.center}>
          <Animated.View style={[styles.editor, { width: width - 40}]}>
            <View style={styles.bar}>
              <Animated.View style={[styles.toolbar]}>
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
                style={[StyleSheet.absoluteFill, styles.center]}
              >
                <TouchableWithoutFeedback>
                  <View>
                    <Text style={styles.buttonText}>Write</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>

            </View>
            <Animated.View style={[styles.lowerView]}>
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
  }
});

export default EvolvingWriteButton
