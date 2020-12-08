import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const ToolWrapper = styled.button`
  display: flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  background: none;
  padding: 0px;
  border: none;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: gray;
  }
`;

const HTag = styled.div`
  font-size: 1.2rem;

  span {
    font-size: 0.75rem;
  }
`;

const ToolBar = ({ onClickHTag, props }) => {
  const HTagList = [1, 2, 3, 4];

  return (
    <Container>
      {HTagList.map((v, i) => (
        <ToolWrapper key={i} value={v} onClick={() => onClickHTag(v, props)}>
          <HTag>
            H<span>{v}</span>
          </HTag>
        </ToolWrapper>
      ))}
      <ToolWrapper>ㄹㅇ</ToolWrapper>
      <ToolWrapper>ㅋㅋ</ToolWrapper>
      <ToolWrapper>ㄹㅇ</ToolWrapper>
      <ToolWrapper>ㅋㅋ</ToolWrapper>
      <ToolWrapper>ㄹㅇ</ToolWrapper>
      <ToolWrapper>ㅋㅋ</ToolWrapper>
    </Container>
  );
};

export default ToolBar;
