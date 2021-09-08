import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Question from '../components/question';
import { fetchTriviaQuestions } from '../services/API';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
    };

    this.fetchAndStoreQuestions = this.fetchAndStoreQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchAndStoreQuestions();
  }

  async fetchAndStoreQuestions() {
    const { token } = this.props;
    console.log(token);
    const re2 = await fetchTriviaQuestions(token);
    const { results } = re2;
    this.setState({
      questions: [...results],
      loading: false,
    });
  }

  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { questions, loading } = this.state;
    const question = questions[0];
    if (loading) {
      return (
        <div>carregando...</div>
      );
    }
    return (
      <>
        <Header />
        <Question
          key={ question.question }
          category={ question.category }
          question={ question.question }
          correctAnswer={ question.correct_answer }
          incorrectAnswers={ question.incorrect_answers }
        />
        <button type="button" data-testid="btn-ranking" onClick={ this.handleClick }>
          Ver Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.game.token.token,
});

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
};
