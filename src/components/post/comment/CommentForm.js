import React, { useCallback } from 'react';
import styled from 'styled-components';
import TextArea from 'react-textarea-autosize';
import useInput from '../../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../../../reducer/post';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentText = styled(TextArea)`
  border: 1px solid gray;
  resize: none;
  outline: none;
  min-height: 5rem;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.3rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommentBtn = styled.button`
  margin-top: 1rem;
  padding: 0 1rem;
  border-radius: 0.7rem;
  border: none;
  background-color: greenyellow;
  height: 2rem;
  font-size: 1rem;
`;

const Hr = styled.div`
  height: 1px;
  margin-top: 4rem;
  margin-bottom: 3rem;
  background-color: black;
`;

const CommentForm = ({ postId, me, comments, toggleDialog, errorAlert }) => {
  const dispatch = useDispatch();
  const [comment, onChangeComment, setComment] = useInput('');
  const onClickAdd = useCallback(() => {
    if (!me) {
      return toggleDialog();
    }
    if (!comment) {
      return errorAlert('댓글을 입력해주세요.');
    }
    setComment('');
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId,
        content: comment,
      },
    });
  }, [postId, comment, me, dispatch, errorAlert]);
  return (
    <Container>
      <h3>{comments.length} 개의 댓글</h3>
      <CommentText placeholder="댓글을 작성해보세요." value={comment} onChange={onChangeComment}></CommentText>
      <BtnWrapper>
        <CommentBtn onClick={onClickAdd}>댓글 작성</CommentBtn>
      </BtnWrapper>
      <Hr />
    </Container>
  );
};

export default CommentForm;
