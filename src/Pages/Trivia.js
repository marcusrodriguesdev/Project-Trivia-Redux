import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../Components/Header';
import Multiple from '../Components/Multiple';
import Timer from '../Components/Timer';
import '../Styles/trivia.css';
import { setIsClicked } from '../Redux/Action';

class Trivia extends Component {
  render() {
    const { statusCronometer } = this.props;
    return (
      <div>
        <Header />
        <Multiple />
        { statusCronometer === 'on' ? <Timer /> : null }
      </div>
    );
  }
}

Trivia.propTypes = {
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user, trivia, timer }) => ({
  token: user.token,
  isClicked: trivia.isClicked,
  statusCronometer: timer.statusCronometer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDisabled: () => dispatch(setIsClicked()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
