import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../Styles/trivia.css';
import { addUrlGravatar } from '../../Redux/Action';

class Header extends Component {
  render() {
    const { name, score, imgURL } = this.props;
    return (
      <header className="trivia-header">
        {/* <div className="player-info-container"> */}
        <div>
          <img data-testid="header-profile-picture" src={ imgURL } alt="gravatar" />
          <p data-testid="header-player-name">{ name }</p>
        </div>
        <p data-testid="header-score">{ score }</p>
        {/* </div> */}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  result: state.trivia.result,
  score: state.trivia.score,
  imgURL: state.user.urlGravatar,
});

const mapDispatchToProps = (dispatch) => ({
  urlGravatar: (urlGravatar) => dispatch(addUrlGravatar(urlGravatar)),
});

Header.propTypes = {
  name: PropTypes.string,
  urlGravatar: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
