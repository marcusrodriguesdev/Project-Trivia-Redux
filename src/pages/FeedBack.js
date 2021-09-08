import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Results from '../components/Results';
import HeaderFback from '../components/HeaderFback';
import Button from '../components/Button';

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(text, dataTestId) {
    return (<Button text={ text } dataTestId={ dataTestId } />);
  }

  render() {
    const { assertions } = this.props;
    const feedBack = 3;
    return (
      <>
        <HeaderFback />
        <Results />
        <p data-testid="feedback-text"> FeedbackScreen</p>
        { assertions < feedBack
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
        <Link to="/">
          { this.renderButton('Jogar Novamente', 'btn-play-again') }
        </Link>
        <Link to="ranking">
          { this.renderButton(
            'Ver Ranking',
            'btn-ranking',
          )}
        </Link>
      </>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.gameInfo.assertions,
});

export default connect(mapStateToProps, null)(FeedBack);
