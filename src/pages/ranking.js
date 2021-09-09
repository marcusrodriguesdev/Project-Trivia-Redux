import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ranking extends Component {
  render() {
    return (
      <div className="App">
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button type="submit" data-testid="btn-go-home">Voltar a tela de login</button>
        </Link>
      </div>
    );
  }
}

export default ranking;
