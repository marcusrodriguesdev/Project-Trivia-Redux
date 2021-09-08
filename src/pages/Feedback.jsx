import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { name, score, email } = this.props;
    const urlAvatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return (
      <Header
        name={ name }
        avatar={ urlAvatar }
        score={ score }
      />
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ user: { name, email } }) => ({
  name,
  email,
});

export default connect(mapStateToProps)(Feedback);
