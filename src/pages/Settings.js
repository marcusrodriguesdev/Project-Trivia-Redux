import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setPlayerSettings } from '../actions';
import { fetchCategories } from '../services/apiHelper';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        category: 'All',
        difficulty: 'All',
        type: 'All',
      },
      difficulty: ['easy', 'medium', 'hard'],
      type: ['multiple', 'boolean'],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetchCategories()
      .then((categories) => this.setState({ categories }));
  }

  handleChange({ target: { name, value } }) {
    const { categories } = this.state;
    if (name === 'category') {
      const cat = categories.trivia_categories
        .find((category) => category.name === value);
      this.setState((prevState) => ({
        settings: {
          ...prevState.settings,
          [name]: cat ? cat.id : 'All',
        },
      }));
    } else {
      this.setState((prevState) => ({
        settings: {
          ...prevState.settings,
          [name]: value,
        },
      }));
    }
  }

  handleClick(settings) {
    const { history, sendSettings } = this.props;
    sendSettings(settings);
    history.push('/');
  }

  render() {
    const { categories, difficulty, settings, type } = this.state;
    return (
      <>
        <h2 data-testid="settings-title">Settings</h2>
        <label htmlFor="categories">
          Category:
          <select id="categories" name="category" onChange={ this.handleChange }>
            <option> All </option>
            {categories
          && categories.trivia_categories.map((category) => (
            <option key={ category.id }>
              {category.name}
            </option>))}
          </select>
        </label>
        <br />
        <label htmlFor="difficulty">
          Difficulty:
          <select id="difficulty" name="difficulty" onChange={ this.handleChange }>
            <option> All </option>
            <option value={ difficulty[0] }> Easy </option>
            <option value={ difficulty[1] }> Medium </option>
            <option value={ difficulty[2] }> Hard </option>
          </select>
        </label>
        <br />
        <label htmlFor="type">
          Type:
          <select id="type" name="type" onChange={ this.handleChange }>
            <option> All </option>
            <option value={ type[0] }> Multiple </option>
            <option value={ type[1] }> True/False </option>
          </select>
        </label>
        <br />
        <br />
        <button type="button" onClick={ () => this.handleClick(settings) }>
          Voltar
        </button>
      </>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendSettings: (payload) => dispatch(setPlayerSettings(payload)),
});

export default connect(null, mapDispatchToProps)(Settings);
