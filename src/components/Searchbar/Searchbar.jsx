import { Component } from 'react';
import { IconSearch } from 'styles/icons';
import { SearchBtn, SearchForm } from './Searchbar.styled';
import { TextField } from 'components/TextField/TextField';

export default class Searchbar extends Component {
  state = { searchQuery: '' };

  handleSearchQueryChange = e => {
    this.setState({ searchQuery: e?.target.value || '' });
  };

  handleFormSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    onSubmit && onSubmit(e, this.state.searchQuery.trim());
  };

  render() {
    const { width, height, ...restProps } = this.props;
    const { handleSearchQueryChange, handleFormSubmit } = this;
    const { searchQuery } = this.state;

    return (
      <SearchForm width={width} height={height} onSubmit={handleFormSubmit}>
        <TextField
          autocomplete="off"
          placeholder="Search images..."
          onChange={handleSearchQueryChange}
          value={searchQuery}
          {...restProps}
        />
        <SearchBtn type="submit" disabled={!searchQuery}>
          <IconSearch size="95%" />
        </SearchBtn>
      </SearchForm>
    );
  }
}
