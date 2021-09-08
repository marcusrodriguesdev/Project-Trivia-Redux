import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };
    this.handleChronometer = this.handleChronometer.bind(this);
    this.setTimer = this.setTimer.bind(this);
  }

  setTimer() {
    const { timer } = this.state;
    this.handleChronometer();
    return (
      <p>
        { timer }
      </p>);
  }

  handleChronometer() {
    const INTERVAL = 1000;
    const ONE_SECOND = 1;
    const { timer } = this.state;
    if (timer > 0) {
      setTimeout(() => {
        const time = timer - ONE_SECOND;
        this.setState({
          timer: time,
        });
      }, INTERVAL);
    }
  }

  render() {
    return (
      <>
        {this.setTimer()}
      </>
    );
  }
}

export default Timer;
