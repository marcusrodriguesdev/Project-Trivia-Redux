import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import PlayersList from '../components/PlayersList';
import '../css/Ranking.css';
import logo from '../image/logo.png';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div className="mainDiv">
        <header>
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <div className="playerContainer">
          <div className="logoButtonContainer">
            <div className="logoTrivia">
              <img src={ logo } alt="" />
            </div>
            <div className="buttonContainer">
              <button
                type="button"
                onClick={ () => history.push('/') }
                data-testid="btn-go-home"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
          <div className="playerList">
            <PlayersList ranking={ ranking } />
          </div>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.email,
});

export default connect(mapStateToProps)(Ranking);
