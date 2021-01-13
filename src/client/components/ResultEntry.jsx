import React from 'react';
import { formatSignature, formatTypedSignature, formatSignatureParts } from '../../astParser/index';
import styles from './ResultEntry.module.scss';

const unsafeJoinComponents = (arr, separator) => {
  if (!arr) return null;
  for (let i = arr.length - 2; i >= 0; i--) {
    arr.splice(i + 1, 0, separator);
  }
  return arr;
};

const Parents = (parents) =>
  parents?.map((p) => (
    <span>
      <span className={styles.parents}>{p}</span>
      <span className={styles.punctuation}>.</span>
    </span>
  )) ?? null;

const Name = (name) => <span className={styles.name}>{name}</span>;

const commaSeparator = <span className={styles.punctuation}>, </span>;

const Parameter = (p) => (
  <span className={styles.parameter}>
    {p.isRest ? <span className={styles.punctuation}>...</span> : null}
    <span className={styles.parameterName}>{p.name}</span>
    {p.isOptional ? <span className={styles.punctuation}>?</span> : null}
    <span className={styles.punctuation}>:</span>
    <span className={styles.parameterType}> {p.type} </span>
  </span>
);

const Parameters = (parameters) => (
  <span className={styles.parameters}>
    ( {unsafeJoinComponents(parameters?.map(Parameter), commaSeparator)})
  </span>
);

const Return = (returnType) => (
  <span>
    <span className={styles.punctuation}> => </span>
    <span className={styles.returnType}> {returnType}</span>
  </span>
);

const ResultEntry = ({ entry }) => {
  const parts = formatSignatureParts(entry);
  const transformers = [Parents, Name, Parameters, Return];
  const transform = (transformers, parts) => parts.map((part, i) => transformers[i](part));

  return <div className={styles.entry}>{transform(transformers, parts)}</div>;
  // <div>{formatSignature(entry)}</div>
  // <div className="container">{formatTypedSignature(entry)}</div>
};

export default ResultEntry;
