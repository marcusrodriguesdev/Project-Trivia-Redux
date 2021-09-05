import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  changeVisibility,
  getSeconds as getSecondsAction,
  setIsClicked,
  toggleStatusCronometer,
} from '../../Redux/Action';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: props.seconds,
    };

    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    this.setTime();
  }

  shouldComponentUpdate(_, prevState) {
    const {
      toggleDisabled,
      toggleVisibility,
    } = this.props;
    const MIN_SECONDS = 0;
    if (prevState.seconds < MIN_SECONDS) {
      clearInterval(this.interval);
      toggleDisabled();
      toggleVisibility();
      return false;
    }
    return true;
  }

  setTime() {
    const ONE_SEC = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SEC);
  }

  render() {
    const { seconds } = this.state;
    const { getSeconds } = this.props;
    getSeconds(seconds);

    return (
      <div>
        { seconds }
      </div>
    );
  }
}

const mapStateToProps = ({ timer }) => ({
  statusCronometer: timer.statusCronometer,
  seconds: timer.seconds,
});

const mapDispatchToProps = (dispatch) => ({
  toggleVisibility: () => dispatch(changeVisibility()),
  toggleDisabled: () => dispatch(setIsClicked()),
  getSeconds: (seconds) => dispatch(getSecondsAction(seconds)),
  setStatusCronometer: (status) => dispatch(toggleStatusCronometer(status)),
});

Timer.propTypes = {
  toggleDisabled: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
