import React, { Component } from 'react';
import Proptypes from 'prop-types';

export default class Timer extends Component {
  constructor() {
    super();

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.timer = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { instaLose, running } = this.props;
    if (prevState.seconds === 1) {
      clearInterval(this.timer);
      instaLose();
    }
    if (!running) {
      clearInterval(this.timer);
    }
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
  running: Proptypes.bool.isRequired,
  instaLose: Proptypes.func.isRequired,
};
