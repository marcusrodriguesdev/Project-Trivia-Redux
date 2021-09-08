import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(text, dataTestId) {
    return (<Button text={ text } dataTestId={ dataTestId } />);
  }

  render() {
    return (
      <div>
        <div data-testid="ranking-title"> Tela de Ranking </div>
        <Link to="/">
          {this.renderButton('Volta para a tela inicial', 'btn-go-home')}
        </Link>
      </div>
    );
  }
}
export default Ranking;
