import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FeedbackHeader from '../components/FeedbackHeader';
import FeedbackMsg from '../components/FeedbackMsg';

class Feedback extends Component {
  render() {
    const { hits, score } = this.props;
    return (
      <div>
        Tela de Feedback
        <FeedbackHeader />
        <FeedbackMsg />
        <p>
          {'Você acertou '}
          <span data-testid="feedback-total-score">{ hits }</span>
          {' questões!'}
        </p>
        <p>
          {'Um total de '}
          <span data-testid="feedback-total-question">{ score }</span>
          {' pontos!'}
        </p>
        <Link to="/ranking">
          <button type="button">VER RANKING</button>
        </Link>
        <Link to="/game">
          <button type="button">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  hits: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  hits: state.reducer.hits,
  score: state.reducer.score,
});

export default connect(mapStateToProps)(Feedback);
