import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 50%;
  @media (max-width: 880px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  padding: 3rem;
  flex: 1 1 0%;
  background-color: pink;
  overflow-y: auto;

  pre {
    background-color: rgb(251, 252, 253);
    padding: 1rem;
    border-radius: 7px;
    line-height: 1.5;
    overflow-x: auto;
  }

  blockquote {
    background-color: rgb(248, 249, 250);
    border-left: 6px solid greenyellow;
    margin: 2rem 0;
    padding: 0.7rem;
    overflow-x: auto;
  }
`;

const Title = styled.h1`
  font-size: 2.75rem;
  margin-top: 2.5rem;
  margin-bottom: 4rem;
`;

const MarkDownPreview = styled.div`
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Preview = ({ markdown, title }) => {
  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <MarkDownPreview>
          <div dangerouslySetInnerHTML={markdown()}></div>
        </MarkDownPreview>
      </Wrapper>
    </Container>
  );
};

export default Preview;
