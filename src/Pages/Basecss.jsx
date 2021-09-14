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
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  componentDidMount() {
    const { sendQuestionsToState, token } = this.props;
    sendQuestionsToState(token);
  }

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
          <span className="question" data-testid="question-text">
            Question: { currentQuestion.question }
          </span>
          <span className="category" data-testid="question-category">
            Category: { currentQuestion.category }
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
    );
  }

  returnImage() {
    const { playerEmail } = this.props;
    const imgPath = 'https://www.gravatar.com/avatar/$ce11fce876c93ed5d2a72da660496473';
    const hash = md5(playerEmail).toString();
    const image = `${imgPath}${hash}`;

    return image;
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
          image={ this.returnImage() }
          playerName={ playerName }
          playerEmail={ playerEmail }
        />
        { this.questionMod() }
        {/* { this.returnHeaderComponents() }
        {questions ? this.questionMod() : null } */}
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
