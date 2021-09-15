import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { logged, setScore } from '../redux/actions';
import '../css/Login.css';
import LogoTrivia from '../images/logo.png';
import LoginCard from '../components/LoginCard';

class Login extends React.Component {
  componentDidMount() {
    const { getScore } = this.props;
    getScore(0);
  }

  render() {
    const { history } = this.props;

    return (
      <div className="login-page">
        <div className="background">
          <div className="square-background" />
          <div className="circle-background" />
        </div>

        <main className="login-main">
          <img src={ LogoTrivia } alt="logo trivia" className="logo-trivia" />
          <LoginCard history={ history } />
        </main>

        <footer className="login-footer">
          <p>
            Desenvolvido por <br />
            <a href="https://github.com/Arthur-Jr">Arthur</a>
            &nbsp;|&nbsp;
            <a href="https://github.com/Btriz">Beatriz</a>
            &nbsp;|&nbsp;
            <a href="https://github.com/bvottri">Bruna</a>
            &nbsp;|&nbsp;
            <a href="https://github.com/marcusrodriguesdev">Marcus</a>
          </p>

          <p>
            Inspirado em &nbsp;
            <a href="https://kahoot.it/" className="kahoot-link">kahoot.it</a>
          </p>
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getInfo: (name, email) => dispatch(logged(name, email)),
  getScore: (score) => dispatch(setScore(score)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
