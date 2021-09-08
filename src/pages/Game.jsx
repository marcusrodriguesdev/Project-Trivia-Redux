import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTriviaThunk, userTry, showNextButton } from '../actions';

const INITIAL_STATE = {
  questionIndex: 0,
};

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.handleNext = this.handleNext.bind(this);
    this.questions = this.questions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { addTrivia } = this.props;
    addTrivia();
  }

  handleClick() {
    const { addTry, buttonRender } = this.props;
    addTry(true);
    buttonRender();
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
    }));
  }

  handleNext() {
    const { addTry } = this.props;
    addTry(false);
  }

  questions() {
    const { results } = this.props;
    const { questionIndex } = this.state;
    return (
      <div key={ 0 }>
        <p data-testid="question-category">{results[questionIndex].category}</p>
        <p data-testid="question-text">{results[questionIndex].question}</p>
        <button
          className={ tryUser ? 'correct' : '' }
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
        >
          {results[questionIndex].correct_answer}
        </button>
        {results[questionIndex].incorrect_answers.map(
          (wrongResult, index2) => (
            <button
              className={ tryUser ? 'incorrect' : '' }
              key={ index2 }
              type="button"
              data-testid={ `wrong-answer-${index2}` }
            >
              {wrongResult}
            </button>),
        )}
      </div>
    );
  }

  render() {
    const nextButton = (
      <button id="javascript" type="button" onClick={ this.handleNext }>Próximo</button>);
    const { results, gravatarURL, name, tryUser } = this.props;
    return (
      <div>
        <header>
          <img src={ gravatarURL } alt="" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">0</p>
        </header>
        <div>
          {results
          && this.questions()}
          { tryUser && nextButton }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  addTrivia: PropTypes.func.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  gravatarURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  addTry: PropTypes.func.isRequired,
  tryUser: PropTypes.objectOf(PropTypes.any).isRequired,
  buttonRender: PropTypes.objectOf(PropTypes.any).isRequired,
  // renderButton: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  results: state.triviaReducer.results,
  gravatarURL: state.gravatar.gravatarURL,
  name: state.loginReducer.name,
  tryUser: state.triviaReducer.tryUser,
  renderButton: state.triviaReducer.renderButton,
  triviaIndex: state.triviaIndexReducer.index,
});

const mapDispatchToProps = (dispatch) => ({
  addTrivia: (localStorage) => dispatch(addTriviaThunk(localStorage)),
  addTry: (param) => dispatch(userTry(param)),
  buttonRender: () => dispatch(showNextButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
