import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { player, token } = this.props;
    // const { perguntas } = this.state;
    return (
      <div>
        <header>
          <img alt="avatar" data-testid="header-profile-picture" src={ player.avatar } />
          <h4 data-testid="header-player-name">
            Nome:
            {player.nome}
          </h4>
          <h4 data-testid="header-score">
            Score: 0
          </h4>
        </header>
        <div>
          <h3>
            {console.log(token)}
          </h3>
        </div>
      </div>);
  }
}

Game.propTypes = {
  player: PropTypes.shape({
    avatar: PropTypes.string,
    nome: PropTypes.string,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  player: state.user.player,
});

export default connect(mapStateToProps)(Game);
