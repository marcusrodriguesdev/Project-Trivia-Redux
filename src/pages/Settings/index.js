import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectInput from '../../components/SelectInput';

import {
  getCategories,
  difficulties,
  types,
  getUserConfigs,
} from '../../services/questionApi';

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      category: 9,
      difficulty: 'easy',
      type: '',
      categoryList: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.getUserConfigs = this.getUserConfigs.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
    this.getUserConfigs();
  }

  getUserConfigs() {
    this.setState({
      ...getUserConfigs(),
    });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { category, difficulty, type } = this.state;
    const { history } = this.props;

    localStorage.setItem(
      'userConfigs',
      JSON.stringify({
        category,
        difficulty,
        type,
      }),
    );

    history.push('/');
  }

  async fetchCategories() {
    const categoryList = await getCategories();

    this.setState({
      categoryList,
    });
  }

  render() {
    const { category, difficulty, type, categoryList } = this.state;

    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <form>
          <SelectInput
            labelText="Categoria"
            id="category"
            options={ categoryList }
            value={ category }
            onChange={ this.handleChange }
          />

          <SelectInput
            labelText="Dificuldade"
            id="difficulty"
            options={ difficulties }
            value={ difficulty }
            onChange={ this.handleChange }
          />

          <SelectInput
            labelText="Tipo"
            id="type"
            options={ types }
            value={ type }
            onChange={ this.handleChange }
          />

          <button type="submit" onClick={ this.handleClick }>
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;
