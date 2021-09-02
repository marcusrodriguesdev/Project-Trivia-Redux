import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Trivia extends React.Component {
  setToken() {
    const { savedToken } = this.props;
    localStorage.setItem('token', savedToken);
  }

  render() {
    this.setToken();

    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedToken: state.user.token,
});

Trivia.propTypes = {
  savedToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Trivia);
