import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const tres = 3;
const RANKING_KEY = 'ranking';

class Feedback extends React.Component {
  componentDidMount() {
    this.setLocalStorage();
  }

  setLocalStorage() {
    // obter os dados do estado global
    const { name, score } = this.props;
    // constante que será o array a ser armazenado no local storage
    // na tribuição dessa constate temos o seguinte:
    // - se já existir a chave RANKING_KEY, a constante recebe o local storage já convertido em objeto/array
    // - senão ela recebe um array vazio
    // o fato de ter colocado um '||' torna essa atribuição possível
    const rankings = JSON.parse(localStorage.getItem(RANKING_KEY)) || [];
    // dar o push do estado global nesse array
    rankings.push({ name, score });
    // setar esse array no local storage
    localStorage.setItem(RANKING_KEY, JSON.stringify(rankings));
  }

  render() {
    const { avatar, name, history } = this.props;
    const storageInfos = localStorage.getItem('state');
    const scorePlayer = JSON.parse(storageInfos);
    return (
      <div>
        <header>
          <h1 data-testid="feedback-text">Feedbacks</h1>
          <div data-testid="header-profile-picture">{avatar}</div>
          <p data-testid="header-player-name">{name}</p>
          <div data-testid="header-score">{scorePlayer.player.score}</div>
          {scorePlayer.player.assertions < tres ? (
            <p data-testid="feedback-text">Podia ser melhor...</p>
          ) : (
            ''
          )}
          {scorePlayer.player.assertions >= tres ? (
            <p data-testid="feedback-text">Mandou bem!</p>
          ) : (
            ''
          )}
        </header>
        <section>
          <h4>Pontuação Final:</h4>
          <span data-testid="feedback-total-score">
            {scorePlayer.player.score}
          </span>
          <h4>Número de questões corretas:</h4>
          <span data-testid="feedback-total-question">
            {scorePlayer.player.assertions}
          </span>
          <br />
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ver Ranking
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Feedback.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(Feedback);
