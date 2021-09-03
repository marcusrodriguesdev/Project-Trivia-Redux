import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getQuestion } from '../Services/fetchAPI';
// import Loading from './Loading';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      index: 0,
    };
    this.setQuestions = this.setQuestions.bind(this);
  }

  componentDidMount() {
    this.setQuestions();
  }

  setQuestions() {
    const token = localStorage.getItem('token');
    console.log(token);
    // eslint-disable-next-line no-magic-numbers
    if (token) {
      const questions = getQuestion(token);
      this.setState({
        questions,
      });
    }
  }

  questionMod() {
    const { questions, index } = this.state;
    console.log(questions, index);
    const currentQuestion = questions[index];
    // const incorrectAnswers = currentQuestion.incorrect_answers;
    return (
      <>
        <h3 data-testid="question-text">{currentQuestion.question}</h3>
        <h5 data-testid="question-category">{currentQuestion.category}</h5>
        {/* {incorrectAnswers.map((answer, mapIndex) => (
          <p
            data-testid={ `wrong-answer-${mapIndex}` }
            key="incorrectAnswer"
          >
            {answer}
          </p>)) } */}
        <p data-testid="correct-answer">{currentQuestion.correct_answer }</p>
      </>
    );
  }

  render() {
    // const isDefined = localStorage.getItem('token');
    // if (!isDefined) return <div>Loading</div>;
    const { questions } = this.state;
    console.log(questions);
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
      </>
    );
  }
}

GamePage.propTypes = {
  playerEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerScore: state.player.score,
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(GamePage);
