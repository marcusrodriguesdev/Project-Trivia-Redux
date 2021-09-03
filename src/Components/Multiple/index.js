import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Button from '../Button';

class Multiple extends Component {
  constructor() {
    super();

    this.state = {
      result: [],
      loading: true,
      isClicked: false,
    };

    this.fetchTriviaAPI = this.fetchTriviaAPI.bind(this);
    this.renderQuestionAndAnswers = this.renderQuestionAndAnswers.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  async fetchTriviaAPI() {
    const { token } = this.props;
    const triviaURL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await (await fetch(triviaURL)).json();
    if (response.response_code === '0') {
      this.setState({
        result: response.results[0],
        loading: false,
      });
    } else {
      const newResponse = await (await fetch(triviaURL)).json();
      this.setState({
        result: newResponse.results[0],
        loading: false,
      });
    }
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
    const { result, isClicked } = this.state;
    const {
      question,
      category,
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswer,
    } = result;

    if (wrongAnswer.length > 0) {
      const answersArray = [correctAnswer, ...wrongAnswer];
      const randomAnswerArray = this.randomizeArray(answersArray);
      const correct = randomAnswerArray.find((text) => text === correctAnswer);

      return (
        <>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{question}</p>
          {
            randomAnswerArray.map((answer, secondIndex) => (
              correct === answer
                ? (
                  <Button
                    key={ secondIndex }
                    text={ correct }
                    id="correct-answer"
                    dataTest="correct-answer"
                    onClick={ this.handleClick }
                    disabled={ isClicked }
                  />
                )
                : (
                  <Button
                    key={ secondIndex }
                    text={ answer }
                    id="wrong-answer"
                    dataTest={ `wrong-answer-${secondIndex}` }
                    onClick={ this.handleClick }
                    disabled={ isClicked }
                  />
                )
            ))
          }
        </>
      );
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <p>Carregando...</p>
      );
    }

    return (
      <>
        { this.renderQuestionAndAnswers() }
      </>
    );
  }
}

Multiple.propTypes = {
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user }) => ({
  token: user.token,
});

export default connect(mapStateToProps)(Multiple);
