import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.pushGame = this.pushGame.bind(this);
  }

  pushGame() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <>
        <div data-testid="ranking-title">
          aaaaaaaaaaaa
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.pushGame }
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
