import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { buildSymbolList, createSearchInstance } from '../../astParser/index';
import SearchBar from './SearchBar';
import Results from './Results';
import PackageDisplay from './PackageDisplay';
import { getPackageTypeInfo } from '../packages/getNpmData';
import theme from './solarizedTheme';

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Fira+Code&family=Roboto&display=swap");

  html {
      overflow-y: scroll;
      background-color: ${(props) => props.theme.base03};
      font-family: ${(props) => props.theme.codeFont};
      color: ${(props) => props.theme.base1};
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.textFont};
  font-size: 3em;
  font-weight: bold;
  color: ${(props) => props.theme.title};
`;

const debounce = (timeout, func) => {
  let currTimer;
  let latestParams;
  return (...params) => {
    latestParams = params;
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
      // symbolsList: [],
      isLoading: false,
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
        this.setState({ searchInstance, ...newState, isLoading: false });
      })
      .catch((err) => console.error(err));
  }

  changePackage(packageName) {
    this.setState({ isLoading: true }, () => {
      console.log('super');
      getPackageTypeInfo(packageName)
        .then((url) => this.updateSymbolsAndState({ packageName, declarationUrl: url }))
        .catch((err) => console.error(err));
    });
  }

  searchOnChange({ target: { value } }) {
    this.debouncedSearch(value);
  }

  componentDidMount() {
    this.updateSymbolsAndState({
      declarationUrl: 'https://unpkg.com/typescript@4.1.3/lib/lib.es5.d.ts',
      packageName: 'es5',
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContainer id="app-container">
          <Title>Trowser</Title>
          <PackageDisplay
            name={this.state.packageName}
            changePackage={this.changePackage}
            isLoading={this.state.isLoading}
          />
          <SearchBar onChange={this.searchOnChange} />
          <Results searcher={this.state.searchInstance} query={this.state.query} />
        </AppContainer>
      </ThemeProvider>
    );
  }
}
