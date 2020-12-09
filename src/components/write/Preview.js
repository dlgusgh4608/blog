import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  @media (max-width: 880px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  padding: 3rem;
  height: 100%;
  background-color: pink;
  word-break: break-word;

  pre {
    background-color: rgb(251, 252, 253);
    padding: 1rem;
    border-radius: 7px;
    line-height: 1.5;
    width: 40vw;
    overflow-x: auto;
  }

  blockquote {
    background-color: rgb(251, 252, 253);
    border-left: 6px solid greenyellow;
    margin: 2rem 0;
    padding: 0.7rem;
  }
`;

const Title = styled.h1`
  font-size: 2.75rem;
  margin-top: 2.5rem;
  margin-bottom: 4rem;
`;

const Preview = ({ markdown, title }) => {
  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <div dangerouslySetInnerHTML={markdown()}></div>
      </Wrapper>
    </Container>
  );
};

export default Preview;
