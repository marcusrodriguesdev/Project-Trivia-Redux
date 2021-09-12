import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectInput from '../../components/SelectInput';
import Button from '../../components/Button';

import { fetchCategoriesThunk } from '../../redux/actions/questionActions';

import {
  difficulties,
  types,
  getUserConfigs,
} from '../../services/questionApi';

import './style.css';

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      category: 9,
      difficulty: 'easy',
      type: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUserConfigs = this.getUserConfigs.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;

    getCategories();
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

  render() {
    const { category, difficulty, type } = this.state;
    const { categoryList, history } = this.props;

    return (
      <div>
        <form className="settings-form">
          <div className="select-section">
            <SelectInput
              labelText="Category"
              id="category"
              options={ categoryList }
              value={ category }
              onChange={ this.handleChange }
            />

            <SelectInput
              labelText="Difficulty"
              id="difficulty"
              options={ difficulties }
              value={ difficulty }
              onChange={ this.handleChange }
            />

            <SelectInput
              labelText="Type"
              id="type"
              options={ types }
              value={ type }
              onChange={ this.handleChange }
            />
          </div>
          <div className="buttons-section">
            <Button type="submit" text="Save" onClick={ this.handleClick } />

            <Button
              type="button"
              text="Cancel"
              onClick={ () => history.push('/') }
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  categoryList: questions.categoryList,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(fetchCategoriesThunk()),
});

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
