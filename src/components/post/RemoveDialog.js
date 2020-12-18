import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DialogLayout from '../layout/DialogLayout';
import Spinner from '../spinner/Spinner';

const Wrapper = styled.div`
  display: flex;
  width: 450px;
  height: 200px;
  z-index: 9999;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
  box-shadow: 0px 0px 5px gray;
`;

const Title = styled.h1`
  margin: 0;
`;

const Ask = styled.span`
  font-size: 1.2rem;
  margin-top: 1.5rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  margin-top: 2.5rem;
  justify-content: flex-end;
`;

const CancelBtn = styled.button`
  margin-left: 0.7rem;
  border: none;
  border-radius: 0.8rem;
  height: 2rem;
  padding: 0 1rem;
  background-color: gray;
  font-size: 1rem;
  cursor: pointer;
`;

const Btn = styled(Link)`
  display: flex;
  align-items: center;
  color: black;
  margin-left: 0.7rem;
  border: none;
  border-radius: 0.8rem;
  height: 2rem;
  padding: 0 1rem;
  background-color: greenyellow;
  font-size: 1rem;
  cursor: pointer;
`;

const CommentBtn = styled.button`
  display: flex;
  align-items: center;
  color: black;
  margin-left: 0.7rem;
  border: none;
  border-radius: 0.8rem;
  height: 2rem;
  padding: 0 1rem;
  background-color: greenyellow;
  font-size: 1rem;
  cursor: pointer;
`;

const RemoveDialog = ({ data, onRemove, onToggleRemoveDialog }) => {
  return (
    <DialogLayout>
      <Wrapper>
        <Title>{data}</Title>
        <Ask>정말 삭제하시겠습니까?</Ask>
        <BtnWrapper>
          <CancelBtn onClick={onToggleRemoveDialog}>취소</CancelBtn>
          {data === '댓글 삭제' ? (
            <CommentBtn onClick={onRemove}>확인</CommentBtn>
          ) : (
            <Btn onClick={onRemove} to={'/'}>
              확인
            </Btn>
          )}
        </BtnWrapper>
      </Wrapper>
    </DialogLayout>
  );
};

export default RemoveDialog;
