import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTimer } from '../redux/actions';

class Timer extends React.Component {
// A base desse código foi retirada do código do Timer que o Ícaro fez em aula
// https://github.com/tryber/sd-013-b-live-lectures/blob/lecture/13.1/cronometer/src/components/Cronometer.jsx

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      const { timer, addTimer, stop } = this.props;
      if (timer > 0 && stop === false) {
        addTimer(timer - 1);
      }
    }, ONE_SECOND);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const TIME_LIMIT_IN_SECONDS = 5;
  //   if (prevState.seconds === TIME_LIMIT_IN_SECONDS) {
  //     this.setState({ seconds: 0 });
  //   }
  // }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { timer } = this.props;

    return (
      <h2>
        {timer}
      </h2>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  addTimer: PropTypes.func.isRequired,
  stop: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addTimer: (timer) => dispatch(getTimer(timer)),
});

const mapStateToProps = (state) => ({
  timer: state.reducer.timer,
  stop: state.reducer.stop,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
