import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgPath: '',
    };

    this.handleImage = this.handleImage.bind(this);
  }

  handleImage() {
    const { user: { email } } = this.props;
    const userImg = md5(email).toString();
    this.setState({
      imgPath: userImg,
    });
  }

  render() {
    const { user, score } = this.props;
    const { imgPath } = this.state;
    return (
      <div className="header">
        <span data-testid="header-player-name">{user.nome}</span>
        <span data-testid="header-score">{score}</span>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${imgPath}` }
          alt="User Avatar"
        />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.reducerLogin.user,
  // email: state.reducerLogin.email,
  // score: state.reducerLogin.score,
});

Header.propTypes = {
  user: PropTypes.shape({
    nome: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
