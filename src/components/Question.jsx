import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import decode from '../GlobalFuncs/DecodeFunc';

class Question extends React.Component {
  displayQuestion() {
    const { questions: { results }, questionNumber } = this.props;
    const { question, category } = results[questionNumber];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ decode(question) }</p>
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
        {!loading && this.displayQuestion()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gamePage.questions,
  loading: state.loading.loading,
});

Question.propTypes = {
  loading: PropTypes.bool.isRequired,
  questionNumber: PropTypes.number.isRequired,
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default connect(mapStateToProps)(Question);
