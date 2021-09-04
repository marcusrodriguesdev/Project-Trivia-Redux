import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class PageGame extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      imgPath: '',
    };

    this.questionsSort = this.questionsSort.bind(this);
    this.handleImg = this.handleImg.bind(this);
  }

  async componentDidMount() {
    this.handleImg();
  }

  handleImg() {
    const { email } = this.props;
    const path = md5(email).toString();
    this.setState({
      imgPath: `https://www.gravatar.com/avatar/${path}`,
    });
  }

  // referencs https://flaviocopes.com/how-to-shuffle-array-javascript/
  questionsSort() {
    const initialNumber = -1;
    const maxRange = 0.5;
    const { counter } = this.state;
    const { results } = this.props;
    let incorrectAnswersIndex = initialNumber;
    let allAnswers = [results[counter].correct_answer,
      ...results[counter].incorrect_answers];
    allAnswers = allAnswers.sort(() => Math.random() - maxRange);

    return (
      <div>
        {allAnswers.map((answer) => {
          if (answer === results[counter].correct_answer) {
            return (<button type="button" data-testid="correct-answer">{answer}</button>);
          }
          incorrectAnswersIndex += 1;
          return (
            <button
              type="button"
              key={ incorrectAnswersIndex }
              data-testid={ `wrong-answer-${incorrectAnswersIndex}` }
            >
              {answer}
            </button>);
        })}
      </div>
    );
  }

  render() {
    const { counter, imgPath } = this.state;
    const { results, name } = this.props;

    if (results.length) {
      return (
        <div>
          <header>
            <img
              data-testid="header-profile-picture"
              alt="gravatar img"
              src={ imgPath }
            />
            <p data-testid="header-player-name">{ name }</p>
            <p data-testid="header-score">0</p>
          </header>

          <h2>Game</h2>

          <h3 data-testid="question-category">{ results[counter].category }</h3>
          <p data-testid="question-text">{results[counter].question}</p>
          { this.questionsSort() }

        </div>
      );
    } return <p>Carregando...</p>;
  }
}
const mapStateToProps = (state) => ({
  results: state.myReducer.results,
  name: state.user.name,
  email: state.user.email,
});

PageGame.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  results: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(PageGame);
