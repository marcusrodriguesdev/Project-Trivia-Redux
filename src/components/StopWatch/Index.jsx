import React, { Component } from 'react';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
      limitTime: false,
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
    const { time, limitTime } = this.state;
    const LIMIT_SECONDS = 0;
    if (time === LIMIT_SECONDS) {
      this.setState(({
        time: 30,
        limitTime: true,
      }));
      clearInterval(this.intervalId);
      console.log(limitTime);
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

export default Index;
