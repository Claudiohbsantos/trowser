import React from 'react';
import styled from 'styled-components';
import { formatSignatureParts } from '../../astParser/index';

const ParentsWrapper = styled.div`
  display: inline-block;
  position: absolute;
  transform: translateX(-100%);
`;

const ParentsColor = styled.span`
  color: ${(props) => props.theme.blue};
`;

const NameColor = styled.span`
  color: ${(props) => props.theme.green};
`;

const ParamNameColor = styled.span`
  color: ${(props) => props.theme.parameterName};
`;

const ParamTypeColor = styled.span`
  color: ${(props) => props.theme.parameterType};
`;

const PunctuationColor = styled.span`
  color: ${(props) => props.theme.base01};
`;

const ReturnTypeColor = styled.span`
  color: ${(props) => props.theme.violet};
`;

const OverloadColor = styled.span`
  color: ${(props) => props.theme.base00};
`;

const unsafeJoinComponents = (arr, separator) => {
  if (!arr) return null;
  for (let i = arr.length - 2; i >= 0; i--) {
    arr.splice(i + 1, 0, separator);
  }
  return arr;
};

const commaSeparator = <PunctuationColor>, </PunctuationColor>;
const punct = (str) => <PunctuationColor>{str}</PunctuationColor>;

const Parents = (show) => (parents) => {
  if (!show || !parents) return null;
  return (
    <ParentsWrapper>
      {parents?.map((p) => (
        <span>
          <ParentsColor>{p}</ParentsColor>
          {punct('.')}
        </span>
      ))}
    </ParentsWrapper>
  );
};

const Name = (name) => <NameColor>{name}</NameColor>;

const Parameter = (showType) => (p) => (
  <span key={`_param_${p.name}`}>
    {p.isRest ? punct('...') : null}
    <ParamNameColor>{p.name}</ParamNameColor>
    {p.isOptional ? punct('?') : null}
    {showType ? punct(':') : null}
    {showType ? <ParamTypeColor> {p.type} </ParamTypeColor> : null}
  </span>
);

const Parameters = (showType) => (parameters) => (
  <span>
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
      <ReturnTypeColor>{returnType}</ReturnTypeColor>
    </span>
  );
};

const Overloads = (otherOverloads) =>
  otherOverloads?.length ? <OverloadColor> +{otherOverloads.length}</OverloadColor> : null;

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
