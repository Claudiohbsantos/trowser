// https://github.com/KubaJastrz/find-types
import React from 'react';
import styled from 'styled-components';
import PropagateLoader from 'react-spinners/PropagateLoader';

const PackageSearch = styled.div`
    background: ${props => props.theme.yellow};
    padding: 10px 10px;
    border-radius: 20px;
    // TODO: auto grow on type
    width: 500px;
    height: 20px;
    text-align: center;

  &:focus-within {
    background: scale-color(${props => props.theme.yellow}, $lightness: 20%);
  }

  & > input:focus {
    outline: none;
  }

  & > input {
    background: transparent;
    border: none;
    width: 100%;
    text-align: center;
    font-weight: bold;
    color: ${props => props.theme.base03};
  }

  & > input::placeholder {
    color: ${props => props.theme.base03};
  }
`;

const PackageDisplay = ({ name, changePackage, isLoading }) => {
  const nameIsValid = (search) => /\w/.test(search) && search !== name;

  const getPackageURL = (search) => {
    const packageName = search.trim().toLowerCase();
    if (!nameIsValid(packageName)) return;

    changePackage(packageName);
  };

  const onInputBlur = (evt) => {
    getPackageURL(evt.target.value);
    evt.target.value = '';
  };
  const onInputEnter = (evt) => (evt.key === 'Enter' ? getPackageURL(evt.target.value) : null);

  return (
    <PackageSearch>
      {isLoading ? (
        <PropagateLoader color={'#002b36'} />
      ) : (
        <input type="text" placeholder={name} onBlur={onInputBlur} onKeyUp={onInputEnter} />
      )}
    </PackageSearch>
  );
};

export default PackageDisplay;
