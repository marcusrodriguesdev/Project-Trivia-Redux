import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../redux/actions/index';

// requisito 1
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setToken = this.setToken.bind(this);
  }

  componentDidMount() {
    this.setToken();
  }

  async setToken() {
    const { setToken } = this.props;
    setToken();
  }

  render() {
    return (

      <div>
        <h1>Xablau</h1>
        <p>Home</p>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(Home);

Home.propTypes = {
  setToken: PropTypes.func.isRequired,
};
