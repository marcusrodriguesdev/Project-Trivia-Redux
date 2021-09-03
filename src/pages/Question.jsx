import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchApi from '../services/api';
import QuestionsComponent from '../components/QuestionsComponent';
import { setScoreAndAssertions as setScoreAndAssertionsAction } from '../actions';

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleEmailConversion = this.handleEmailConversion.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.timerQuestion = this.timerQuestion.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleClickCorrectAnswer = this.handleClickCorrectAnswer.bind(this);

    this.state = {
      loading: true,
      timer: 30,
      index: 0,
      disableButton: false,
    };
  }

  componentDidMount() {
    this.handleQuestions();
    this.timerQuestion();
  }

  handleEmailConversion() {
    const { gravatarEmail } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    const response = `https://www.gravatar.com/avatar/${emailHash}`;
    return response;
  }

  handleTime() {
    this.setState((old) => ({ timer: old.timer - 1 }));
  }

  timerQuestion() {
    const maxTime = 1000;
    const timerInterval = setInterval(() => {
      const { timer } = this.state;
      this.handleTime();
      if (timer === 1) {
        clearInterval(timerInterval);
        this.setState({ disableButton: true });
      }
    }, maxTime);
  }

  async handleQuestions() {
    const { token } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const { results } = await fetchApi(url);
    this.setState({
      questions: results,
      loading: false,
    });
  }

  handleClickCorrectAnswer() {
    const value = 10;
    const { score, gravatarEmail, name, assertions, setScoreAndAssertions } = this.props;
    const { questions, index, timer } = this.state;
    const { difficulty } = questions[index];
    const difficultyTable = { hard: 3, medium: 2, easy: 1 };
    const newScore = score + value + (difficultyTable[difficulty] * timer);
    const newAssertions = assertions + 1;
    const playerInfo = {
      player: {
        name,
        assertions: newAssertions,
        score: newScore,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(playerInfo));
    setScoreAndAssertions({ assertions, score });
  }

  render() {
    const { name, score, assertions, gravatarEmail } = this.props;
    const playerInfo = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail,
      },
    };
    if (!localStorage.getItem('state')) {
      localStorage.setItem('state', JSON.stringify(playerInfo));
    }

    const { questions, loading, index, disableButton, timer } = this.state;
    return (
      <>
        <header>
          <img
            src={ this.handleEmailConversion() }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <h1>
            TEMPO:
            {timer}
          </h1>
          <h2 data-testid="header-player-name">{ name }</h2>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        {!loading
        && <QuestionsComponent
          question={ questions[index] }
          handleClick={ this.handleClickCorrectAnswer }
          buttonDisable={ disableButton }
        />}
      </>
    );
  }
}

Question.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  gravatarEmail: player.gravatarEmail,
  name: player.name,
  score: player.score,
  assertions: player.assertions,
  token: player.token,
});

const mapDispatchToProps = (dispatch) => ({
  setScoreAndAssertions: (payload) => dispatch(setScoreAndAssertionsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
