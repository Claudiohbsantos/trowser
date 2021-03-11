import React from 'react';
import styled from 'styled-components';
import { formatType } from '../../astParser/index';
import MethodSignature from './MethodSignature';

const EntryCard = styled.div`
  margin: 20px 0;
`;

const Subheader = styled.h3`
  font-size: 1em;
  font-family: ${(props) => props.theme.textFont};
  font-weight: normal;
  position: absolute;
  // calculation don't work inside translate.
  transform: translateX(-100%) translateX(-15px);
  margin: 0;
  color: ${(props) => props.theme.base00};
`;

const ParameterListEl = styled.ul`
  padding: 0;
  list-style: none;
`;

const ParamLi = styled.li`
  margin: 13px 0;
`;

const ParamName = styled.span`
  color: ${(props) => props.theme.parameterName};
`;

const ParamType = styled.span`
  color: ${(props) => props.theme.parameterType};
`;

const ReturnTypeDiv = styled.span`
  color: ${(props) => props.theme.returnType};
`;

const DescriptionDiv = styled.div`
  font-family: ${(props) => props.theme.textFont};
  margin: 5px 0;
  color: ${(props) => props.theme.lightFont};
  letter-spacing: 1.1;
`;

const OverloadListDiv = styled.div`
  margin: 20px 0;
`;

const OverloadDiv = styled.div`
  margin: 10px 0;
`;

const punct = (str) => <span>{str}</span>;

const Description = ({ description }) => <DescriptionDiv>{description}</DescriptionDiv>;

const ParamEntry = ({ param }) => {
  return (
    <ParamLi>
      {param.isRest ? punct('...') : null}
      <ParamName>{param.name}</ParamName>
      {param.isOptional ? punct('?') : null}
      {punct(': ')}
      <ParamType>{formatType(param.type) ?? null}</ParamType>
      {!param.description ? null : <DescriptionDiv>{param.description}</DescriptionDiv>}
    </ParamLi>
  );
};

const ParameterList = ({ parameters }) => (
  <ParameterListEl>
    {parameters.map((p) => (
      <ParamEntry param={p} key={`_expandedparam_${p?.name}`} />
    ))}
  </ParameterListEl>
);

const Parameters = ({ parameters }) => (
  <div>
    <Subheader>Parameters</Subheader>
    <ParameterList parameters={parameters} />
  </div>
);

const ReturnType = ({ returnType }) => (
  <div>
    <Subheader>Return</Subheader>
    <ReturnTypeDiv>{formatType(returnType)}</ReturnTypeDiv>
  </div>
);

const Overload = ({ entry }) => (
  <OverloadDiv>
    <MethodSignature entry={entry} showType={true} showParents={false} showReturn={true} />
  </OverloadDiv>
);

const OverloadsList = ({ entries }) => (
  <OverloadListDiv>
    <Subheader>Overloads</Subheader>
    {entries.map((e, i) => (
      <Overload entry={e} key={`overload_${e.name}_${i}`} />
    ))}
  </OverloadListDiv>
);

const ExpandedEntry = ({ entry }) => {
  const item = entry.item;
  return (
    <EntryCard>
      {item?.description ? <Description description={item.description} /> : null}
      {item?.parameters?.length ? <Parameters parameters={item.parameters} /> : null}
      {item?.return ? <ReturnType returnType={item.return} /> : null}
      {entry?.otherOverloads.length ? <OverloadsList entries={entry.otherOverloads} /> : null}
    </EntryCard>
  );
};

export default ExpandedEntry;
