import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import rankingIcon from '../ranking-icon.svg';

class RankingButton extends Component {
  render() {
    return (
      <Link data-testid="btn-ranking" to="/ranking">
        <button type="button" className="system-btn ranking-btn">
          <img src={ rankingIcon } alt="Ranking Icon" width="40px" />
          Ranking
        </button>
      </Link>
    );
  }
}

export default RankingButton;
