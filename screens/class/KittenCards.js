import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";

import clamp from 'clamp';

// TODO: get cat images

// TODO: re-implement with react-native-gesture-handler, react-native-reanimated,
//       or react-spring

import Brooke from '../../assets/brooke.jpg';
import Deena from '../../assets/deena.jpg';
import James from '../../assets/james.jpg';
import Jordan from '../../assets/jordan.jpg';

const SWIPE_THRESHOLD = 120;
const { height } = Dimensions.get('window');

const items = [
    {
        image: Brooke,
        id: 1,
        text: 'Sweet Cat'
    },
    {
        image: Deena,
        id: 2,
        text: 'Sweeter Cat'
    },
    {
        image: James,
        id: 3,
        text: 'Sweetest Cat'
    },
    {
        image: Jordan,
        id: 4,
        text: 'Aww'
    }
]

class KittenCards extends Component {
  state = {
    //items: [
        // {
        //     image: Brooke,
        //     id: 1,
        //     text: 'Sweet Cat'
        // },
        // {
        //     image: Deena,
        //     id: 2,
        //     text: 'Sweeter Cat'
        // },
        // {
        //     image: James,
        //     id: 3,
        //     text: 'Sweetest Cat'
        // },
        // {
        //     image: Jordan,
        //     id: 4,
        //     text: 'Aww'
        // }
    //],
    items: items,
    animation: new Animated.ValueXY(),
    opacity: new Animated.Value(1),
    next: new Animated.Value(.9)
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            {
                dx: this.state.animation.x,
                //dy: this.state.animation.y
            }
        ]),
        onPanResponderRelease: (e, { dx, vx, vy }) => {
            let velocity;

            //moving right
            if (vx >= 0) {
                velocity = clamp(vx, 3, 5);
            // moving left
            } else if (vx < 0) {
                velocity = clamp(Math.abs(vx), 3, 5) * -1;
            }

            if (Math.abs(dx) > SWIPE_THRESHOLD) {
                Animated.decay(this.state.animation, {
                    velocity: { x: velocity, y: vy },
                    deceleration: .98
                }).start(this.transitionNext);
            } else {
                Animated.spring(this.state.animation, {
                    toValue: { x: 0, y: 0 },
                    friction: 4
                }).start();
            }
        }
    });
  }

  // TODO: spring doesn't look good / work 
  transitionNext = () => {
      Animated.parallel([
          Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 300
          }),
          Animated.spring(this.state.next, {
              toValue: 1,
              friction: 4
          })
      ]).start();

      this.setState((state) => {
          return {
            items: state.items.slice(1)
          }
      }, () => {
          this.state.next.setValue(.9);
          this.state.opacity.setValue(1);
          this.state.animation.setValue({ x: 0, y: 0});

          if (this.state.items.length === 0) {
              this.setState({ items });
          }
      });
  }

  handleNo = () => {
    Animated.timing(this.state.animation.x, {
        toValue: -SWIPE_THRESHOLD,
    }).start(this.transitionNext);
  }

  handleYes = () => {
    Animated.timing(this.state.animation.x, {
        toValue: SWIPE_THRESHOLD,
    }).start(this.transitionNext);
  }

  render() {
    const items = this.state.items.slice(0, 2).reverse();

    const { animation } = this.state;

    const rotate = animation.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-30deg', '0deg', '30deg'],
        extrapolate: 'clamp'
    });

    const opacity = animation.x.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: [.5, 1, .5],
        extrapolate: 'clamp'
    });

    const animatedCardStyles = {
        transform: [
            { rotate },
            ...this.state.animation.getTranslateTransform()
        ],
        opacity: this.state.opacity
    };

    const animatedImageStyles = {
        opacity
    };

    const yesOpacity = animation.x.interpolate({ inputRange: [0, 150], outputRange: [0, 1] });
    const yesScale = animation.x.interpolate({
      inputRange: [0, 150],
      outputRange: [0.5, 1],
      extrapolate: "clamp",
    });
    const animatedYupStyles = {
      transform: [{ scale: yesScale }, { rotate: "-30deg" }],
      opacity: yesOpacity,
    };

    const noOpacity = animation.x.interpolate({ inputRange: [-150, 0], outputRange: [1, 0] });
    const noScale = animation.x.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    const animatedNopeStyles = {
      transform: [{ scale: noScale }, { rotate: "30deg" }],
      opacity: noOpacity,
    };

    return (
      <View style={styles.container}>
        <View style={styles.top}>
            { items.map(({ image, id, text }, index, items) => {
                const isLastItem = index === items.length - 1;
                const isSecondToLast = index === items.length - 2;
    
                const panHandlers = isLastItem ? this._panResponder.panHandlers : {};

                const cardStyle = isLastItem ? animatedCardStyles : undefined;
                const imageStyle = isLastItem ? animatedImageStyles : undefined;

                const nextCardStyle = isSecondToLast ? {
                    transform: [{ scale: this.state.next }]
                } : undefined;

                return (
                    <Animated.View 
                        key={id} 
                        style={[styles.card, cardStyle, nextCardStyle]}
                        {...panHandlers}
                    >
                        <Animated.Image
                            source={image}
                            resizeMode='cover'
                            style={[styles.image, imageStyle]}
                        />
                        <View style={styles.lowerText}>
                            <Text>{text}</Text>
                        </View>

                        {isLastItem &&
                        <Animated.View style={[styles.nope, animatedNopeStyles]}>
                            <Text style={styles.nopeText}>Nope!</Text>
                        </Animated.View>}

                        {isLastItem &&
                        <Animated.View style={[styles.yup, animatedYupStyles]}>
                            <Text style={styles.yupText}>Yup!</Text>
                        </Animated.View>}
                    </Animated.View>
                )
            }) }
        </View>
        <View style={styles.buttonBar}>
            <TouchableOpacity
                onPress={this.handleNo}
                style={[styles.button, styles.nopeButton]}
            >
                <Text style={styles.nopeText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={this.handleYes}
                style={[styles.button, styles.yupButton]}
            >
                <Text style={styles.yupText}>YES</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    card: {
        width: 300,
        height: 300,
        position: 'absolute',
        borderRadius: 3,
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowOffset: { x: 0, y: 0 },
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: 'white'
    },
    image: {
        width: null,
        height: null,
        flex: 3,
        borderRadius: 2
    },
    lowerText: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5
    },
    button: {
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.3,
        shadowOffset: { x: 0, y: 0 },
        shadowRadius: 5,
      },
      yupButton: {
        shadowColor: "green",
      },
      nopeButton: {
        shadowColor: "red",
      },
      yup: {
        borderColor: "green",
        borderWidth: 2,
        position: "absolute",
        padding: 20,
        borderRadius: 5,
        top: 20,
        left: 20,
        backgroundColor: "#FFF",
      },
      yupText: {
        fontSize: 16,
        color: "green",
      },
      nope: {
        borderColor: "red",
        borderWidth: 2,
        position: "absolute",
        padding: 20,
        borderRadius: 5,
        right: 20,
        top: 20,
        backgroundColor: "#FFF",
      },
      nopeText: {
        fontSize: 16,
        color: "red",
      },
    
});

export default KittenCards
