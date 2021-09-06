import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Components/Header';
import { fetchQuestions } from '../Services/api';
import Questions from '../Components/Questions';

import '../Styles/global.css';
import { showButton as showBtnAction } from '../Actions';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsInfo: [],
      index: 0,
      showButton: false,
    };

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  // componentWillUnmount() {
  //   const { name, statePoints, email, assertions } = this.props;
  //   const player = { name, score: statePoints, gravatarEmail: email, assertions };
  //   localStorage.setItem('state', JSON.stringify({ player }));
  // }

  async fetchQuestions() {
    const { token } = this.props;

    const questionsInfo = await fetchQuestions(token);

    this.setState({
      questionsInfo,
    });
  }

  handleClick() {
    const { index, questionsInfo } = this.state;
    const { history } = this.props;
    if (index < questionsInfo.length - 1) return this.usualNextClick();
    return history.push('/feedback');
  }

  usualNextClick() {
    const { index } = this.state;
    const { hideButton } = this.props;
    this.setState({ index: index + 1 });
    hideButton(this.state);
  }

  render() {
    const { questionsInfo, index } = this.state;
    const { showButton } = this.props;

    return (
      <div>
        <Header />
        <main>
          {
            questionsInfo.filter((...info) => (
              info[1] === index
            )).map((question) => <Questions key={ index } question={ question } />)
          }

          { showButton && (
            <button
              type="submit"
              data-testid="btn-next"
              onClick={ this.handleClick }
            >
              Próxima
            </button>) }
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ trivia: { token, showButton } }) => ({
  token,
  showButton,
});

const mapDispatchToProps = (dispatch) => ({
  hideButton: (state) => dispatch(showBtnAction(state)),
});

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  showButton: PropTypes.bool.isRequired,
  hideButton: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
