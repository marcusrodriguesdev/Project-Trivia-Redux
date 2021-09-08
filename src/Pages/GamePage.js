import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
// import { getQuestion } from '../Services/fetchAPI';
import { getQuestionsThunk } from '../Redux/Action';
// import Loading from './Loading';
import '../App.css';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      // questionIsAnswered: false,
    };
    this.questionAnswered = this.questionAnswered.bind(this);
  }

  componentDidMount() {
    // this.setQuestions();
    const { sendQuestionsToState, token } = this.props;
    sendQuestionsToState(token);
  }

  questionAnswered(event) {
    const correctAnswer = document.querySelector('.correct-answer');
    const wrong = document.querySelectorAll('.wrong-answer');
    // this.setState({
    //   questionIsAnswered: true,
    // });
    correctAnswer.classList.add('correct-color');
    wrong.forEach((wrongAlternative) => {
      wrongAlternative.classList.add('incorrect-color');
    });
    console.log(event.target);
    console.log(correctAnswer);
    console.log(wrong);
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
          <button
            type="button"
            data-testid={ `wrong-answer-${mapIndex}` }
            // key="incorrectAnswer"
            key={ mapIndex }
            onClick={ this.questionAnswered }
            className="wrong-answer"
          >
            {answer}
          </button>)) }
        <button
          type="button"
          className="correct-answer"
          data-testid="correct-answer"
          onClick={ this.questionAnswered }
        >
          {currentQuestion.correct_answer}
        </button>
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
