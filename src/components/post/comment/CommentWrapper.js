import React, { useCallback } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import styled from 'styled-components';
import useInput from '../../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../../reducer/post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentWrapper = ({ postId }) => {
  const dispatch = useDispatch();
  const [comment, onChangeComment, setComment] = useInput('');
  const onClickAdd = useCallback(() => {
    if (!comment) {
      return alert('댓글을 입력해주세요.');
    }
    setComment('');
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId,
        content: comment,
      },
    });
  }, [postId, comment]);
  return (
    <Container>
      <CommentForm onClickAdd={onClickAdd} comment={comment} onChangeComment={onChangeComment} />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  );
};

export default CommentWrapper;
