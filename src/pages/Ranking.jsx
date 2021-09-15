import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import PlayersList from '../components/PlayersList';
import '../css/Ranking.css';
import logo from '../images/logo.png';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div className="ranking-page">
        <header>
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>

        <main className="ranking-main">
          <div className="logoButtonContainer">
            <img src={ logo } alt="logo" className="logoTrivia" />

            <div className="back-button">
              <button
                type="button"
                onClick={ () => history.push('/') }
                data-testid="btn-go-home"
              >
                Voltar ao Início
              </button>
            </div>
          </div>

          <PlayersList ranking={ ranking } />
        </main>
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
