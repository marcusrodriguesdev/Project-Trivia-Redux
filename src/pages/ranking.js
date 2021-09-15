import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { sendToRank as sendToRankAction } from '../actions';

class Ranking extends Component {
  componentDidMount() {
    const { sendToRank } = this.props;
    sendToRank();
  }

  render() {
    const { rankingPage } = this.props;
    const playerID = rankingPage.sort((a, b) => (b.score - a.score));

    return (
      <fieldset className="App">
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
        </div>

        {playerID
          .map(({ name, gravatarImagem, score }, index) => (
            <div key={ index }>
              <img src={ gravatarImagem } alt="PlayerImage" />
              <span data-testid={ `player-name-${index}` }>{ name }</span>
              <span>{' - '}</span>
              <span data-testid={ `player-score-${index}` }>{ score }</span>
            </div>
          ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Voltar ao Login</button>
        </Link>
      </fieldset>
    );
  }
}

Ranking.propTypes = {
  sendToRank: PropTypes.func,
  rankingPage: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = ({ ranking }) => ({
  rankingPage: ranking,
});

const mapDispatchToProps = (dispatch) => ({
  sendToRank: () => (dispatch(sendToRankAction())),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
