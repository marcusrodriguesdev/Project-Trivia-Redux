import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Question extends React.Component {
  displayQuestion() {
    const { questions: { results } } = this.props;
    const { question, category } = results[0];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
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
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default connect(mapStateToProps)(Question);
