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
    const { isRunning, timeExpired, counter, instaLose } = this.props;

    if (prevState.seconds === 1) {
      clearInterval(this.timer);
      timeExpired();
      instaLose();
    }
    if (!isRunning) {
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
  instaLose: Proptypes.func,
}.isRequired;
