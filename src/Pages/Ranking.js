import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Components/Button';

class Ranking extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;

    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">
          Seu Ranking!
        </h1>
        <footer>
          <Button
            text="Home"
            id="btn-go-home"
            dataTest="btn-go-home"
            onClick={ this.handleClick }
          />
        </footer>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
