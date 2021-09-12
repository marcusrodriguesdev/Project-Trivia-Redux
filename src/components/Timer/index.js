import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTime } from '../../redux/actions/gameActions';

import './style.css';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer() {
    const second = 10;
    this.interval = setInterval(() => {
      this.countDown();
    }, second);
  }

  countDown() {
    const { setTimeOver, setTimeRedux, time } = this.props;
    setTimeRedux(time - 1);
    if (time <= 0) {
      clearInterval(this.interval);
      setTimeOver();
    }
  }

  render() {
    const { time, guessed } = this.props;
    const MAX_TIME = 3000;

    if (guessed) clearInterval(this.interval);

    return (
      <div className="time-bar">
        <div
          className="time-progress"
          style={ { width: `${(time * 100) / MAX_TIME}%` } }
        />
      </div>
    );
  }
}

Timer.propTypes = {
  setTimeOver: PropTypes.func.isRequired,
  setTimeRedux: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  guessed: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ game }) => ({
  time: game.time,
  guessed: game.guessed,
});

const mapDispatchToProps = (dispatch) => ({
  setTimeRedux: (time) => dispatch(setTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
