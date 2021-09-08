import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

import Timer from '../components/Timer';

class PageGame extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      imgPath: '',
      styleButtons: {
        correct: { border: '' },
        incorrect: { border: '' },
      },
      running: true,
      disabled: false,
    };

    this.questionsSort = this.questionsSort.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleTimeOut = this.handleTimeOut.bind(this);
  }

  async componentDidMount() {
    this.handleImg();
  }

  handleImg() {
    const { email } = this.props;
    const path = md5(email).toString();
    this.setState({
      imgPath: `https://www.gravatar.com/avatar/${path}`,
    });
  }

  handleQuestionClick() {
    this.setState({
      styleButtons: {
        correct: { border: '3px solid rgb(6, 240, 15)' },
        incorrect: { border: '3px solid red' },
      },
      running: false,
      disabled: true,
    });
  }

  // references https://flaviocopes.com/how-to-shuffle-array-javascript/
  questionsSort() {
    const initialNumber = -1;
    const maxRange = 0.5;
    const { counter, styleButtons, disabled } = this.state;
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
                disabled={ disabled }
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
              disabled={ disabled }
            >
              {answer}
            </button>);
        })}
      </div>
    );
  }

  handleTimeOut() {
    this.setState({ disabled: true });
  }

  render() {
    const { counter, imgPath, running } = this.state;
    const { results, name } = this.props;

    if (results.length) {
      return (
        <div>
          <header>
            <img
              data-testid="header-profile-picture"
              alt="gravatar img"
              src={ imgPath }
            />
            <p data-testid="header-player-name">{ name }</p>
            <p data-testid="header-score">0</p>
          </header>

          <h2>Game</h2>

          <Timer instaLose={ this.handleTimeOut } running={ running } />

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
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  results: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(PageGame);
