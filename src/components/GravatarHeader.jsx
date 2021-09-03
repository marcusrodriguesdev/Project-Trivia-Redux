import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class GravatarHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgPath: '',
    };

    this.handleImg = this.handleImg.bind(this);
  }

  handleImg() {
    const { email } = this.props;
    const path = md5(email).toString();
    this.setState({
      imgPath: `https://www.gravatar.com/avatar/${path}`,
    });
  }

  render() {
    const { name } = this.props;
    const { imgPath } = this.state;
    return (
      <header>
        {() => this.handleImg()}
        <img data-testid="header-profile-picture" alt="gravatar img" src={ imgPath } />
        <p data-testid="header-player-name">{ name }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
});

GravatarHeader.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(GravatarHeader);
