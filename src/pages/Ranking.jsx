import PropTypes from 'prop-types';
import React from 'react';

class Ranking extends React.Component {
  handleClick(nameRoute) {
    const { history } = this.props;
    history.push(nameRoute);
  }

  loadLocal() {
    const loadedData = JSON.parse(localStorage.getItem('ranking'));
    loadedData.sort((a, b) => b.score - a.score);
    return loadedData;
  }

  render() {
    return (
      <>
        <h2 data-testid="ranking-title">Ranking</h2>
        {console.log(this.loadLocal())}
        {this.loadLocal().map((e, index) => (
          <div key={ index }>
            <img src={ e.picture } alt={ `foto dx ${e.name}` } />
            <p data-testid={ `player-name-${index}` }>{e.name}</p>
            <p data-testid={ `player-score-${index}` }>{e.score}</p>
          </div>))}
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => this.handleClick('/') }
        >
          Jogar novamente
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
