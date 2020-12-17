import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(249, 249, 249, 0.7);
  z-index: 999;
`;

const DialogLayout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default DialogLayout;
