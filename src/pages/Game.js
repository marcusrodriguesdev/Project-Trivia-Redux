import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestQuestionsThunk } from '../redux/actions';
import Header from '../components/Header';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
    this.handleQuestions = this.handleQuestions.bind(this);
  }

  componentDidMount() {
    this.handleQuestions();
  }

  async handleQuestions() {
    const { getQuestions, token } = this.props;
    console.log(token);
    const data = await getQuestions(token);
    console.log(data);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    const { questions: { results } } = this.props;

    if (loading) return <h1>Carregando jogo</h1>;
    return (
      <>
        <Header />
        <span data-testid="question-category">{ results[0].category }</span>
        <span data-testid="question-text">
          { results[0].question }
        </span>
        <span data-testid="correct-answer">{ results[0].correct_answer }</span>
        {results[0].incorrect_answers
          .map((answer, index) => <span key={ index } data-testid={ `wrong-answer-${index}` }>{answer}</span>)}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(requestQuestionsThunk(token)),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
  questions: state.questionsReducer.questions,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
