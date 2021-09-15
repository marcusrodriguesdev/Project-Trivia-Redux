import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '../components/Select';
import { setSettings } from '../redux/actions';
import '../css/Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [{ name: 'Any', id: '' }],
      category: '',
      difficulty: '',
      quantity: 5,
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { category, difficulty, quantity } = this.state;
    const { saveSettings, history } = this.props;
    const configs = { category, difficulty, quantity };
    saveSettings(configs);
    history.push('/');
  }

  async fetchApi() {
    const response = await fetch('https://opentdb.com/api_category.php');
    const categories = await response.json();

    this.setState((prev) => ({
      categories: [...prev.categories, ...categories.trivia_categories],
    }));
  }

  render() {
    const difficulties = [
      { name: 'Any', id: '' }, { name: 'Easy', id: 'easy' },
      { name: 'Medium', id: 'medium' }, { name: 'Hard', id: 'hard' }];
    const { categories, quantity } = this.state;

    return (
      <div className="settings-page">
        <header className="settingHeader">
          <h1
            className="settings-title"
            data-testid="settings-title"
          >
            Configurações
          </h1>
        </header>
        <form className="settingForm">
          <div className="selectsDiv">
            <Select
              name="category"
              text="Categoria"
              handleChange={ this.handleChange }
              items={ categories }
            />
            <Select
              name="difficulty"
              text="Dificuldade"
              handleChange={ this.handleChange }
              items={ difficulties }
            />
            <label htmlFor="quantity">
              Quantidade de Perguntas:
              <input
                name="quantity"
                type="number"
                min="5"
                max="30"
                id="quantity"
                onChange={ this.handleChange }
                value={ quantity }
              />
            </label>
          </div>
          <div className="save-settings">
            <button type="button" onClick={ this.handleClick }>Salvar</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveSettings: (config) => dispatch(setSettings(config)),
});

Settings.propTypes = {
  saveSettings: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
