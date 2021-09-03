import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Components/Button';
import Header from '../Components/Header';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
    };

    this.renderQuestionAndAnswers = this.renderQuestionAndAnswers.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  async fetchTriviaAPI() {
    const { token } = this.props;
    const triviaURL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await (await fetch(triviaURL)).json();
    this.setState({
      results: response.results,
    });
  }

  randomizeArray(array) {
    for (let index = array.length - 1; index > 0; index -= 1) {
      const secondIndex = Math.floor(Math.random() * (index + 1));
      const tempNumber = array[index];
      array[index] = array[secondIndex];
      array[secondIndex] = tempNumber;
    }
    return array;
  }

  renderQuestionAndAnswers() {
    const { results } = this.state;
    if (results.length > 0) {
      return results.map(({
        question,
        category,
        correct_answer: correctAnswer,
        incorrect_answers: wrongAnswer,
      }, index) => {
        const answersArray = [correctAnswer, ...wrongAnswer];
        const randomAnswerArray = this.randomizeArray(answersArray);
        const correct = randomAnswerArray.find((text) => text === correctAnswer);
        return (
          <div key={ index }>
            <p data-testid="question-category">{ category }</p>
            <p data-testid="question-text">{ question }</p>
            { randomAnswerArray.map((answer, secondIndex) => (
              correct === answer
                ? (
                  <Button
                    key={ secondIndex }
                    text={ correct }
                    id="correct-answer"
                    dataTest="correct-answer"
                  />
                )
                : (
                  <Button
                    key={ secondIndex }
                    text={ answer }
                    id="wrong-answer"
                    dataTest={ `wrong-answer-${secondIndex}` }
                  />
                )
            ))}
          </div>);
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        { this.renderQuestionAndAnswers() }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  token: user.token,
});

export default connect(mapStateToProps)(Trivia);
