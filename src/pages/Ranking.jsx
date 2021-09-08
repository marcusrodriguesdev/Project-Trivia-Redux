import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const { arrayOfScore } = this.props;
    const arrCert = arrayOfScore.sort((a, b) => b.player.score - a.player.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {arrCert.map((element, index) => (
            <div key={ index }>
              <li data-testid={ `player-name-${index}` }>{element.player.name}</li>
              <li data-testid={ `player-score-${index}` }>
                {' '}
                {element.player.score}
                {' '}
              </li>
            </div>
          ))}
        </ul>
        <Link to="/" data-testid="btn-go-home">
          <button type="button">Home</button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  arrayOfScore: PropTypes.shape({
    sort: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  email: state.login.email,
  user: state.login.user,
  arrayOfUserss: state.login.arrayOfUser,
  arrayOfScore: state.login.arrayOfScore,
});

export default connect(mapStateToProps)(Ranking);
