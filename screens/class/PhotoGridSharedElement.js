import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

import images from '../../assets/photogrid/images';

const { width } = Dimensions.get('window');

const GRID_IMAGE_WIDTH = width / 3;

class PhotoGridSharedElement extends Component {
  state = {
    activeImage: null,
    activeIndex: null,
    size: new Animated.ValueXY(),
    position: new Animated.ValueXY(),
    animation: new Animated.Value(0)
  }

  componentWillMount() {
    this._gridImages = {};
  }

  handleOpenImage = (index) => {
    this._gridImages[index].measure((x, y, width, height, pageX, pageY) => {
      this._x = pageX;
      this._y = pageY;
      this._width = width;
      this._height = height;

      this.state.position.setValue({
        x: pageX,
        y: pageY
      });

      this.state.size.setValue({
        x: width,
        y: height
      });

      this.setState({
        activeImage: images[index],
        activeIndex: index
      }, () => {
        this._viewImage.measure((tX, tY, tWidth, tHeight, tPageX, tPageY) => {
          Animated.parallel([
            Animated.spring(this.state.position.x, {
            //  toValue: tPageX,
              toValue: tX
            }),
            Animated.spring(this.state.position.y, {
            //  toValue: tPageY
              toValue: tY
            }),
            Animated.spring(this.state.size.x, {
              toValue: tWidth
            }),
            Animated.spring(this.state.size.y, {
              toValue: tHeight
            }),
            Animated.spring(this.state.animation, {
              toValue: 1
            })
          ]).start();
        });
      });
    });
  }

  // TODO: there's something wrong with the this._y & this._x
  handleClose = () => {
    Animated.parallel([
      Animated.timing(this.state.position.x, {
        toValue: this._x,
        duration: 250
      }),
      Animated.timing(this.state.position.y, {
        toValue: this._y,
        duration: 250
      }),
      Animated.timing(this.state.size.x, {
        toValue: this._width,
        duration: 250
      }),
      Animated.timing(this.state.size.y, {
        toValue: this._height,
        duration: 250
      }),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 250
      })
    ]).start((() => {
      this.setState({
        activeImage: null,
        activeIndex: null
      })
    }));
  }

  render() {
    const animatedContentTranslate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0]
    });

    const animatedContentStyles = {
      opacity: this.state.animation,
      transform: [
        {
          translateY: animatedContentTranslate
        }
      ]
    };

    const activeImageStyle = {
      width: this.state.size.x,
      height: this.state.size.y,
      top: this.state.position.y,
      left: this.state.position.x
    }

    const activeIndexStyle = {
      opacity: this.state.activeImage ? 0 : 1
    }

    const animatedCloseStyle = {
      opacity: this.state.animation
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.grid}>
            { images.map((src, index) => {
              const style = index === this.state.activeIndex ? activeIndexStyle : undefined;
              return (
                <TouchableWithoutFeedback 
                  key={index}
                  onPress={() => this.handleOpenImage(index)}
                >
                  <Image 
                    source={src}
                    style={[styles.gridImage, style]}
                    resizeMode='cover'
                    ref={image => this._gridImages[index] = image}
                  />
                </TouchableWithoutFeedback>
              )
            })}
          </View>
        </ScrollView>

        <View 
          style={[StyleSheet.absoluteFill, { flex: 1, position: 'absolute', top: 0}]}
          pointerEvents={this.state.activeImage ? 'auto' : 'none'}
        >
            <View
              style={styles.topContent}
              ref={image => this._viewImage = image}
            >
              <Animated.Image
                key={this.state.activeImage}
                source={this.state.activeImage}
                resizeMode='cover'
                style={[styles.viewImage, activeImageStyle]}
              />
            </View>
            <Animated.View
              style={[styles.content, animatedContentStyles]}
            >
              <Text style={styles.title}>
                Pretty Image from Unsplash
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis interdum
                porttitor. Nam lorem justo, aliquam id feugiat quis, malesuada sit amet massa. Sed
                fringilla lorem sit amet metus convallis, et vulputate mauris convallis. Donec
                venenatis tincidunt elit, sed molestie massa. Fusce scelerisque nulla vitae mollis
                lobortis. Ut bibendum risus ac rutrum lacinia. Proin vel viverra tellus, et venenatis
                massa. Maecenas ac gravida purus, in porttitor nulla. Integer vitae dui tincidunt,
                blandit felis eu, fermentum lorem. Mauris condimentum, lorem id convallis fringilla,
                purus orci viverra metus, eget finibus neque turpis sed turpis.
              </Text>
            </Animated.View>
            <TouchableWithoutFeedback onPress={this.handleClose}>
              <Animated.View style={[styles.close, animatedCloseStyle]}>
                <Text style={styles.closeText}>X</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridImage: {
    width: GRID_IMAGE_WIDTH,
    height: 150
  },
  topContent: {
    flex: 1,
  },
  content: {
    flex: 2,
    backgroundColor: 'white'
  },
  viewImage: {
    width: null,
    height: null,
    position: 'absolute',
    top: 0,
    left: 0
  },
  title: {
    fontSize: 28
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  closeText: {
    fontSize: 28,
    color: 'white'
  }
});

export default PhotoGridSharedElement
