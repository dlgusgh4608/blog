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

const Main = () => {
  return (
    <Container>
      <Search />
      <PostWrapper>
        <Post />
      </PostWrapper>
    </Container>
  );
};

export default Main;
