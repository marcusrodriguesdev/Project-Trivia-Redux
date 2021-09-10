import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const {
      player:
      {
        score,
        gravatarEmail,
        name,
        assertions,
      },
    } = JSON.parse(localStorage.getItem('state'));

    return (
      <>
        <Header
          gravatarEmail={ gravatarEmail }
          score={ score }
          name={ name }
        />
        <div>
          { assertions > 2 ? (
            <p data-testid="feedback-text">Mandou bem!</p>
          ) : (
            <p data-testid="feedback-text">Podia ser melhor...</p>
          )}
        </div>
      </>
    );
  }
}

export default Feedback;
