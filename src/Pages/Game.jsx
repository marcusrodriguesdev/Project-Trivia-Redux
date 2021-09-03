import React from 'react';
import Header from '../Components/Header';

class Game extends React.Component {
  render() {
    return (
      <>
        <Header />
        <fieldset>
          <h1 data-testid="question-category">teste</h1>
          <h2 data-testid="question-text">teste</h2>
          <ol>
            <li>
              <button data-testid="wrong-answer" type="button">
                teste
              </button>
            </li>
            <li>
              <button type="button" data-testid="correct-answer">
                teste
              </button>
            </li>
          </ol>
        </fieldset>
      </>
    );
  }
}

export default Game;
