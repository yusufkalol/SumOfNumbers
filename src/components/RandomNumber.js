import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class RandomNumber extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  handlePress = () => {
    console.log(this.props.number);
    if (this.props.isDisabled) {
      return;
    }
    this.props.onPress(this.props.id);
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text
          style={[styles.random, this.props.isDisabled && styles.disabled]}
          key={this.props.id}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  random: {
    color: '#9315a3',
    marginHorizontal: 15,
    width: 100,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
});
export default RandomNumber;
