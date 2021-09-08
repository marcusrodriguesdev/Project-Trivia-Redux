import React from 'react';
import { connect } from 'react-redux';
import { getTimer } from '../redux/actions';

class Timer extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { seconds: 30 };
  // }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => {
      const { timer, addTimer } = this.props;
      if (timer > 0) {
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

const mapDispatchToProps = (dispatch) => ({
  addTimer: (timer) => dispatch(getTimer(timer)),
});

const mapStateToProps = (state) => ({
  timer: state.reducer.timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
