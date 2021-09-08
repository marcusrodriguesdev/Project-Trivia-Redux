import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { correctAnswers, score } = this.props;
    let feedback;
    const feedback2 = `Você acertou: ${correctAnswers}`;
    const feedback3 = `Sua pontuação foi: ${score}`;
    const treshold = 3;
    if (correctAnswers < treshold) {
      feedback = 'Podia ser melhor...';
    } else if (correctAnswers >= treshold) {
      feedback = 'Mandou bem!';
    }
    return (
      <div>
        <p data-testid="feedback-text">{ feedback }</p>
        <p data-testid="feedback-total-question">{ feedback2 }</p>
        <p data-testid="feedback-total-score">{ feedback3 }</p>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Results.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  correctAnswers: state.user.correctAnswers,
  score: state.user.score,
});

export default connect(mapStateToProps)(Results);
