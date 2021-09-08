import React from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';

const trivialink = 'https://opentdb.com/api.php?amount=5&token=';
const cinco = 5;

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: {
        results: [
          {
            correct_answer: '',
            incorrect_answers: [],
          },
        ],
      },
      nextQuestion: false,
      countQuestion: 0,
      loading: true,
    };

    this.Answer = this.Answer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.incorrectAnswer = this.incorrectAnswer.bind(this);
    this.getTriviaApiResponse = this.getTriviaApiResponse.bind(this);
    this.borderColor = this.borderColor.bind(this);
  }

  componentDidMount() {
    this.getTriviaApiResponse();
    this.timeToRespond();
  }

  componentDidUpdate() {
    const { countQuestion } = this.state;
    if (countQuestion === cinco) return <Redirect to="/feedback" />;
    document.querySelectorAll('#incorreta').forEach((button) => {
      button.className = '';
    });
    document.getElementById('correta').className = '';
  }

  async getTriviaApiResponse() {
    const token = localStorage.getItem('token');
    const responseApi = await fetch(`${trivialink}${token}`);
    const object = await responseApi.json();
    this.setState({
      questions: object,
      loading: false,
    });
  }

  questionNext() {
    let { countQuestion } = this.state;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          this.setState({
            countQuestion: (countQuestion += 1),
            nextQuestion: false,
          });
        } }
      >
        Próxima
      </button>
    );
  }

  borderColor() {
    this.setState({ nextQuestion: true },
      () => {
        document.querySelectorAll('#incorreta').forEach((button) => {
          button.className = 'red-border';
        });
        document.getElementById('correta').className = 'green-border';
      });
  }

  timeToRespond() {
    const THIRTY_SECONDS = 30000;
    setInterval(
      () => document.querySelectorAll('button').forEach((button) => {
        button.disabled = true;
      }),
      THIRTY_SECONDS,
    );
  }

  correctAnswer(alternative, index) {
    return (
      <button
        id="correta"
        type="button"
        data-testid="correct-answer"
        key={ index }
        onClick={ this.borderColor }
      >
        {alternative}
      </button>
    );
  }

  incorrectAnswer(alternative, index) {
    return (
      <button
        id="incorreta"
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ index }
        onClick={ this.borderColor }
      >
        {alternative}
      </button>
    );
  }

  Answer(alternative, correctAnswer, index) {
    for (let i = 0; i < alternative.length; i += 1) {
      if (alternative === correctAnswer) {
        return this.correctAnswer(alternative, index);
      }
    }
    return this.incorrectAnswer(alternative, index);
  }

  render() {
    const { questions, loading, countQuestion, nextQuestion } = this.state;

    if (loading) return <h1>Loading...</h1>;
    if (countQuestion === cinco) {
      return <Redirect to="/feedback" />;
      // return (
      //   <Link to="/feedback">
      //     <button type="button">Próximo</button>
      //   </Link>
      // );
    }

    const questionTrivia = questions.results[countQuestion];
    const alternatives = [
      ...questionTrivia.incorrect_answers,
      questionTrivia.correct_answer,
    ].sort();

    return (
      <div>
        <h2 data-testid="question-text">{questionTrivia.question}</h2>
        <span data-testid="question-category">{questionTrivia.category}</span>
        <div>
          {alternatives.map((alternative, index) => this.Answer(
            alternative, questionTrivia.correct_answer, index,
          ))}
        </div>
        {nextQuestion ? this.questionNext() : ''}
      </div>
    );
  }
}

export default Question;
