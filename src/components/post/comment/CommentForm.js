import React from 'react';
import styled from 'styled-components';
import TextArea from 'react-textarea-autosize';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentText = styled(TextArea)`
  border: 1px solid gray;
  resize: none;
  outline: none;
  min-height: 4rem;
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

const CommentForm = ({ onClickAdd, comment, onChangeComment }) => {
  return (
    <Container>
      <h3>7777개의 댓글</h3>
      <CommentText placeholder="댓글을 작성해보세요." value={comment} onChange={onChangeComment}></CommentText>
      <BtnWrapper>
        <CommentBtn onClick={onClickAdd}>댓글 작성</CommentBtn>
      </BtnWrapper>
      <Hr />
    </Container>
  );
};

export default CommentForm;
