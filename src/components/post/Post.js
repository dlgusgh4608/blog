import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';

const Container = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
`;

const Post = () => {
  return (
    <MainLayout>
      <Container>
        <h1>제목띠</h1>
        <span>작성자</span>
        <span>·</span>
        <span>2020년 12월 31일</span>
      </Container>
    </MainLayout>
  );
};

export default Post;
