import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import { fetchQuestions } from '../Services/api';
import Questions from '../Components/Questions';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const { token } = this.props;

    const questions = await fetchQuestions(token);

    this.setState({
      questions,
    });
  }

  render() {
    const { questions } = this.state;

    return (
      <div>
        <Header />
        <main>
          { questions.map((...info) => (<Questions key={ info } questions={ info } />)) }
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ trivia: { token } }) => ({
  token,
});

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Trivia);
