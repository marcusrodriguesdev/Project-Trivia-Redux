import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTriviaThunk } from '../actions';

const INITIAL_STATE = {};

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { addTrivia } = this.props;
    addTrivia();
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        <header>
          <img src="" alt="" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">Nome</p>
          <p data-testid="header-score">0</p>
        </header>
        <div>
          {results
            && results.map((result, index) => (
              <div key={ index }>
                <p data-testid="question-category">{result.category}</p>
                <p data-testid="question-text">{result.question}</p>
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {result.correct_answer}
                </button>
                {result.incorrect_answers.map(
                  (wrongResult, index2) => (
                    <button
                      key={ index2 }
                      type="button"
                      data-testid={ `wrong-answer-${index2}` }
                    >
                      {wrongResult}
                    </button>),
                )}
              </div>))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  addTrivia: PropTypes.func.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  results: state.triviaReducer.results,
});

const mapDispatchToProps = (dispatch) => ({
  addTrivia: (localStorage) => dispatch(addTriviaThunk(localStorage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
