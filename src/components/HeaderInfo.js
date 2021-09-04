import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { propGravatarEmail } = this.props;
    const { name, score, gravatarEmail } = propGravatarEmail;
    return (
      <div>
        <img
          src={ gravatarEmail }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">
          User :
          { name }
        </h4>
        <h5 data-testid="header-score">
          Score:
          { score }
        </h5>
      </div>
    );
  }
}

HeaderInfo.propTypes = {
  propGravatarEmail: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  propGravatarEmail: state.player,
  // state = { name, assertions, score, gravatarEmail }
});

export default connect(mapStateToProps)(HeaderInfo);
