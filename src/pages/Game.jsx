import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Game extends Component {
  render() {
    const { name, image } = this.props;
    return (
      <div>
        <header>
          <img src={ image } alt="user" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">Placar: 0</p>
        </header>
        {/* Será necessário que o botão "Próxima" redirecione para feedback quando terminar as perguntas
        <Link to="/feedback">
          <button type="button">Proximo</button>
        </Link> */}
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.reducer.name,
  image: state.reducer.image,
});

export default connect(mapStateToProps)(Game);
