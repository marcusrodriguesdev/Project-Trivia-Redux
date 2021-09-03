import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import { fetchQuestions } from '../Services/api';
import Questions from '../Components/Questions';

import '../Styles/global.css';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsInfo: [],
      index: 0,
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
    this.setState(({ index }) => ({
      index: index + 1,
    }));
  }

  render() {
    const { questionsInfo, index } = this.state;

    return (
      <div>
        <Header />
        <main>
          {
            questionsInfo.filter((...info) => (
              info[1] === index
            )).map((question) => <Questions key={ index } question={ question } />)
          }

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
