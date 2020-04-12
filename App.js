/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

//import {AppRegistry} from 'react-native';
import GameApp from './src/components/GameApp';
//import {Provider as ReduxProvider} from 'react-redux';
//import configureStore from './redux/configureStore';
class App extends Component {
  state = {
    gameId: 1,
  };

  resetGame = () => {
    this.setState((prevState) => ({
      gameId: prevState.gameId + 1,
    }));
  };
  render() {
    return (
      //<ReduxProvider store={store}>
      <GameApp
        key={this.state.gameId}
        onPlayAgain={this.resetGame}
        randomNumberCount={6}
        numbersOfSumRequired={4}
        initalSeconds={10}
      />
      //</ReduxProvider>
    );
  }
}

export default App;
