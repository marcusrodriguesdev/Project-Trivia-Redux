import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import { fetchQuestions } from '../Services/api';
import Questions from '../Components/Questions';

let index = 0;

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsInfo: [],
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const { token } = this.props;

    const questionsInfo = await fetchQuestions(token);

    this.setState({
      questionsInfo,
    });
  }

  handleClick() {
    index += 1;
    console.log(index);
  }

  render() {
    const { questionsInfo } = this.state;

    return (
      <div>
        <Header />
        <main>
          {
            questionsInfo.filter((...info) => (
              info[1] === index
            )).map((question) => <Questions key={ index } question={ question } />)
          }

          {/* {
            console.log(questions.filter(
              (question) => (question[1] === index),
            ))
          } */}
          <button type="submit" onClick={ this.handleClick }>Próxima</button>
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
