import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RankingButton extends Component {
  render() {
    return (
      <Link data-testid="btn-ranking" to="/ranking">Ver Ranking</Link>
    );
  }
}

export default RankingButton;
