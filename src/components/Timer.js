import React, { Component } from 'react';
import Proptypes from 'prop-types';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isRunning, timeExpired, counter, getTime } = this.props;
    const { seconds } = this.state;

    if (prevState.seconds === 1) {
      clearInterval(this.timer);
      timeExpired();
    }
    if (!isRunning) {
      getTime(seconds);
      clearInterval(this.timer);
    }
    if (prevProps.counter !== counter) {
      this.startTimer();
    }
  }

  startTimer() {
    this.setState({ seconds: 30 });
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  // handleDifficulty() {
  //   const { difficulty } = this.props;
  //   const hardValue = 3;
  //   const mediumValue = 2;
  //   const easyValue = 1;
  //   if (difficulty === 'hard') return hardValue;
  //   if (difficulty === 'medium') return mediumValue;
  //   if (difficulty === 'easy') return easyValue;
  // }

  // handlePoints(timeLeft, difficulty) {
  //   const correctAnswer = 10;
  //   // const totalPoints = parseFloat(localStorage.getItem('points'));
  //   const difficultyValue = handleDifficulty(difficulty);
  //   const currentPoints = correctAnswer + (timeLeft * difficultyValue) + totalPoints;
  //   localStorage.setItem('points', JSON.stringify(currentPoints));
  // }

  render() {
    const { seconds } = this.state;
    return (
      <h2>
        { seconds > 0 ? seconds : 0 }
      </h2>
    );
  }
}

Timer.propTypes = {
  isRunning: Proptypes.bool,
  timeExpired: Proptypes.func,
  counter: Proptypes.number,
}.isRequired;
