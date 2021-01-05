import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { CHANGE_PASSWORD_REQUEST } from '../../reducer/user';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorSpan = styled.label`
  font-size: 0.8rem;
  color: red;
`;

const Input = styled.input`
  flex: 1 1 0%;
  height: 2rem;
  border-radius: 0.4rem;
  outline: none;
  border: 1px solid black;
  padding: 0.5rem;
  margin-bottom: 0.3rem;
`;

const Btn = styled.button`
  border: none;
  background-color: greenyellow;
  border-radius: 0.4rem;
  padding: 0.5rem;
  cursor: pointer;
`;

const PasswordForm = () => {
  const dispatch = useDispatch();

  const [pw, onChangePw] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onClickBtn = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
      data: {
        pw,
        password,
        passwordCheck,
      },
    });
  }, [password, passwordCheck, pw, dispatch]);

  return (
    <Container>
      <LabelWrapper>
        <label>비밀번호</label>
        {passwordError && <ErrorSpan>변경할 비밀번호가 일치하지 않습니다.</ErrorSpan>}
      </LabelWrapper>
      <Input type="password" placeholder="현재비밀번호" value={pw} onChange={onChangePw} />
      <Input type="password" placeholder="변경할 비밀번호" value={password} onChange={onChangePassword} />
      <Input type="password" placeholder="변경할 비밀번호 확인" value={passwordCheck} onChange={onChangePasswordCheck} />
      <Btn onClick={onClickBtn}>비밀번호 변경하기</Btn>
    </Container>
  );
};

export default PasswordForm;
