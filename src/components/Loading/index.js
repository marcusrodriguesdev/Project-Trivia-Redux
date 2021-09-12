import React, { Component } from 'react';

import './style.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading">
          <div className="loading-header" />
          <div className="loading-time-bar" />
          <div className="loading-question" />
          <div className="loading-buttons-section">
            <div className="loading-button" />
            <div className="loading-button" />
            <div className="loading-button" />
            <div className="loading-button" />
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
