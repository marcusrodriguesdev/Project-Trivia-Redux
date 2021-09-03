import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimer } from '../../redux/actions';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
    };
    this.limiteTempo = this.limiteTempo.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    this.limiteTempo();
  }

  limiteTempo() {
    const { time } = this.state;
    const { isTimer, setTimeGlobal } = this.props;
    const LIMIT_SECONDS = 0;
    if (time === LIMIT_SECONDS || isTimer) {
      setTimeGlobal(true);
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <h1>{time}</h1>
      </div>
    );
  }
}

StopWatch.propTypes = {
  isTimer: PropTypes.bool.isRequired,
  setTimeGlobal: PropTypes.func.isRequired,
};

const MapStateToProps = (state) => ({
  isTimer: state.game.stopWatch.isTimer,

});

const MapDispatchToProps = (dispatch) => ({

  setTimeGlobal: (payload) => dispatch(setTimer(payload)),

});

export default connect(MapStateToProps, MapDispatchToProps)(StopWatch);
