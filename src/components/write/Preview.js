import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  background-color: #f1f1f1;
`;

const Preview = ({ markdown }) => {
  return (
    <Container>
      <div dangerouslySetInnerHTML={markdown()}></div>
    </Container>
  );
};

export default Preview;
