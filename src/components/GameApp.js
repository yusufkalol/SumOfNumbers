import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, YellowBox} from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class GameApp extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    numbersOfSumRequired: PropTypes.number.isRequired,
    initalSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };
  state = {
    selectedIds: [],
    remaningSeconds: this.props.initalSeconds,
  };
  gameStatus = 'PLAYING';
  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  shuffledNumbers = shuffle(this.randomNumbers);
  sumNumber = this.randomNumbers
    .slice(
      0,
      this.props.randomNumberCount -
        this.props.randomNumberCount / this.props.numbersOfSumRequired,
    )
    .reduce((acc, curr) => acc + curr, 0);
  isNumberSelected = (randomNumberIndex) => {
    return this.state.selectedIds.indexOf(randomNumberIndex) >= 0;
  };
  selectNumber = (randomNumberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, randomNumberIndex],
    }));
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => {
          return {remaningSeconds: prevState.remaningSeconds - 1};
        },
        () => {
          if (this.state.remaningSeconds === 0) {
            clearInterval(this.intervalId);
          }
        },
      );
    }, 1000);
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (
      nextState.selectedIds !== this.state.selectedIds ||
      nextState.remaningSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState);
      if (this.gameStatus === 'WON') {
        clearInterval(this.intervalId);
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  calcGameStatus = (nextState) => {
    const sumComputed = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledNumbers[curr];
    }, 0);
    if (nextState.remaningSeconds === 0) {
      return 'TIME_OVER';
    }
    if (sumComputed === this.sumNumber) {
      return 'WON';
    }
    if (sumComputed < this.sumNumber) {
      return 'PLAYING';
    }
    return 'LOST';
  };

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={[styles.conatiner]}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.sumNumber}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffledNumbers.map((randomNumber, index) => (
            <RandomNumber
              style={styles.number}
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={
                this.isNumberSelected(index) || gameStatus !== 'PLAYING'
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>
        {gameStatus !== 'PLAYING' && (
          <Button title="PLAY AGAIN" onPress={this.props.onPlayAgain} />
        )}
        <Text style={styles.timer}>{this.state.remaningSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#166d9c',
  },
  target: {
    fontSize: 40,
    marginHorizontal: 50,
    textAlign: 'center',
  },
  randomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#c79f10',
    marginHorizontal: 50,
    marginVertical: 100,
  },
  number: {
    fontWeight: 'bold',
  },
  STATUS_PLAYING: {
    backgroundColor: 'white',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
  STATUS_TIME_OVER: {
    backgroundColor: 'red',
  },
  timer: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 20,
  },
});
export default GameApp;
