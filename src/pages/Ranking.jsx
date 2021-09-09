import React, { Component } from 'react';
import ConfigButton from '../components/ConfigButton';

export default class Ranking extends Component {
  render() {
    return (
      <div data-testid="ranking-title">
        Ranking
        <ConfigButton link="/" test="btn-go-home" name="Inicio" />
      </div>
    );
  }
}
