// https://github.com/KubaJastrz/find-types
import React from 'react';
import styles from './PackageDisplay.module.scss';
import { getPackageTypeInfo } from '../packages/getNpmData';



const PackageDisplay = ({ name, changePackage }) => {
  const nameIsValid = (search) => /\w/.test(search) && search !== name;

  const getPackageURL = (search) => {
    packageName = search.trim().toLowerCase();
    if (!nameIsValid(packageName)) return;

    getPackageTypeInfo(packageName)
    .then(url => changePackage(packageName, url))
    .catch(err => console.error(err));
  };

  const onInputBlur = (evt) => {
    getPackageURL(evt.target.value)
    evt.target.value = ''
  };
  const onInputEnter = (evt) => (evt.key === 'Enter' ? getPackageURL(evt.target.value) : null);

  return (
    <input
      className={styles.packageSearch}
      type="text"
      placeholder={name}
      onBlur={onInputBlur}
      onKeyUp={onInputEnter}
    />
  );
};

export default PackageDisplay;
