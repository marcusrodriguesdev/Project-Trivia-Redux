import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTime } from '../../redux/actions/gameActions';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const second = 1000;
    this.interval = setInterval(() => {
      this.countDown();
    }, second);
  }

  countDown() {
    const { setTimeOver, setTimeRedux, time } = this.props;
    setTimeRedux(time - 1);
    if (time === 1) {
      clearInterval(this.interval);
      setTimeOver();
    }
  }

  render() {
    const { time, guessed } = this.props;

    if (guessed) clearInterval(this.interval);

    return (
      <h2>{time}</h2>
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
