/**
 * @format
 */

import App from './App';
import {name as appName} from './app.json';
<script src="http://localhost:8097" />;
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

export default class SumOfNumbers extends Component {
  render() {
    console.log('Hello RN!!');
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello World...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

//AppRegistry.registerComponent(appName, () => SumOfNumbers);
AppRegistry.registerComponent(appName, () => App);
