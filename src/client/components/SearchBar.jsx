import React from 'react';
import styles from './SearchBar.module.scss';

const SearchBar = (props) => (
  <div className="container">
    <input type="text" id="searchbar" onChange={props.onChange} />
  </div>
);
export default SearchBar;
