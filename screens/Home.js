import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Link from '../components/Link';

import { animations } from '../constants';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        { animations.map((name) => <Link key={name} text={name} screen={name} />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
