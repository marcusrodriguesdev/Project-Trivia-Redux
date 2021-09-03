import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/play">
          <button type="button" data-testid="btn-go-home">
            dfg
          </button>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.login.email,
  user: state.login.user,
});

export default connect(mapStateToProps)(Ranking);
