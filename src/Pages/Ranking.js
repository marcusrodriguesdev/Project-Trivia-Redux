import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearState as cleaner } from '../Actions';

class Ranking extends React.Component {
  handleClick() {
    const { history, clearState } = this.props;

    clearState();
    history.push('/');
  }

  render() {
    const playersData = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <main>
          { playersData.sort((player1, player2) => player2.score - player1.score)
            .map((player, index) => (
              <div key={ index }>
                <img src={ player.picture } alt="Foto de perfil do Usuario" />
                <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                <p data-testid={ `player-score-${index}` }>{ player.score }</p>
              </div>
            )) }
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClick.bind(this) }
          >
            Home
          </button>
        </main>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  clearState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearState: () => dispatch(cleaner()),
});

export default connect(null, mapDispatchToProps)(Ranking);
