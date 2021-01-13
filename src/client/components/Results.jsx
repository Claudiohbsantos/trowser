import React, { useState } from 'react';
import ResultEntry from './ResultEntry'

const Results = ({ query, searcher }) => {
  const [showType, setShowType] = useState(true)
  const [showParents, setShowParents] = useState(true)

  const results = searcher(query);

  return (
    <div>
      {results.map((entry) => ( <ResultEntry entry={entry} showType={showType} showParents={showParents}/>))}
    </div>
  );
};

export default Results;
