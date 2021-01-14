// https://github.com/KubaJastrz/find-types
import React from 'react';
import styles from './PackageDisplay.module.scss';
import PropagateLoader from 'react-spinners/PropagateLoader';

const PackageDisplay = ({ name, changePackage, isLoading }) => {
  const nameIsValid = (search) => /\w/.test(search) && search !== name;

  const getPackageURL = (search) => {
    packageName = search.trim().toLowerCase();
    if (!nameIsValid(packageName)) return;

    changePackage(packageName);
  };

  const onInputBlur = (evt) => {
    getPackageURL(evt.target.value);
    evt.target.value = '';
  };
  const onInputEnter = (evt) => (evt.key === 'Enter' ? getPackageURL(evt.target.value) : null);

  return (
    <div className={styles.packageSearch}>
      {isLoading ? (
        <PropagateLoader color={'#002b36'}/>
      ) : (
        <input type="text" placeholder={name} onBlur={onInputBlur} onKeyUp={onInputEnter} />
      )}
    </div>
  );
};

export default PackageDisplay;
