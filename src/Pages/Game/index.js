import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: {},
      questionNumber: 0,
      timer: 30,
      loading: true,
      redBorder: '',
      greenBorder: '',
      disable: false,
      totalScore: 0,
      assertions: 0,
      showButton: true,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
    this.switchValue = this.switchValue.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
    this.stopWatch();
    const { dados } = this.props;
    const { assertions } = this.state;
    const profile = {
      name: dados.name,
      assertions,
      score: 0,
      gravatarEmail: dados.email,
    };
    localStorage.setItem('state', JSON.stringify({ player: profile }));
  }

  stopWatch() {
    const segundo = 1000;
    this.timer = setInterval(() => {
      const { timer } = this.state;
      this.setState({
        timer: timer - 1,
      });
      if (timer === 1) {
        clearInterval(this.timer);
        this.setState({
          disable: true,
        });
      }
    }, segundo);
  }

  async fetchQuestions() {
    const { dados: { token } } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({
      questions: data.results,
      loading: false,
    });
  }

  switchValue(difficuty) {
    const hardPoints = 3;

    switch (difficuty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return hardPoints;
    default:
      return 0;
    }
  }

  stopTimer() {
    this.setState({
      greenBorder: 'green-border',
      redBorder: 'red-border',
    });
    clearInterval(this.timer);
  }

  handleClick({ target }) {
    this.stopTimer();
    const { questions, questionNumber, timer, totalScore, assertions } = this.state;
    const { difficulty } = questions[questionNumber];

    const { dados } = this.props;
    if (target.textContent !== questions[questionNumber].correct_answer) {
      const profile = {
        name: dados.name,
        assertions,
        score: totalScore,
        gravatarEmail: dados.email,
      };
      localStorage.setItem('state', JSON.stringify({ player: profile }));
      this.setState({ showButton: false });
      return;
    }

    const ten = 10;
    const points = this.switchValue(difficulty);
    const total = ten + (timer * points);

    this.setState({
      totalScore: totalScore + total,
      assertions: assertions + 1,
      showButton: false,
    });

    const profile = {
      name: dados.name,
      assertions: assertions + 1,
      score: totalScore + total,
      gravatarEmail: dados.email,
    };

    localStorage.setItem('state', JSON.stringify({ player: profile }));
  }

  nextQuestion() {
    const { questionNumber } = this.state;
    const four = 4;
    if (questionNumber < four) {
      this.setState({
        questionNumber: questionNumber + 1,
        showButton: true,
        timer: 30,
        greenBorder: '',
        redBorder: '',
      });
      this.stopWatch();
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  }

  renderAnswers() {
    const { questions, questionNumber, redBorder, greenBorder, disable } = this.state; // Testando o git hub

    const answers = [...questions[questionNumber].incorrect_answers,
      questions[questionNumber].correct_answer];
    const index = -1;
    let id = index; // Key do map
    return answers.sort().map((answer) => {
      if (answer === questions[questionNumber].correct_answer) {
        return (
          <button
            type="button"
            data-testid="correct-answer"
            className={ greenBorder }
            onClick={ this.handleClick }
            disabled={ disable }
          >
            { answer }
          </button>
        );
      }
      id += 1;
      return (
        <button
          className={ redBorder }
          type="button"
          data-testid={ `wrong-answer-${id}` }
          key={ id }
          onClick={ this.handleClick }
          disabled={ disable }
        >
          { answer }
        </button>
      );
    });
  }

  render() {
    const { dados: { name, profile } } = this.props;
    const { loading, questionNumber, timer, showButton } = this.state;
    if (loading) return <h1>loading</h1>;
    const { questions } = this.state;

    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">
            { name }
          </h1>
          <img
            src={ `https://www.gravatar.com/avatar/${profile}` }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-score">0</span>
          <span>
            { timer }
          </span>
        </header>
        <div>
          <span data-testid="question-category">
            {
              questions[questionNumber].category
            }
          </span>
          <span data-testid="question-text">
            {
              questions[questionNumber].question
            }
          </span>
          <span>
            {
              this.renderAnswers()
            }
          </span>
          <button
            type="button"
            data-testid="btn-next"
            hidden={ showButton }
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
  dados: state.loginReducer,
});

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  dados: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
