import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const WriteLayout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default WriteLayout;
