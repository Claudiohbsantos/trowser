import React, { useState } from 'react';
import ResultEntry from './ResultEntry'
import styles from './Results.module.scss';

console.log(styles)
const Results = ({ query, searcher }) => {
  const [showType, setShowType] = useState(false)
  const [showParents, setShowParents] = useState(true)

  const results = searcher(query);

  return (
    <div className={styles.searchResults}>
      {results.map((entry) => ( <ResultEntry entry={entry} showType={showType} showParents={showParents}/>))}
    </div>
  );
};

export default Results;
