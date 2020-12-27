import React from 'react';
import MainLayout from './MainLayout';
import styled from 'styled-components';
import ItemWrapper from '../item/ItemWrapper';

const Container = styled.div`
  width: 767px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Wrapper = styled.div``;

const PostsLayout = ({ children, userId, posts, query }) => {
  return (
    <MainLayout userId={userId}>
      <Container>
        <Wrapper>{children}</Wrapper>
        {posts.map((v) => (
          <ItemWrapper key={v.id} data={v} query={query} />
        ))}
      </Container>
    </MainLayout>
  );
};

export default PostsLayout;
