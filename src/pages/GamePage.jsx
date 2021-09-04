import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alternatives from '../components/Alternatives';
import Question from '../components/Question';
import { fetchQuestions as fetchQuestionsAction } from '../redux/actions/index';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: false,
      questionNumber: 0,
    };

    this.toggleNextButton = this.toggleNextButton.bind(this);
    this.applyColor = this.applyColor.bind(this);
    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.removeColor = this.removeColor.bind(this);
  }

  async componentDidMount() {
    const { fetchQuestions } = this.props;
    await fetchQuestions();
  }

  applyColor() {
    const correct = document.querySelector('.correct');
    correct.className = 'correct correct-answer';

    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect incorrect-answer';
      return item;
    });

    this.toggleNextButton();
  }

  removeColor() {
    const correct = document.querySelector('.correct');
    correct.className = 'correct default';

    const incorrect = document.querySelectorAll('.incorrect');
    incorrect.forEach((item) => {
      item.className = 'incorrect default';
      return item;
    });

    this.toggleNextButton();
  }

  toggleNextButton() {
    this.setState((previousValue) => ({
      next: !previousValue.next,
    }));
  }

  showNextQuestion() {
    this.removeColor();
    this.setState((prev) => ({
      questionNumber: prev.questionNumber + 1,
    }));
  }

  render() {
    const { next, questionNumber } = this.state;
    return (
      <div>
        <Question
          questionNumber={ questionNumber }
        />

        <Alternatives
          applyColor={ this.applyColor }
          questionNumber={ questionNumber }
        />

        <div>
          { next && (
            <button
              type="button"
              onClick={ this.showNextQuestion }
              data-testid="btn-next"
            >
              Proxima
            </button>) }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestionsAction()),
});

GamePage.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(GamePage);
