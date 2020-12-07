import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 3rem;
  height: 100%;
  background-color: pink;

  pre {
    background-color: rgb(251, 252, 253);
    padding: 1rem;
    border-radius: 7px;
    line-height: 1.5;
    overflow-x: auto;
  }

  blockquote {
    background-color: rgb(251, 252, 253);
    border-left: 6px solid greenyellow;
    margin: 2rem 0;
    padding: 0.7rem;
  }
`;

const Preview = ({ markdown }) => {
  return (
    <Container>
      <Wrapper>
        <div dangerouslySetInnerHTML={markdown()}></div>
      </Wrapper>
    </Container>
  );
};

export default Preview;
