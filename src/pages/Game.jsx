import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fecthApiThunk } from '../Redux/action';
import Header from '../components/Header';

import '../styles/main.css';

let clock;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      next: 0,
      score: 0,
      wrong: '',
      correct: '',
      disabled: false,
      assertions: 0,
      difficulty: 0,
      time: 30,
    };

    this.requestApiQuestions = this.requestApiQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.validateAnswers = this.validateAnswers.bind(this);
    this.savePlayerPoint = this.savePlayerPoint.bind(this);
  }

  componentDidMount() {
    this.requestApiQuestions();
    const player = { player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    } };
    localStorage.setItem('state', JSON.stringify(player));
    // ranking = [
    //   { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
    // ]

    this.createClock();
  }

  createClock() {
    const ONE_SECOND = 1000;
    clock = setInterval(() => {
      this.setState((prev) => ({ time: prev.time - 1 }));
    }, ONE_SECOND);
    this.breakClock(clock);
  }

  breakClock() {
    const ONE_SECOND = 30000;
    setTimeout(() => {
      clearInterval(clock);
      this.setState({ disabled: true });
    }, ONE_SECOND);
  }

  requestApiQuestions() {
    const { setQuestions } = this.props;

    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken);
    setQuestions(token);
  }

  savePlayerPoint(id) {
    const { results, user: { name, email } } = this.props;
    const { next } = this.state;

    switch (results[next].difficulty) {
    case 'hard':
      this.setState({ difficulty: 3 });
      break;
    case 'medium':
      this.setState({ difficulty: 2 });
      break;
    case 'easy':
      this.setState({ difficulty: 1 });
      break;
    default:
      break;
    }
    const number = 10;
    if (id === results[next].correct_answer) {
      this.setState((prev) => ({ assertions: prev.assertions + 1 }), () => {
        const { assertions, difficulty, time } = this.state;
        const { player: { score } } = JSON.parse(localStorage.getItem('state'));

        const player = { player: {
          name,
          assertions,
          score: score + number + (time * difficulty),
          gravatarEmail: email,
        } };
        localStorage.setItem('state', JSON.stringify(player));
        this.setState({ score: player.player.score });
      });
    }
  }

  validateAnswers({ target: { id } }) {
    this.savePlayerPoint(id);
    clearInterval(clock);
    this.setState({
      wrong: 'wrong-answer-css ',
      correct: 'correct-answer-css ',
      disabled: true,
    });
  }

  nextQuestion() {
    const { results, history } = this.props;
    const { next } = this.state;
    if (next < results.length - 1) {
      this.setState((prev) => ({
        next: prev.next + 1,
      }));
      this.setState({
        wrong: '',
        correct: '',
        disabled: false,
        time: 30,
      });
      this.createClock();
    }
    if (next + 1 > results.length - 1) history.push('/feedback');
  }

  renderQuestions() {
    const { results } = this.props;
    const { next, wrong, correct, disabled } = this.state;
    if (results.length > 0) {
      return (
        <div className="question-box">
          <div className="container-question">
            <h2 data-testid="question-category">{ results[next].category }</h2>
            <h3 data-testid="question-text">{ results[next].question }</h3>
          </div>
          <div className="question-answers">
            {
              [...results[0].incorrect_answers, results[next].correct_answer]
                .sort()
                .map((answers, index) => {
                  if (answers === results[next].correct_answer) {
                    return (
                      <button
                        className={ correct }
                        type="button"
                        disabled={ disabled }
                        onClick={ this.validateAnswers }
                        id={ answers }
                        key={ index }
                        data-testid="correct-answer"
                      >
                        { answers }
                      </button>
                    );
                  } return (
                    <button
                      key={ index }
                      type="button"
                      className={ wrong }
                      disabled={ disabled }
                      onClick={ this.validateAnswers }
                      id={ answers }
                      data-testid={ `wrong-answer-${index}` }
                    >
                      { answers }
                    </button>
                  );
                })
            }
          </div>
        </div>
      );
    }
  }

  render() {
    const { disabled, time, score } = this.state;

    const { results } = this.props;
    if (!results) return <span>Loading...</span>;

    return (
      <div className="main-content">
        <span>{ time }</span>
        <Header score={ score } />
        { this.renderQuestions() }
        <div className="box-buttons">
          <button
            type="button"
            style={ { display: disabled ? 'inline' : 'none' } }
            disabled={ !disabled }
            onClick={ this.nextQuestion }
            data-testid="btn-next"
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.reducer.questions,
  user: state.userReducer.user,
});

const mapDisptchToProps = (dispatch) => ({
  setQuestions: (payload) => dispatch(fecthApiThunk(payload)),
});

export default connect(mapStateToProps, mapDisptchToProps)(Game);

Game.propTypes = {
  setQuestions: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(String).isRequired,
  user: PropTypes.objectOf(String).isRequired,
  history: PropTypes.objectOf(String).isRequired,
};
