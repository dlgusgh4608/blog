import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const WriteLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default WriteLayout;
