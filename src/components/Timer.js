import React from 'react';
import PropTypes from 'prop-types';

export default class Timer extends React.Component {
  constructor() {
    super();
    this.timerSet = this.timerSet.bind(this);
    this.shouldClearInterval = this.shouldClearInterval.bind(this);
  }

  componentDidMount() {
    this.timerSet();
  }

  shouldClearInterval() {
    const { time } = this.props;
    console.log(time);
    if (time === 0) {
      clearInterval(this.timer);
    }
  }

  timerSet() {
    const { setTimer } = this.props;
    const ONE_SECOND = 1000;

    this.timer = setInterval(() => {
      setTimer(this.shouldClearInterval);
    }, ONE_SECOND);
  }

  render() {
    const { time } = this.props;
    return (
      <div className="timer">
        <p>{ time }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.string,
  setTimer: PropTypes.func,
}.isRequired;
