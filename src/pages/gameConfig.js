import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getCategoriesListThunk,
  setSettings as setSettingsAction,
} from '../actions';

import Select from '../components/Select';

const DIFFICULTY_LIST = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

const TYPE_LIST = [
  { id: 'multiple', name: 'Multiple Choice' },
  { id: 'boolean', name: 'True / False' },
];

class GameConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      difficulty: '',
      type: '',
      categoriesList: [],
    };

    this.getCategories = this.getCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    const { getCategoriesList } = this.props;
    const categoriesList = await getCategoriesList();

    this.setState({ categoriesList });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick() {
    const { category, difficulty, type } = this.state;
    const { setSettings, history } = this.props;

    setSettings({ category, difficulty, type });
    history.push('/');
  }

  render() {
    const { categoriesList } = this.state;

    if (!categoriesList.length) return <div>Loading...</div>;

    return (
      <>
        <header>
          <h2 data-testid="settings-title">Configurações</h2>
        </header>
        <main>
          <Select
            text="Categoria"
            name="category"
            onChange={ this.handleChange }
            options={ categoriesList }
          />
          <Select
            text="Dificuldade"
            name="difficulty"
            onChange={ this.handleChange }
            options={ DIFFICULTY_LIST }
          />
          <Select
            text="Tipo"
            name="type"
            onChange={ this.handleChange }
            options={ TYPE_LIST }
          />
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Salvar
          </button>
        </main>
      </>
    );
  }
}

GameConfig.propTypes = {
  getCategoriesList: PropTypes.func.isRequired,
  setSettings: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCategoriesList: () => dispatch(getCategoriesListThunk()),
  setSettings: (endPoint) => dispatch(setSettingsAction(endPoint)),
});

export default connect(null, mapDispatchToProps)(GameConfig);
