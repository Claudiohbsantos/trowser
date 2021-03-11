import React, { useState } from 'react';
import styled from 'styled-components';
import ExpandedEntry from './ExpandedEntry';
import MethodSignature from './MethodSignature';
import { TopDimmerPlate, BottomDimmerPlate } from './DimmerPlate';

const Entry = styled.div`
  margin-bottom: 8px;
  letter-spacing: 1.1;
  line-height: 1.4em;
  cursor: pointer;

  ${(props) =>
    props.isExpanded
      ? `
  font-weight: bold;
  padding-bottom: 5px;
  border-bottom: 1px solid $base01;
  `
      : ''}

  &:hover {
    font-weight: bold;
  }
`;

const ResultEntry = (props) => {
  const [showExpandedCard, setShowExpandedCard] = useState(false);

  const onClickHandler = () => {
    setShowExpandedCard(!showExpandedCard);
  };

  return (
    <div>
      {showExpandedCard ? <TopDimmerPlate clickHandler={onClickHandler} /> : null}
      <Entry isExpanded={showExpandedCard} onClick={onClickHandler}>
        <MethodSignature {...props} />
      </Entry>
      {showExpandedCard ? <ExpandedEntry entry={props.entry} /> : null}
      {showExpandedCard ? <BottomDimmerPlate clickHandler={onClickHandler} /> : null}
    </div>
  );
};

export default ResultEntry;
