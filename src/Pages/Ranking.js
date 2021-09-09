import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking</h3>
        {/* Requisito 18 */}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
