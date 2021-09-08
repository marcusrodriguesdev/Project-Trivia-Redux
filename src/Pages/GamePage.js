import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
// import { getQuestion } from '../Services/fetchAPI';
import { getQuestionsThunk } from '../Redux/Action';
import Timer from '../components/Timer';
// import Loading from './Loading';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    // this.setQuestions();
    const { sendQuestionsToState, token } = this.props;
    sendQuestionsToState(token);
  }

  questionMod() {
    const { index } = this.state;
    const { questions } = this.props;
    console.log(questions);
    const currentQuestion = questions[index];
    const incorrectAnswers = currentQuestion.incorrect_answers;
    return (
      <>
        <h3 data-testid="question-text">{currentQuestion.question}</h3>
        <h5 data-testid="question-category">{currentQuestion.category}</h5>
        {incorrectAnswers.map((answer, mapIndex) => (
          <p
            data-testid={ `wrong-answer-${mapIndex}` }
            key="incorrectAnswer"
          >
            {answer}
          </p>)) }
        <p data-testid="correct-answer">{currentQuestion.correct_answer }</p>
      </>
    );
  }

  render() {
    const { questions } = this.props;
    if (!questions.length) return <div>Loading</div>;
    const { playerName, playerEmail, playerScore } = this.props;
    const imgPath = 'https://www.gravatar.com/avatar/$ce11fce876c93ed5d2a72da660496473';
    const hash = md5(playerEmail).toString();
    const image = `${imgPath}${hash}`;

    return (
      <>
        <img src={ image } alt="Imagem Gravatar" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{playerName}</h3>
        <p>
          Email:
          {playerEmail}
        </p>
        <p data-testid="header-score">
          Score:
          {playerScore}
        </p>
        {questions ? this.questionMod() : null }
        <Timer />
      </>
    );
  }
}

GamePage.propTypes = {
  playerEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  questions: PropTypes.shape({
    length: PropTypes.number.isRequired,
  }).isRequired,
  sendQuestionsToState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerScore: state.player.score,
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
  token: state.token,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  sendQuestionsToState: (token) => dispatch(getQuestionsThunk(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
