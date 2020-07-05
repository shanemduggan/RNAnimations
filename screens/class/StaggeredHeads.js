import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
} from "react-native";

import Brooke from '../../assets/brooke.jpg';
import Deena from '../../assets/deena.jpg';
import James from '../../assets/james.jpg';
import Jordan from '../../assets/jordan.jpg';

class StaggeredHeads extends Component {
  state = {
    heads: [
      {
        image: Brooke,
        animation: new Animated.ValueXY(),
        text: 'Drag Me'
      },
      {
        image: Deena,
        animation: new Animated.ValueXY()
      },
      {
        image: James,
        animation: new Animated.ValueXY()
      },
      {
        image: Jordan,
        animation: new Animated.ValueXY()
      }
    ]
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.heads.map(({ animation }) => {
          animation.extractOffset();
          animation.setValue({ x: 0, y: 0});
        });
      },
      onPanResponderMove: (e, { dx, dy }) => {
        this.state.heads[0].animation.setValue({ 
          x: dx,
          y: dy
        });

        this.state.heads.slice(1).map(({ animation }, index) => {
          Animated.sequence([
            Animated.delay(index * 10),    
            Animated.spring(animation, {
              toValue: { x: dx, y: dy },
              useNativeDriver: true
            })
          ]).start()
        });
      }
    })
  }

  // TODO: figure out how to smooth out
  render() {
    const heads = this.state.heads.slice(0).reverse();
    return (
      <View>
        { heads.map((item, index, items) => {
          const pan = index === items.length - 1 ?
          this._panResponder.panHandlers : {};

          const transform = { transform: item.animation.getTranslateTransform() }

          return (
            <Animated.Image
              {...pan}
              key={index}
              source={item.image}
              style={[ 
                styles.head, 
                transform
              ]}
            />
          )
        })}
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
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default StaggeredHeads
