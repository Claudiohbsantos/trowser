import React from 'react';
import styles from './MethodSignature.module.scss';
import { formatSignatureParts } from '../../astParser/index';

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
      {punct(' => ')}
      <span className={styles.returnType}>{returnType}</span>
    </span>
  );
};

const Overloads = (otherOverloads) =>
  otherOverloads?.length ? (
    <span className={styles.overloads}> +{otherOverloads.length}</span>
  ) : null;

const transform = (transformers, parts) => parts.map((part, i) => transformers[i](part));

const MethodSignature = ({ entry, showType, showParents, showReturn }) => {
  // entry could be a result entry or an item depending on caller
  const item = entry.item ?? entry;
  const parts = formatSignatureParts(item);
  const transformers = [
    Parents(showParents),
    Name,
    Parameters(showType),
    Return(showReturn),
    Overloads,
  ];

  return transform(transformers, parts.concat([entry.otherOverloads]));
};

export default MethodSignature;
