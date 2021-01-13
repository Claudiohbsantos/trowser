import React, { Component } from 'react';
import { render } from 'react-dom';
import { buildSymbolList, createSearchInstance } from '../../astParser/index';
// import ts from 'typescript';
import styles from './App.module.scss';
import SearchBar from './SearchBar';
import Results from './Results';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      testDeclaration: 'https://unpkg.com/typescript@4.1.3/lib/lib.es5.d.ts',
      searchInstance: () => [],
      symbolsList: [],
      query: '',
    };
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  searchOnChange({ target: { value } }) {
    this.setState({ query: value });
  }

  componentDidMount() {
    fetch(this.state.testDeclaration)
      .then((res) => res.text())
      .then((declaration) => {
        const symbolList = buildSymbolList(declaration);
        const searchInstance = createSearchInstance(symbolList);
        this.setState({ searchInstance });
      });
  }

  render() {
    return (
      <div id="app-container">
        <h1 className={styles.title}>Trowser</h1>
        <SearchBar onChange={this.searchOnChange} />
        <Results searcher={this.state.searchInstance} query={this.state.query} />
      </div>
    );
  }
}
