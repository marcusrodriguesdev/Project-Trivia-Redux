import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import Helps from '../components/Helps';
import playAction, { getQuestionsThunk } from '../Redux/Action';
import './gamepage2.css';

class Basecss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      questionIsAnswered: false,
      timer: 30,
    };
    this.handleClick = this.handleClick.bind(this);
    this.questionMod = this.questionMod.bind(this);
    this.questionAnswered = this.questionAnswered.bind(this);
    this.handleChronometer = this.handleChronometer.bind(this);
    // this.setTimer = this.setTimer.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.returnHeaderComponents = this.returnHeaderComponents.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  componentDidMount() {
    const { sendQuestionsToState, token } = this.props;
    sendQuestionsToState(token);
  }

  // setTimer() {
  //   const { timer } = this.state;
  //   this.handleChronometer();
  //   return (
  //     <p>
  //       { timer }
  //     </p>);
  // }

  handleClick() {
    const questionDifficulties = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const INITIAL_SCORE = 10;
    let { playerScore: score, playerAssertions: assertions } = this.props;
    const { updateScore, questions } = this.props;
    const { index, timer } = this.state;
    const currentDifficulty = questions[index].difficulty;
    assertions += 1;
    score += INITIAL_SCORE + (timer * questionDifficulties[currentDifficulty]);
    updateScore({ assertions, score });
  }

  handleChronometer() {
    const { timer } = this.state;
    const { questionIsAnswered } = this.state;
    const INTERVAL = 1000;
    const ONE_SECOND = 1;

    if (timer > 0 && !questionIsAnswered) {
      setTimeout(() => {
        const time = timer - ONE_SECOND;
        this.setState({
          timer: time,
        });
      }, INTERVAL);
    }
  }

  questionAnswered() {
    this.setState({
      questionIsAnswered: true,
    });
  }

  nextButtonClick() {
    const { index, questionIsAnswered } = this.state;
    const { playerName, playerScore, playerEmail } = this.props;
    const { history } = this.props;
    const MAX_INDEX = 4;
    // Gravatar //
    const imgPath = 'https://www.gravatar.com/avatar/$ce11fce876c93ed5d2a72da660496473';
    const hash = md5(playerEmail).toString();
    const image = `${imgPath}${hash}`;
    if (index < MAX_INDEX) {
      this.setState({
        index: index + 1,
        questionIsAnswered: !questionIsAnswered,
      });
    } else {
      let rank = JSON.parse(localStorage.getItem('ranking'));
      const player = {
        name: playerName,
        picture: image,
        score: playerScore,
      };
      rank.push(player);
      rank = JSON.stringify(rank);
      localStorage.setItem('ranking', rank);

      history.push('/feedback');
    }
  }

  nextButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextButtonClick }
      >
        Próxima
      </button>
    );
  }

  questionMod() {
    const { index, timer, questionIsAnswered } = this.state;
    const { questions } = this.props;
    const currentQuestion = questions[index];
    const incorrectAnswers = currentQuestion.incorrect_answers;
    return (
      <div className="main-gamepage-container">
        <div className="question-container">
          <div className="question">
            <h3 data-testid="question-text">Question: {currentQuestion.question}</h3>
            <h5 data-testid="question-category">Category: {currentQuestion.category}</h5>
          </div>
        </div>
        <div className="setup-direction">
          <div className="answer-container">
            {incorrectAnswers.map((answer, mapIndex) => (
              <button
                type="button"
                data-testid={ `wrong-answer-${mapIndex}` }
                // key="incorrectAnswer"
                key={ mapIndex }
                onClick={ this.questionAnswered }
                className={ questionIsAnswered ? 'incorrect-color' : null }
                disabled={ !timer || questionIsAnswered }
              >
                <p>{answer}</p>
              </button>)) }
            <button
              type="button"
              className={ questionIsAnswered ? 'correct-color' : null }
              data-testid="correct-answer"
              onClick={ () => {
                this.questionAnswered();
                this.handleClick();
              } }
              disabled={ !timer || questionIsAnswered }
            >
              <p>{currentQuestion.correct_answer}</p>
            </button>
          </div>
          <div className="help-container" />
        </div>
        <div className="button-container">
          { questionIsAnswered && this.nextButton() }
        </div>
      </div>
    );
  }

  returnHeaderComponents() {
    const { questions } = this.props;
    if (!questions.length) return <div>Loading</div>;
    const { playerName, playerEmail, playerScore } = this.props;
    const imgPath = 'https://www.gravatar.com/avatar/$ce11fce876c93ed5d2a72da660496473';
    const hash = md5(playerEmail).toString();
    const image = `${imgPath}${hash}`;
    return (
      <div className="header-container">
        {/* <p data-testid="header-score">
          Score:
          {playerScore}
        </p> */}
        {/* <p>
          Time Left:
          {this.setTimer()}
        </p> */}
        {/* <img src={ image } alt="Imagem Gravatar" data-testid="header-profile-picture" /> */}
        {/* <h3 data-testid="header-player-name">{playerName}</h3> */}
        {/* <p>
          Email:
          {playerEmail}
        </p> */}
      </div>
    );
  }

  render() {
    const { questions, playerScore, image, playerName, playerEmail } = this.props;
    const { timer } = this.state;
    if (!questions.length) return <div>Loading</div>;
    this.handleChronometer();
    return (
      <div className="wrapper">
        <Header
          playerScore={ playerScore }
          timer={ timer }
          image={ image }
          playerName={ playerName }
          playerEmail={ playerEmail }
        />
        {/* { this.returnHeaderComponents() }
        {questions ? this.questionMod() : null } */}
        <div className="main-gamepage-container">
          <div className="question-container">
            <span className="question">
              Question: Normalmente, quantos litros de sangue uma pessoa tem? Em média, quantos são retirados numa doação de sangue?
            </span>
            <span className="category">
              Category: Historia
            </span>
          </div>

          <div className="row-contents">
            <div className="answers-container">
              <div className="answer-items">
                <div className="answer">
                  <span className="answer-field"><p>ASUHAUSDHUASHDUAHSUHA</p></span>
                  <div className="square">1</div>
                </div>              
              </div>
            </div>

            <div className="helps">
              <Helps />
            </div>

          </div>

          <div className="button-container">
            <button className="next-button">Próxima</button>
          </div>

        </div>
      </div>
    );
  }
}

Basecss.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  playerAssertions: PropTypes.number.isRequired,
  playerEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  questions: PropTypes.shape({
    length: PropTypes.number.isRequired,
  }).isRequired,
  sendQuestionsToState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerScore: state.player.score,
  playerAssertions: state.player.assertions,
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
  token: state.token,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  sendQuestionsToState: (token) => dispatch(getQuestionsThunk(token)),
  updateScore: (payload) => dispatch(playAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basecss);
