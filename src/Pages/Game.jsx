import React from 'react';
import Header from '../Components/Header';
import Timer from '../Components/Timer';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      actualQuestion: 0,
      questionsLoaded: false,
      disabled: false,
    };
    this.switchButton = this.switchButton.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion() {
    const myToken = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${myToken}`;
    fetch(URL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          questions: result.results,
          questionsLoaded: true,
        });
      });
  }

  switchButton() {
    this.setState((previousState) => ({
      disabled: !previousState.disabled,
      /* answered: !previousState.answered, */
    }));
  }

  alternatives() {
    const { questions, actualQuestion, questionsLoaded, disabled } = this.state;
    let wrongAnswers = [];
    if (questionsLoaded) {
      wrongAnswers = questions[actualQuestion].incorrect_answers
        .map((answer, index) => (
          <li key={ index }>
            <button
              data-testid={ `wrong-answer-${index}` }
              disabled={ disabled }
              type="button"
            >
              { questionsLoaded && answer }
            </button>
          </li>
        ));
    }

    return (
      [
        ...wrongAnswers,
        (
          <li key="4">
            <button type="button" data-testid="correct-answer" disabled={ disabled }>
              { questionsLoaded && questions[actualQuestion].correct_answer }
            </button>
          </li>
        ),
      ]
    );
  }

  render() {
    const { questions, actualQuestion, questionsLoaded } = this.state;
    const constRandomNumber = 0.5;
    return (
      <>
        <Header />
        <Timer switchButton={ this.switchButton } />
        <fieldset>
          <h1
            data-testid="question-category"
          >
            { questionsLoaded && questions[actualQuestion].category }
          </h1>
          <h2
            data-testid="question-text"
          >
            { questionsLoaded && questions[actualQuestion].question }
          </h2>
          <ul>
            {this.alternatives().sort(() => constRandomNumber - Math.random())}
          </ul>
        </fieldset>
      </>
    );
  }
}
// teste

export default Game;
