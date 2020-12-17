import React from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentWrapper = ({ postId, comments, me, toggleDialog }) => {
  return (
    <Container>
      <CommentForm postId={postId} me={me} comments={comments} toggleDialog={toggleDialog} />
      {comments.map((v) => (
        <Comment key={v.id} data={v} me={me} postId={postId} />
      ))}
    </Container>
  );
};

export default CommentWrapper;
