import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GravatarHeader from '../components/GravatarHeader';

class PageGame extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      styleButtons: {
        correct: { border: '' },
        incorrect: { border: '' },
      },
    };

    this.questionsSort = this.questionsSort.bind(this);
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
  }

  handleQuestionClick() {
    this.setState({
      styleButtons: {
        correct: { border: '3px solid rgb(6, 240, 15)' },
        incorrect: { border: '3px solid red' },
      },
    });
  }

  // referencs https://flaviocopes.com/how-to-shuffle-array-javascript/
  questionsSort() {
    const initialNumber = -1;
    const maxRange = 0.5;
    const { counter, styleButtons } = this.state;
    const { results } = this.props;
    let incorrectAnswersIndex = initialNumber;
    let allAnswers = [results[counter].correct_answer,
      ...results[counter].incorrect_answers];
    allAnswers = allAnswers.sort(() => Math.random() - maxRange);

    return (
      <div>
        {allAnswers.map((answer) => {
          if (answer === results[counter].correct_answer) {
            return (
              <button
                onClick={ this.handleQuestionClick }
                style={ styleButtons.correct }
                className="correct-answer"
                type="button"
                data-testid="correct-answer"
              >
                {answer}
              </button>);
          }
          incorrectAnswersIndex += 1;
          return (
            <button
              onClick={ this.handleQuestionClick }
              style={ styleButtons.incorrect }
              className="wrong-answer"
              type="button"
              key={ incorrectAnswersIndex }
              data-testid={ `wrong-answer-${incorrectAnswersIndex}` }
            >
              {answer}
            </button>);
        })}
      </div>
    );
  }

  render() {
    const { counter } = this.state;
    const { results } = this.props;

    if (results.length) {
      return (
        <div>
          <GravatarHeader />

          <h2>Game</h2>

          <h3 data-testid="question-category">{ results[counter].category }</h3>
          <p data-testid="question-text">{results[counter].question}</p>
          { this.questionsSort() }

        </div>
      );
    } return <p>Carregando...</p>;
  }
}
const mapStateToProps = (state) => ({
  results: state.myReducer.results,
  name: state.user.name,
  email: state.user.email,
});

PageGame.propTypes = {
  results: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(PageGame);
