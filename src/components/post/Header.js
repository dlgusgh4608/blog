import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
`;

const Title = styled.h1`
  font-size: 3rem;
`;

const Host = styled.span`
  font-weight: bold;
`;

const At = styled.span`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const TagWrapper = styled.div`
  margin-top: 0.7rem;
`;

const Tag = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #dcecec;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  height: 2rem;
  color: #11d311;
  border-radius: 1rem;
`;

const Header = () => {
  return (
    <Container>
      <Title>제목띠</Title>
      <Host>작성자</Host>
      <At>·</At>
      <span>2020년 12월 31일</span>
      <TagWrapper>
        <Tag>CS</Tag>
        <Tag>nodejs</Tag>
        <Tag>javascript</Tag>
        <Tag>react</Tag>
        <Tag>react</Tag>
        <Tag>react</Tag>
        <Tag>react</Tag>
        <Tag>react</Tag>
        <Tag>react</Tag>
        <Tag>react</Tag>
      </TagWrapper>
    </Container>
  );
};

export default Header;
