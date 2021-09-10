import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Início
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default Ranking;
