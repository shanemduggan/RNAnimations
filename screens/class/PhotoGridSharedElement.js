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
    size: new Animated.ValueXY(),
    position: new Animated.ValueXY(),
    animation: new Animated.Value(0)
  }

  componentWillMount() {
    this._gridImages = [];
  }

  handleOpenImage = (index) => {

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.grid}>
            { images.map((src, index) => {
              return (
                <TouchableWithoutFeedback 
                  key={index}
                  onPress={() => this.handleOpenImage(index)}
                >
                  <Image 
                    source={src}
                    style={styles.gridImage}
                    resizeMode='cover'
                    ref={image => this._gridImages[index] = image}
                  />
                </TouchableWithoutFeedback>
              )
            })}
          </View>
        </ScrollView>

        <View 
          style={StyleSheet.absoluteFill}
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
                style={[styles.viewImage]}
              />
            </View>
            <Animated.View
              style={[styles.content]}
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
    backgroundColor: 'white',
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
  }
});

export default PhotoGridSharedElement
