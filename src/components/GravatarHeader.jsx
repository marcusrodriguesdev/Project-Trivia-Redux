import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class GravatarHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgPath: '',
      score: 0,
    };

    this.handleImg = this.handleImg.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  async componentDidMount() {
    this.handleImg();
    this.handleScore();
  }

  handleImg() {
    const { email } = this.props;
    const path = md5(email).toString();
    this.setState({
      imgPath: `https://www.gravatar.com/avatar/${path}`,
    });
  }

  handleScore() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state) {
      const { player: { score } } = state;
      this.setState({ score });
    }
  }

  render() {
    const { name } = this.props;
    const { imgPath, score } = this.state;
    return (
      <header>
        <img data-testid="header-profile-picture" alt="gravatar img" src={ imgPath } />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
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
