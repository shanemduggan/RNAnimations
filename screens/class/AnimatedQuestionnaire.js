import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";

class AnimatedQuestionnaire extends Component {
  state = {
    index: 0,
    questions: [
      "Do you tend to follow directions when given?",
      "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
      "Would you enjoy making sure your customers leave happy?",
      "Are you willing to work nights and weekends (and possibly holidays)?",
    ],
    animation: new Animated.Value(0),
    progress: new Animated.Value(0)
  }

  handleAnswer = () => {
    Animated.parallel([
      Animated.timing(this.state.progress, {
        toValue: this.state.index + 1,
        duration: 400,
        useNativeDriver: false
      }),
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      })
  ]).start((() => {
      this.setState((state) => {
        return {
          index: state.index + 1
        }
      }, () => {
        this.state.animation.setValue(0);
      });
    }));
  }

  render() {
    const { progress, animation, questions, index } = this.state;
    const { width } = Dimensions.get('window');

    const mainQuestionInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -width]
    });

    const nextQuestionInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0]
    });

    const progressInterpolate = progress.interpolate({
      inputRange: [0, questions.length],
      outputRange: ['0%', '100%']
    });

    const mainQuestionStyle = {
      transform: [
        {
          translateX: mainQuestionInterpolate
        }
      ]
    };

    const nextQuestionStyle = {
      transform: [
        {
          translateX: nextQuestionInterpolate
        }
      ]
    };

    const progressStyle = {
      width: progressInterpolate
    };

    const question = questions[index];
    let nextQuestion;
    
    if (index + 1 < questions.length) {
      nextQuestion = questions[index + 1];
    }

    return (
      <View style={styles.container}>

        <View style={[StyleSheet.absoluteFill, styles.overlay]}>
          <Animated.Text style={[styles.questionText, mainQuestionStyle]}>
            {question}
          </Animated.Text>
          <Animated.Text style={[styles.questionText, nextQuestionStyle]}>
            {nextQuestion}
          </Animated.Text>
        </View>

        <View style={styles.progress}>
          <Animated.View style={[styles.bar, progressStyle]} />
        </View>

        <TouchableOpacity 
          onPress={this.handleAnswer} 
          activeOpacity={.7}
          style={styles.option}
        >
          <Text style={styles.optionText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={this.handleAnswer} 
          activeOpacity={.7}
          style={[styles.option, styles.yes]}
        >
          <Text style={styles.optionText}>Yes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E22D4B',
    flexDirection: 'row'
  },
  option: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  yes: {
    backgroundColor: 'rgba(255,255,255, .1)'
  },
  optionText: {
    fontSize: 30,
    color: 'white',
    marginBottom: 50
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  questionText: {
    position: 'absolute',
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  progress: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 10
  },
  bar: {
    height: '100%',
    backgroundColor: 'white'
  }
});

export default AnimatedQuestionnaire
