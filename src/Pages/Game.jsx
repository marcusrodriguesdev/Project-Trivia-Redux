import React from 'react';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Game extends React.Component {
  render() {
    return (
      <>
      <Header />
      <fieldset>
      <h1
        data-testid="question-category"
      >
        {data.results[0].category}
      </h1>
      <h2
        data-testid="question-text"
      >
        {data.results[0].question}
      </h2>
      <ol>
        { data.results[0].incorrect_answers
          .map(((answer, index) => (
            <li key={ index }>
              <button
                data-testid={ `wrong-answer-${index}` }
                type="button"
              >
                { answer }
              </button>
            </li>
          ))) }
        <li>
          <button
            type="button"
            data-testid="correct-answer"
          >
            {data.results[0].correct_answer}
          </button>
        </li>
      </ol>
    </fieldset>
  </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
