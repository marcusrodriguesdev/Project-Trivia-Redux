import React from 'react';
import { connect } from 'react-redux';

const RANKING_KEY = 'ranking';
const one = -1;

class Ranking extends React.Component {
  render() {
    const rankings = JSON.parse(localStorage.getItem(RANKING_KEY));
    // SOURCE: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    rankings.sort((a, b) => {
      if (a.score > b.score) {
        return one;
      }
      if (a.score < b.score) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        { rankings.map(({ name, score }, index) => (
          <div key={ index }>
            <span data-testid={ `player-name-${index}` }>{ name }</span>
            <span data-testid={ `player-score-${index}` }>{ ` - ${score} pontos` }</span>
          </div>
        )) }
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.player,
});

export default connect(mapStateToProps)(Ranking);
