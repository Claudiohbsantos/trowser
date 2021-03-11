import React, { useState } from 'react';
import ResultEntry from './ResultEntry';
import styled from 'styled-components';

const SearcResults = styled.div`
  width: 60%;
  margin-left: 20%;
`;

const Results = ({ query, searcher }) => {
  const [showType, setShowType] = useState(false);
  const [showParents, setShowParents] = useState(true);
  const [showReturn, setShowReturn] = useState(true);

  const results = searcher(query);
  return (
    <SearcResults>
      {results.map((entry) => (
        <ResultEntry
          entry={entry}
          showType={showType}
          showParents={showParents}
          showReturn={showReturn}
          key={`_result_${entry.item?.parents?.join('') + entry.item.name}`}
        />
      ))}
    </SearcResults>
  );
};

export default Results;
