import { Component } from 'react';
import './Searchbar.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.resetForm();
    this.props.getQuery(this.state.query);
  };

  resetForm = () => {
    this.setState({ query: '' });
  };

  render() {
    const { handleFormSubmit, handleInputChange } = this;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            value={this.state.query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  getQuery: PropTypes.func,
};
