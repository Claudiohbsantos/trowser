import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Dimmer = styled.div`
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 0;
  width: 100%;
  height: 0;
`;

const DimmerTop = styled(Dimmer)`
  transform-origin: center top;
  transform: rotate(180deg) translateY(5px);
  height: 100vh;
`;

export const TopDimmerPlate = ({ clickHandler }) => {
  const ref = useRef(null);

  useEffect(() => {
    const { bottom } = ref.current.getBoundingClientRect();
    const topHeight = bottom + window.scrollY;
    ref.current.style = `height: ${topHeight}px;`;
  });

  return <DimmerTop onClick={clickHandler} ref={ref} />;
};

export const BottomDimmerPlate = ({ clickHandler }) => {
  const ref = useRef(null);

  useEffect(() => {
    const appHeight = document.querySelector('#app-container').scrollHeight;
    const { top } = ref.current.getBoundingClientRect();
    const bottomHeight = appHeight - (top + window.scrollY);
    ref.current.style = `height: ${bottomHeight}px;`;
  });

  return <Dimmer onClick={clickHandler} ref={ref} />;
};
