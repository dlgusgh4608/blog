import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import Post from './Post';

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

const Main = ({ posts }) => {
  return (
    <Container>
      <Search posts={posts} />
      <PostWrapper>
        {posts.map((v) => (
          <Post key={v.id} post={v} />
        ))}
      </PostWrapper>
    </Container>
  );
};

export default Main;
