import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTriviaThunk, userTry, showNextButton } from '../actions';

const INITIAL_STATE = {};

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.handleClick = this.handleClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const { addTrivia } = this.props;
    addTrivia();
  }

  handleClick() {
    const { addTry, buttonRender } = this.props;
    addTry(true);
    buttonRender();
  }

  handleNext() {
    const { addTry } = this.props;
    addTry(false);
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
            && results.map((result, index) => (
              <div key={ index }>
                <p data-testid="question-category">{result.category}</p>
                <p data-testid="question-text">{result.question}</p>
                <button
                  className={ tryUser ? 'correct' : '' }
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.handleClick }
                >
                  {result.correct_answer}
                </button>
                {result.incorrect_answers.map(
                  (wrongResult, index2) => (
                    <button
                      key={ index2 }
                      className={ tryUser ? 'incorrect' : '' }
                      type="button"
                      data-testid={ `wrong-answer-${index2}` }
                      onClick={ this.handleClick }
                    >
                      {wrongResult}
                    </button>),
                )}
              </div>))}
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
});

const mapDispatchToProps = (dispatch) => ({
  addTrivia: (localStorage) => dispatch(addTriviaThunk(localStorage)),
  addTry: (param) => dispatch(userTry(param)),
  buttonRender: () => dispatch(showNextButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
