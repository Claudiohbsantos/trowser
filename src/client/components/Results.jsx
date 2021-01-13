import React, { useState } from 'react';
import ResultEntry from './ResultEntry'
import styles from './Results.module.scss';

const Results = ({ query, searcher }) => {
  const [showType, setShowType] = useState(false)
  const [showParents, setShowParents] = useState(true)

  const results = searcher(query);

  return (
    <div className={styles.resultsContainer}>
      {results.map((entry) => ( <ResultEntry entry={entry} showType={showType} showParents={showParents}/>))}
    </div>
  );
};

export default Results;
