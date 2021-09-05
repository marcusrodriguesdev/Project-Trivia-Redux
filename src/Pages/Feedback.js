import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header/index';
import Button from '../Components/Button';

export default class Feedback extends Component {
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
    return (
      <div>
        <h2 data-testid="feedback-text">Sou a página de feedback</h2>
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

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.func),
}.isRequired;
