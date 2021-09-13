import React, { Component } from 'react';
import Proptypes from 'prop-types';
import timerIcon from '../timer-icon.svg';

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
    const { isRunning, timeExpired, counter } = this.props;

    if (prevState.seconds === 1) {
      clearInterval(this.timer);
      timeExpired();
    }
    if (!isRunning) {
      clearInterval(this.timer);
    }
    if (prevProps.counter !== counter) {
      this.startTimer();
    }
  }

  startTimer() {
    const { getRemainingTime } = this.props;
    const { seconds } = this.state;
    getRemainingTime(seconds);
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
      <div className="timer-container">
        <img src={ timerIcon } alt="icone relógio timer" className="timer-icon" />
        <h2 className="timer">
          {`${seconds > 0 ? seconds : 0} segundos`}
        </h2>
      </div>
    );
  }
}

Timer.propTypes = {
  isRunning: Proptypes.bool,
  timeExpired: Proptypes.func,
  counter: Proptypes.number,
}.isRequired;
