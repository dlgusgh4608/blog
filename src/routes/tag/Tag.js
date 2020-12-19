import React, { useEffect } from 'react';
import PostsLayout from '../../components/layout/PostsLayout';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_TAG_POSTS_REQUEST } from '../../reducer/post';
const Container = styled.div`
  margin-top: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
`;

const Wrapper = styled.div`
  margin-bottom: 2rem;
  color: gray;
`;

const Tag = ({ match }) => {
  const dispatch = useDispatch();
  const content = match.params.tag;
  const { tagPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_TAG_POSTS_REQUEST,
      data: {
        content,
      },
    });
  }, [content]);
  return (
    <PostsLayout posts={tagPosts}>
      <Container>
        <Title># {content}</Title>
        {tagPosts[0] && (
          <Wrapper>
            <span>총 </span>
            <span>{tagPosts.length}</span>
            <span>개의 포스트</span>
          </Wrapper>
        )}
      </Container>
    </PostsLayout>
  );
};
export default Tag;
