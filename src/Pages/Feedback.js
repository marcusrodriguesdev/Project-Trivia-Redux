import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header/index';
import Button from '../Components/Button';
import { getPlayerDataFromLocalStorage } from '../helpers/localStorage';
import '../Styles/trivia.css';

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
      history.push('/');
    }
  }

  render() {
    // const { assertions, score } = this.props;
    const THREE = 3;
    const asserts = getPlayerDataFromLocalStorage('assertions');
    const score = getPlayerDataFromLocalStorage('score');
    return (
      <div>
        <Header />
        <div className="feedback-page">
          <div className="feedback-container">
            { asserts >= THREE
              ? <p className="fdtxt" data-testid="feedback-text">Mandou bem!</p>
              : <p className="fdtxt" data-testid="feedback-text">Podia ser melhor...</p>}
            <p>
              {'Pontuação final: '}
              <span data-testid="feedback-total-score">{ score }</span>
            </p>
            <p>
              {'Respostas corretas: '}
              <span data-testid="feedback-total-question">{ asserts }</span>
            </p>
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

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ trivia }) => ({
  assertions: trivia.assertions,
  score: trivia.score,
});

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.func),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
