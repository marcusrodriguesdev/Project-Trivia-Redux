import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>TELA GAMER</div>
    );
  }
}

export default connect()(Game);
