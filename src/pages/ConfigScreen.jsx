import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import configPageIcon from '../config-page-icon.svg';
import { categoriesFetchThunk, updateSelectionAction } from '../redux/actions';

class ConfigScreen extends Component {
  constructor() {
    super();

    this.state = {
      category: 'All',
      difficulty: 'Mixed',
      type: 'Both',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { categoriesFetch } = this.props;
    categoriesFetch();
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { updateSelection, categoriesGlobal } = this.props;
    const { category, difficulty, type } = this.state;
    const config = {
      category,
      difficulty,
      type,
    };
    if (category === 'All') {
      updateSelection(config);
    } else {
      const categoryObj = categoriesGlobal
        .filter((eachCategory) => eachCategory.name === category);
      config.category = categoryObj[0].id;
      updateSelection(config);
    }
  }

  renderCategorys() {
    const { categoriesGlobal } = this.props;
    const { category } = this.state;
    return (
      <div>
        <select
          name="category"
          onChange={ this.handleChange }
          value={ category }
          className="select"
        >
          <option>All</option>
          { categoriesGlobal
            .map((eachCategory) => (
              <option key={ eachCategory.id }>{ eachCategory.name }</option>)) }
        </select>
      </div>
    );
  }

  render() {
    const { difficulty, type } = this.state;
    const difficulties = ['Mixed', 'Easy', 'Medium', 'Hard'];
    const types = ['Both', 'Multiple', 'True or False'];
    return (
      <div className="main-container">
        <div className="config-title">
          <img src={ configPageIcon } alt="" width="80px" />
          <h1 data-testid="settings-title">Configurações</h1>
        </div>
        <div className="select-container">
          <div className="config-subtitles">
            <p>Categorias:</p>
            <p>Dificuldade:</p>
            <p>Tipo:</p>
          </div>
          <div className="config-selects">
            { this.renderCategorys() }
            <select
              name="difficulty"
              onChange={ this.handleChange }
              value={ difficulty }
              className="select"
            >
              { difficulties
                .map((eachDifficulty) => (
                  <option key={ eachDifficulty }>{ eachDifficulty }</option>)) }
            </select>
            <select
              name="type"
              onChange={ this.handleChange }
              value={ type }
              className="select"
            >
              { types
                .map((eachType) => (
                  <option key={ eachType }>{ eachType }</option>)) }
            </select>
          </div>
        </div>
        <Link to="/">
          <button
            type="button"
            onClick={ this.handleClick }
            className="system-btn"
          >
            Confirmar
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoriesGlobal: state.config.categories,
});

const mapDispatchToProps = (dispatch) => ({
  categoriesFetch: () => dispatch(categoriesFetchThunk()),
  updateSelection: (config) => dispatch(updateSelectionAction(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigScreen);

ConfigScreen.propTypes = {
  categoriesFetch: PropTypes.func.isRequired,
  categoriesGlobal: PropTypes.arrayOf().isRequired,
  updateSelection: PropTypes.func.isRequired,
};
