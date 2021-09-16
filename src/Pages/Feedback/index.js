import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './feedback.css';

class Feedback extends Component {
  render() {
    const { dados, history } = this.props;
    const { name, profile, score, assertions } = dados;
    return (
      <div className="fbContent">
        <header className="fbHeader">
          <div className="titleArea">
            <span data-testid="feedback-text" className="fbTitle">Feedback</span>
          </div>
          <div className="nameArea">
            <img
              src={ `https://www.gravatar.com/avatar/${profile}` }
              alt="gravatar"
              data-testid="header-profile-picture"
              className="fbProfilePic"
            />
            <p data-testid="header-player-name" className="fbName">{ name }</p>
          </div>
          <p data-testid="header-score" className="fbScore">{ `Pontos: ${score}` }</p>
          <p data-testid="feedback-total-question" className="fbAcertos">{ `Acertos: ${assertions}` }</p>
          {
            assertions > 2
              ? <p data-testid="feedback-text" className="fbMessage">Mandou bem!</p>
              : <p data-testid="feedback-text" className="fbMessage">Podia ser melhor...</p>
          }
        </header>
        <div className="btnArea">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
            className="fbButton"
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
            className="fbButton"
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dados: state.scoreReducer,
});

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  dados: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
