import React, { useState } from 'react';
import styles from './ResultEntry.module.scss';
import ExpandedEntry from './ExpandedEntry';
import MethodSignature from './MethodSignature';

// const opacityFromRelevance = (score) => (score ? 1 - score : 1);
// const grayscaleFromRelevance = (score) => (score ? score * 100 : 0);

const ResultEntry = (props) => {
  const [expanded, setExpanded] = useState('')
  const [showExpandedCard, setShowExpandedCard] = useState(false);

  const onClickHandler = () => {
    setExpanded(expanded ? '' : styles.expanded)
    setShowExpandedCard(!showExpandedCard);
  };

  return (
    <div>
      <div
        className={`${styles.entry} ${expanded}`}
        onClick={onClickHandler}
        // style={
        // {
        // opacity: opacityFromRelevance(entry.score),
        // filter: `grayscale(${grayscaleFromRelevance(entry.score)})`,
        //   }
        // }
      >
        <MethodSignature {...props} />
      </div>
      {showExpandedCard ? <ExpandedEntry entry={props.entry} /> : null}
    </div>
  );
};

export default ResultEntry;
