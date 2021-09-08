import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    const { assertions } = this.props;
    const checkAssertion = () => {
      const NUMBER_THREE = 3;
      if (assertions < NUMBER_THREE) {
        return <div>Podia ser melhor...</div>;
      } if (assertions >= NUMBER_THREE) {
        return <div>Mandou bem!</div>;
      }
    };
    return (
      <div>
        <div>
          <Header />
        </div>
        <div data-testid="feedback-text">
          { checkAssertion() }
        </div>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(FeedBack);
