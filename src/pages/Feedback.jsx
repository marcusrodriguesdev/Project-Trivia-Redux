import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Message from '../components/Message';

class Feedback extends Component {
  render() {
    const { name, score, email, answersCorrects } = this.props;
    const urlAvatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return (
      <>
        <Header
          name={ name }
          avatar={ urlAvatar }
          score={ score }
        />
        <p><Message hits={ answersCorrects } /></p>
      </>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({
  user: { name, email },
  Corrects: { answersCorrects },
}) => ({
  name,
  email,
  answersCorrects,
});

export default connect(mapStateToProps, null)(Feedback);
