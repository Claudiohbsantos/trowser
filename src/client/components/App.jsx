import React, { Component } from 'react';
import { render } from 'react-dom';
import { buildSymbolList, createSearchInstance } from '../../astParser/index';
import styles from './App.module.scss';
import SearchBar from './SearchBar';
import Results from './Results';
import PackageDisplay from './PackageDisplay';

const debounce = (timeout, func) => {
  let currTimer;
  let latestParams;
  return (...params) => {
    latestParams = params
    if (!currTimer)
      currTimer = setTimeout(() => {
        currTimer = null;
        func(...latestParams);
      }, timeout);
  };
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      declarationUrl: 'https://unpkg.com/typescript@4.1.3/lib/lib.es5.d.ts',
      packageName: 'es5',
      searchInstance: () => [],
      symbolsList: [],
      query: '',
    };
    this.searchOnChange = this.searchOnChange.bind(this);
    this.changePackage = this.changePackage.bind(this);
    this.debouncedSearch = debounce(300, (searchStr) => this.setState({ query: searchStr }));
  }

  updateSymbolsAndState(newState) {
    fetch(newState.declarationUrl)
      .then((res) => res.text())
      .then((declaration) => {
        const symbolList = buildSymbolList(declaration);
        const searchInstance = createSearchInstance(symbolList);
        this.setState({ searchInstance, ...newState });
      })
      .catch((err) => console.error(err));
  }

  searchOnChange({ target: { value } }) {
    this.debouncedSearch(value);
  }

  changePackage(packageName, declarationUrl) {
    this.updateSymbolsAndState({ packageName, declarationUrl });
  }

  componentDidMount() {
    this.updateSymbolsAndState({
      declarationUrl: 'https://unpkg.com/typescript@4.1.3/lib/lib.es5.d.ts',
      packageName: 'es5',
    });
  }

  render() {
    return (
      <div id="app-container">
        <h1 className={styles.title}>Trowser</h1>
        <PackageDisplay name={this.state.packageName} changePackage={this.changePackage} />
        <SearchBar onChange={this.searchOnChange} />
        <Results searcher={this.state.searchInstance} query={this.state.query} />
      </div>
    );
  }
}
