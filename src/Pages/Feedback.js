import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header/index';
import Button from '../Components/Button';

class Feedback extends Component {
  constructor() {
    super();
    this.redirectOnClick = this.redirectOnClick.bind(this);
  }

  redirectOnClick({ target }) {
    if (target.innerText === 'Ver Ranking') {
      const { history } = this.props;
      history.push('/ranking');
    } else {
      const { history } = this.props;
      history.push('/trivia');
    }
  }

  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <div>
        { assertions >= THREE
          ? <p data-testid="feedback-text">Mandou bem!</p>
          : <p data-testid="feedback-text">Podia ser melhor.</p>}
        <Header />
        <Button
          text="Jogar novamente"
          id="btn-play-again"
          dataTest="btn-play-again"
          onClick={ this.redirectOnClick }
        />
        <Button
          text="Ver Ranking"
          id="btn-ranking"
          dataTest="btn-ranking"
          onClick={ this.redirectOnClick }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ trivia }) => ({
  assertions: trivia.assertions,
});

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.func),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
