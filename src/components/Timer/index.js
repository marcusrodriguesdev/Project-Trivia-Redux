import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTime } from '../../redux/actions/gameActions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
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
    const { timer } = this.state;
    const { setTimeOver, setTimeRedux } = this.props;
    this.setState({
      timer: timer - 1,
    });
    setTimeRedux(timer - 1);
    if (timer === 1) {
      clearInterval(this.interval);
      setTimeOver();
    }
  }

  render() {
    const { timer } = this.state;

    return (
      <h2>{timer}</h2>
    );
  }
}

Timer.propTypes = {
  setTimeOver: PropTypes.func.isRequired,
  setTimeRedux: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setTimeRedux: (time) => dispatch(setTime(time)),
});

export default connect(null, mapDispatchToProps)(Timer);
