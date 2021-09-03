import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(
      () => this.setState((previousTime) => ({ timer: previousTime.timer - 1 }), () => {
        const { timer } = this.state;
        const maximumTime = 0;
        if (timer === maximumTime) {
          clearInterval(this.interval);
        }
      }),
      ONE_SECOND,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <p>
          Tempo:
          { timer }
        </p>
      </div>
    );
  }
}

export default Timer;

// https://www.youtube.com/watch?v=NAx76xx40jM
// https://www.youtube.com/watch?v=sWKz9aLovjY
// https://www.youtube.com/watch?v=RwlFyS1Rhew
