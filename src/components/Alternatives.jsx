import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Alternatives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.countDown = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.countDown);
    }
  }

  displayAnswer() {
    const { seconds } = this.state;
    const { questions: { results } } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = results[0];
    return (
      <div>
        <p>{ seconds }</p>
        <button
          type="button"
          key="alternative"
          data-testid="correct-answer"
          disabled={ seconds === 0 }
        >
          { correctAnswer }
        </button>
        {incorrectAnswer.map((wrongAnswer, index) => (
          <button
            type="button"
            key="alternative"
            data-testid={ `wrong-answer-${index}` }
            disabled={ seconds === 0 }
          >
            { wrongAnswer }
          </button>))}
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        {!loading && this.displayAnswer()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gamePage.questions,
  loading: state.loading.loading,
});

Alternatives.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default connect(mapStateToProps)(Alternatives);
