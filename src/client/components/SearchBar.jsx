import React from 'react';
import styles from './SearchBar.module.scss';

const placeholder = `Search for a method`;

const SearchBar = (props) => (
  <div className="container">
    <input type="text" id="searchbar" onChange={props.onChange} placeholder={placeholder} />
  </div>
);
export default SearchBar;
