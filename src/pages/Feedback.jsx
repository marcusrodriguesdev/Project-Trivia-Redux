import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveRank } from '../services/saveToLocal';
import FeedbackHeader from '../components/FeedbackHeader';
import FeedbackMsg from '../components/FeedbackMsg';

class Feedback extends Component {
  render() {
    const { name, image, hits, score } = this.props;
    saveRank(name, image, score);
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
          <button type="button" data-testid="btn-ranking">VER RANKING</button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  hits: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  hits: state.reducer.hits,
  name: state.reducer.name,
  image: state.reducer.image,
  score: state.reducer.score,
});

export default connect(mapStateToProps)(Feedback);
