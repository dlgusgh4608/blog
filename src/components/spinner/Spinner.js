import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
`;

const Loader = styled.div`
  &,
  &:after {
    border-radius: 50%;
    width: 2em;
    height: 2em;
  }
  & {
    /* margin: 60px auto; */
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 2px solid rgba(255, 255, 255, 0.2);
    border-right: 2px solid rgba(255, 255, 255, 0.2);
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    border-left: 2px solid #000000;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => (
  <Wrapper>
    <Loader />
  </Wrapper>
);

export default Spinner;
