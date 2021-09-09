import React, { Component } from 'react';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">Deu não eihn!</h2>
      </div>
    );
  }
}

export default (FeedBack);
