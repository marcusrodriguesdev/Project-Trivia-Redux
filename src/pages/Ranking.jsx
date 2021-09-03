import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/play" data-testid="btn-go-home">
          <button type="button">Home</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
