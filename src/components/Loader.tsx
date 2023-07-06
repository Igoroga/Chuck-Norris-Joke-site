import React from 'react';
import styled, { keyframes } from 'styled-components';

const loaderAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const LoaderWrapper = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
`;

const LoaderDot = styled.div`
  width: 6px;
  height: 6px;
  background-color: #000;
  border-radius: 50%;
  position: absolute;
  animation: ${loaderAnimation} 1.2s infinite ease-in-out;

  &:nth-child(1) {
    left: 3px;
    animation-delay: -0.24s;
  }
  &:nth-child(2) {
    left: 3px;
    animation-delay: -0.12s;
  }
  &:nth-child(3) {
    left: 15px;
    animation-delay: 0;
  }
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderDot />
      <LoaderDot />
      <LoaderDot />
    </LoaderWrapper>
  );
};

export default Loader;