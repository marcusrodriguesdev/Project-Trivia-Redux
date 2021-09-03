import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          Inicio
        </button>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};
