import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Link from '../components/Link';

import { animations } from '../constants';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          { animations.reverse().map((name) => 
            <Link 
              key={name} 
              text={name} 
              screen={name} 
            />
          )}
        </ScrollView>
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
