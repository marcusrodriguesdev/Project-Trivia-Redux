import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Message from '../components/Message';
import ConfigButton from '../components/ConfigButton';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target: { name } }) {
    const { history } = this.props;
    if (name === 'Jogar novamente') {
      history.push('/');
    } else {
      history.push('/ranking');
    }
  }

  render() {
    const { name, score, email, answersCorrects, assertions } = this.props;
    return (
      <>
        <Header
          name={ name }
          email={ email }
          score={ score }
        />
        <p data-testid="feedback-text"><Message hits={ answersCorrects } /></p>
        <div data-testid="feedback-total-question">{ assertions }</div>
        <ConfigButton
          test="btn-play-again"
          name="Jogar novamente"
          onClick={ this.handleClick }
        />
        <ConfigButton
          test="btn-ranking"
          name="Ranking"
          onClick={ this.handleClick }
        />

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
