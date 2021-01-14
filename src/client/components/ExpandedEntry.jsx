import React from 'react';
import styles from './ExpandedEntry.module.scss';
import { formatType } from '../../astParser/index';
import MethodSignature from './MethodSignature';

const punct = (str) => <span className={styles.punctuation}>{str}</span>;

const Description = ({ description }) => <div className={styles.description}>{description}</div>;

const ParamEntry = ({ param }) => {
  // console.log(param.type, formatType(param.type));
  return (
    <li className={styles.param}>
      {param.isRest ? punct('...') : null}
      <span className={styles.paramName}>{param.name}</span>
      {param.isOptional ? punct('?') : null}
      {punct(': ')}
      <span className={styles.paramType}>{formatType(param.type) ?? null}</span>
      {!param.description ? null : (
        <div className={styles.paramDescription}>{param.description}</div>
      )}
    </li>
  );
};

const ParameterList = ({ parameters }) => (
  <ul className={styles.parameterList}>
    {parameters.map((p) => (
      <ParamEntry param={p} />
    ))}
  </ul>
);

const Parameters = ({ parameters }) => (
  <div className={styles.parameters}>
    <h3 className={styles.subheader}>Parameters</h3>
    <ParameterList parameters={parameters} />
  </div>
);

const ReturnType = ({ returnType }) => (
  <div className={styles.returnType}>
    <h3 className={styles.subheader}>Return</h3>
    <span className={styles.returnType}>{formatType(returnType)}</span>
  </div>
);

const Overload = ({ entry }) => (
  <div>
    <MethodSignature entry={entry} showType={false} showParents={false} showReturn={true} />
  </div>
);

const OverloadsList = ({ entries }) => (
  <div className={styles.overloadList}>
    <h3 className={styles.subheader}>Overloads</h3>
    {entries.map((e, i) => (
      <Overload entry={e} key={`overload_${e.name}_${i}`} />
    ))}
  </div>
);

const ExpandedEntry = ({ entry }) => {
  const item = entry.item;
  return (
    <div className={styles.entryCard}>
      {item?.description ? <Description description={item.description} /> : null}
      {item?.parameters?.length ? <Parameters parameters={item.parameters} /> : null}
      {item?.return ? <ReturnType returnType={item.return} /> : null}
      {entry?.otherOverloads.length ? <OverloadsList entries={entry.otherOverloads} /> : null}
    </div>
  );
};

export default ExpandedEntry;
