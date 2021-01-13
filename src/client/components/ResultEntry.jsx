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

const commaSeparator = <span className={styles.punctuation}>, </span>;
const punct = (str) => <span className={styles.punctuation}>{str}</span>;

const Parents = (show) => (parents) => {
  if (!show || !parents) return null;
  return (
    <span className={styles.parentsWrapper}>
      {parents?.map((p) => (
        <span>
          <span className={styles.parents}>{p}</span>
          {punct('.')}
        </span>
      ))}
    </span>
  );
};

const Name = (name) => <span className={styles.name}>{name}</span>;

const Parameter = (showType) => (p) => (
  <span className={styles.parameter}>
    {p.isRest ? punct('...') : null}
    <span className={styles.parameterName}>{p.name}</span>
    {p.isOptional ? punct('?') : null}
    {showType ? punct(':') : null}
    {showType ? <span className={styles.parameterType}> {p.type} </span> : null}
  </span>
);

const Parameters = (showType) => (parameters) => (
  <span className={styles.parameters}>
    {punct('(')}
    {unsafeJoinComponents(parameters?.map(Parameter(showType)), commaSeparator)}
    {punct(')')}
  </span>
);

const Return = (show) => (returnType) => {
  if (!show) return null;
  return (
    <span>
      <span className={styles.punctuation}> => </span>
      <span className={styles.returnType}> {returnType}</span>
    </span>
  );
};

const transform = (transformers, parts) => parts.map((part, i) => transformers[i](part));
const opacityFromRelevance = (score) => (score ? 1 - score : 1);
const grayscaleFromRelevance = (score) => (score ? score * 100 : 0);

const ResultEntry = ({ entry, showType, showParents }) => {
  const parts = formatSignatureParts(entry.item);
  const transformers = [Parents(showParents), Name, Parameters(showType), Return(showType)];
  // todo: show overloads count
  return (
    <div
      className={styles.entry}
      style={{
        opacity: opacityFromRelevance(entry.score),
        // filter: `grayscale(${grayscaleFromRelevance(entry.score)})`,
      }}
    >
      {transform(transformers, parts)}
    </div>
  );
};

export default ResultEntry;
