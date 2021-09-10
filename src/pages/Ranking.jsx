import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ConfigButton from '../components/ConfigButton';

export default class Ranking extends Component {
  render() {
    return (
      <div data-testid="ranking-title">
        Ranking
        <Link to="/">
          <ConfigButton
            test="btn-go-home"
            name="Inicio"
          />
        </Link>
      </div>
    );
  }
}
