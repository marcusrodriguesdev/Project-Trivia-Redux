import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { CONVERT_HASH, GRAVATAR } from '../components/Header';
import PlayersList from '../components/PlayersList';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.getLocalStorage = this.getLocalStorage.bind(this);
  }

  // componentDidMount() {
  //   const { name, score, email } = this.props;
  //   const ranking = this.getLocalStorage();

  //   localStorage
  //     .setItem('ranking', JSON
  //       .stringify([...ranking, {
  //         name, score, picture: `${GRAVATAR}${CONVERT_HASH(email)}`,
  //       }]));
  // }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('ranking'));
  }

  render() {
    const { history } = this.props;
    const ranking = this.getLocalStorage();

    return (
      <div>
        <PlayersList ranking={ ranking } />
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Voltar ao Inicio
        </button>
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
