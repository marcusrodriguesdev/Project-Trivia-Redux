import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: 30 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.timeLeftVar();
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    const { diff, right } = this.props;
    const { seconds } = this.state;
    const values = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const dez = 10;
    const actualStorage = JSON.parse(localStorage.getItem('player'));
    if (actualStorage.score) {
      actualStorage.score = actualStorage.score + dez + (values[diff] * Number(seconds));
      actualStorage.assertions += 1;
    } else {
      actualStorage.score = dez + (values[diff] * Number(seconds));
    }
    if (right) { localStorage.setItem('player', JSON.stringify(actualStorage)); }
    // const email = JSON.parse(localStorage.getItem('player')).gravatarEmail;
    // const gravatar = md5(email).toString();
    // const storage = JSON.stringify([{
    //   name: JSON.parse(localStorage.getItem('player')).name,
    //   score: dez + (values[diff] * Number(seconds)),
    //   picture: gravatar,
    // }]);
    // localStorage.setItem('ranking', storage);
  }

  // componentWillUnmount() {
  // }
  // ENVIAR PARA O REDUX O TEMPO ATUAL
  secondsToTime(secs) {
    const seconds = Math.ceil(secs);
    const obj = {
      seconds,
    };
    return obj;
  }

  timeLeftVar() {
    const { seconds } = this.state;
    const timeLeftVar = this.secondsToTime(seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    const { seconds } = this.state;
    const number = 1000;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, number);
    }
  }

  countDown() {
    const { seconds } = this.state;
    const sec = seconds - 1;
    this.setState({
      time: this.secondsToTime(sec),
      seconds: sec,
    });

    if (sec === 0) {
      const { switchButton } = this.props;
      clearInterval(this.timer);
      switchButton();
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <h2>{time.seconds}</h2>
      </div>
    );
  }
}

Timer.propTypes = {
  switchButton: PropTypes.func.isRequired,
};

export default Timer;
