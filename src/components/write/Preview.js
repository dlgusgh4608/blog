import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  background-color: white;
  padding: 3rem;
  word-break: break-word;
`;

const Preview = ({ markdown }) => {
  return (
    <Container>
      <div dangerouslySetInnerHTML={markdown()}></div>
    </Container>
  );
};

export default Preview;
