import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTriviaThunk } from '../actions';

const INITIAL_STATE = {
  questionIndex: 0,
};

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.questions = this.questions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { addTrivia } = this.props;
    addTrivia();
  }

  handleClick() {
    // const { questionIndex } = this.state;
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
    }));
  }

  questions() {
    const { results } = this.props;
    const { questionIndex } = this.state;
    return (
      <div key={ 0 }>
        <p data-testid="question-category">{results[questionIndex].category}</p>
        <p data-testid="question-text">{results[questionIndex].question}</p>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleClick }
        >
          {results[questionIndex].correct_answer}
        </button>
        {results[questionIndex].incorrect_answers.map(
          (wrongResult, index2) => (
            <button
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
    const { results, gravatarURL, name } = this.props;
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
};

const mapStateToProps = (state) => ({
  results: state.triviaReducer.results,
  gravatarURL: state.gravatar.gravatarURL,
  name: state.loginReducer.name,
  triviaIndex: state.triviaIndexReducer.index,
});

const mapDispatchToProps = (dispatch) => ({
  addTrivia: (localStorage) => dispatch(addTriviaThunk(localStorage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
