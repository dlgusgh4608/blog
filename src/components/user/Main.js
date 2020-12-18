import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import PostContainer from './PostContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
`;

const PostWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const Main = ({ posts, query, userId }) => {
  return (
    <Container>
      <Search posts={posts} query={query} />
      <PostWrapper>
        {posts.map((v) => (
          <PostContainer key={v.id} post={v} query={query} userId={userId} />
        ))}
      </PostWrapper>
    </Container>
  );
};

export default Main;
