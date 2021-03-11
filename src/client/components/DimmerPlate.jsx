import React from 'react';
import styled from 'styled-components';

const Dimmer = styled.div`
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
`;

const DimmerTop = styled(Dimmer)`
  transform-origin: center top;
  transform: rotate(180deg) translateY(5px);
`;

export const TopDimmerPlate = ({ clickHandler }) => <DimmerTop onClick={clickHandler} />;

export const BottomDimmerPlate = ({ clickHandler }) => <Dimmer onClick={clickHandler} />;
