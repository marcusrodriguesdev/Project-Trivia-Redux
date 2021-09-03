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

    this.state = {
      loading: true,
      timer: 30,
      index: 0,
    };
  }

  componentDidMount() {
    this.handleQuestions();
  }

  handleEmailConversion() {
    const { gravatarEmail } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    console.log(emailHash);
    const response = `https://www.gravatar.com/avatar/${emailHash}`;
    return response;
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
    const player = {
      name,
      assertions: newAssertions,
      score: { newScore },
      gravatarEmail,
    };
    localStorage.setItem('state', player);
    setScoreAndAssertions({ assertions, score });
  }

  render() {
    const { name, score } = this.props;
    const { questions, loading, index } = this.state;
    return (
      <>
        <header>
          <img
            src={ this.handleEmailConversion() }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h3 data-testid="header-score">{ score }</h3>
        </header>
        {!loading
        && <QuestionsComponent
          question={ questions[index] }
          handleClick={ this.handleClickCorrectAnswer }
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
