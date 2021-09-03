import React, { Component } from 'react';
import Header from '../components/Header';
import Quiz from '../components/Quiz';

export default class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <Quiz />
      </>
    );
  }
}
