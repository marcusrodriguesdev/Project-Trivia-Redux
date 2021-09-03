import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fecthApiThunk } from '../Redux/action';
import Header from '../components/Header';

import '../styles/main.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      next: 0,
    };

    this.requestApiQuestions = this.requestApiQuestions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.validateAnswers = this.validateAnswers.bind(this);
  }

  componentDidMount() {
    this.requestApiQuestions();
  }

  requestApiQuestions() {
    const { setQuestions } = this.props;

    const getToken = localStorage.getItem('token');
    const token = JSON.parse(getToken);
    setQuestions(token);
  }

  validateAnswers() {

  }

  nextQuestion() {
    const { results } = this.props;
    const { next } = this.state;

    if (next < results.length - 1) this.setState({ next: next + 1 });
  }

  renderQuestions() {
    const { results } = this.props;
    const { next } = this.state;

    if (results.length > 0) {
      return (
        <div className="question-box">
          <div className="container-question">
            <h2 data-testid="question-category">{ results[next].category }</h2>
            <h3 data-testid="question-text">{ results[next].question }</h3>
          </div>

          <div className="question-answers">
            <button
              type="button"
              data-testid="correct-answer"
            >
              { results[next].correct_answer }
            </button>
            {
              results[0].incorrect_answers.map((answers, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ () => console.log(answers) }
                >
                  { answers }
                </button>
              ))
            }
          </div>

        </div>
      );
    }
  }

  render() {
    return (
      <div className="main-content">
        <Header />
        { this.renderQuestions() }

        <div className="box-buttons">
          <button
            type="button"
            onClick={ this.nextQuestion }
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
});

const mapDisptchToProps = (dispatch) => ({
  setQuestions: (payload) => dispatch(fecthApiThunk(payload)),
});

export default connect(mapStateToProps, mapDisptchToProps)(Game);

Game.propTypes = {
  setQuestions: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(String).isRequired,
};
