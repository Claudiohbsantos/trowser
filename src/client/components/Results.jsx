import React, { useState } from 'react';
import ResultEntry from './ResultEntry'

const Results = ({ query, searcher }) => {
  const results = searcher(query);

  return (
    <div>
      {results.map((entry) => ( <ResultEntry entry={entry} />))}
    </div>
  );
};

export default Results;
