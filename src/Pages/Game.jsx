import React from 'react';
import Header from '../Components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      actualQuestion: 0,
      questionsLoaded: false,
      answered: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion() {
    const myToken = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&encode=base64&token=${myToken}`;
    fetch(URL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          questions: result.results,
          questionsLoaded: true,
        });
      });
  }

  handleClick() {
    this.setState({
      answered: true,
    });
  }

  alternatives() {
    const { questions, actualQuestion, questionsLoaded, answered } = this.state;
    let wrongAnswers = [];
    if (questionsLoaded) {
      wrongAnswers = questions[actualQuestion].incorrect_answers
        .map((answer, index) => (
          <li key={ index }>
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              className={ answered ? 'wrong' : '' }
              onClick={ this.handleClick }
            >
              { questionsLoaded && this.b64toutf8(answer) }
            </button>
          </li>
        ));
    }

    return (
      [
        ...wrongAnswers,
        (
          <li key="4">
            <button
              type="button"
              data-testid="correct-answer"
              className={ answered ? 'correct' : '' }
              onClick={ this.handleClick }
            >
              { questionsLoaded
               && this.b64toutf8(questions[actualQuestion].correct_answer) }
            </button>
          </li>
        ),
      ]
    );
  }

  // Função Obtida em: https://developer.mozilla.org/en-US/docs/Glossary/Base64
  b64toutf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  render() {
    const { questions, actualQuestion, questionsLoaded, answered } = this.state;
    const constRandomNumber = 0.5;
    const maxQuestionsNumber = 4;
    const button = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          if (actualQuestion < maxQuestionsNumber) {
            this.setState((prevState) => ({
              actualQuestion: prevState.actualQuestion + 1,
              answered: false,
            }));
          }
        } }
      >
        Próxima Questão
      </button>
    );
    return (
      <>
        <Header />
        <fieldset>
          <h1
            data-testid="question-category"
          >
            { questionsLoaded && this.b64toutf8(questions[actualQuestion].category) }
          </h1>
          <h2
            data-testid="question-text"
          >
            { questionsLoaded && this.b64toutf8(questions[actualQuestion].question) }
          </h2>
          <ul>
            {this.alternatives().sort(() => constRandomNumber - Math.random())}
          </ul>
          { answered && button }
        </fieldset>
      </>
    );
  }
}
// teste

export default Game;
