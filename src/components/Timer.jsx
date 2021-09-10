import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeStop, getTimer } from '../redux/actions';

class Timer extends React.Component {
// A base desse código foi retirada do código do Timer que o Ícaro fez em aula
// https://github.com/tryber/sd-013-b-live-lectures/blob/lecture/13.1/cronometer/src/components/Cronometer.jsx

  componentDidMount() {
    this.retimer();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  retimer() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      const { timer, addTimer, stop } = this.props;
      if (timer > 0 && stop === false) {
        addTimer(timer - 1);
      }
    }, ONE_SECOND);
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
  addStop: () => dispatch(changeStop()),
});

const mapStateToProps = (state) => ({
  timer: state.timerReducer.timer,
  stop: state.timerReducer.stop,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
