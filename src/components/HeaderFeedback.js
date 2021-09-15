import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { propStatePlayer } = this.props;
    const { name, score, gravatarImagem } = propStatePlayer;

    return (
      <div>
        <h2>Info Player</h2>
        <img
          src={ gravatarImagem }
          alt="imagem-gravatar"
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">
          { name }
        </h4>
        <h4 data-testid="header-score">
          { score }
        </h4>
      </div>
    );
  }
}

HeaderFeedback.propTypes = {
  propStatePlayer: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
    gravatarImagem: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  propStatePlayer: state.player,
  // state = { name, assertions, score, gravatarEmail }
});

export default connect(mapStateToProps)(HeaderFeedback);
