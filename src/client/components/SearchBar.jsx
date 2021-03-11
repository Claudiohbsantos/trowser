import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  background: ${(props) => props.theme.base3};
  width: 80%;
  // height: 40px;
  margin: 50px;
  font-size: 1.2em;
  padding: 15px 25px;
  color: ${(props) => props.theme.darkFont};
  border-radius: 40px;
  border: none;

  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const placeholder = `Search for a method`;

const SearchBar = (props) => (
  <Container>
    <SearchInput type="text" id="searchbar" onChange={props.onChange} placeholder={placeholder} />
  </Container>
);

export default SearchBar;
