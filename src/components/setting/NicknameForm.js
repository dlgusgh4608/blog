import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../../reducer/user';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    margin-top: 2rem;
  }
`;

const Label = styled.label`
  font-size: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Input = styled.input`
  flex: 1 1 0%;
  height: 2rem;
  border-radius: 0.4rem;
  outline: none;
  border: 1px solid black;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const Btn = styled.button`
  margin-left: 1rem;
  border: none;
  background-color: greenyellow;
  border-radius: 0.4rem;
  cursor: pointer;
`;

const NicknameForm = ({ me }) => {
  const [text, onChangeText] = useInput(me.nickname);
  const dispatch = useDispatch();

  const onClickBtn = useCallback(() => {
    const nickname = text.trim().replace(/\s{2,}/g, ' ');
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: {
        nickname,
      },
    });
  }, [text, dispatch]);

  return (
    <Container>
      <Label>닉네임</Label>
      <Wrapper>
        <Input placeholder="닉네임을 입력해주세요." value={text} onChange={onChangeText} />
        <Btn onClick={onClickBtn}>수정하기</Btn>
      </Wrapper>
    </Container>
  );
};

export default NicknameForm;
