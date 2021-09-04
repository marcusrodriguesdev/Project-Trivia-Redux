import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setIsClicked, updateTimer } from '../../Redux/Action';

class Timer extends Component {
  constructor() {
    super();
    this.setTime = this.setTime.bind(this);

    this.state = {
      timer: 30,
      refInterval: null,
    };
  }

  componentDidMount() {
    this.setTime();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { timer, refInterval } = nextState;
    const { toggleDisabled } = nextProps;

    if (timer < 0) {
      clearInterval(refInterval);
      toggleDisabled();
      return false;
    }
    return true;
  }

  setTime() {
    const ONE_SEC = 1000;

    const interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SEC);
    this.setState({
      refInterval: interval,
    });
  }

  render() {
    const { timer } = this.state;
    const { newTime, globalTime } = this.props;
    newTime(timer);

    return (
      <div>
        { globalTime }
      </div>
    );
  }
}

const mapStateToProps = ({ trivia }) => ({
  globalTime: trivia.timer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDisabled: () => dispatch(setIsClicked()),
  newTime: (time) => dispatch(updateTimer(time)),
});

Timer.propTypes = {
  toggleDisabled: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
