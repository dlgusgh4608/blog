import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { EMAIL_CHECK_REQUEST } from '../../reducer/user';
import Spinner from '../spinner/Spinner';

const SignupContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
`;

const SignupWrapper = styled.div`
  display: flex;
  background-color: white;
  width: 670px;
  height: 480px;
`;

const SignupWelcome = styled.div`
  width: 250px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignupWelcomeImg = styled.img`
  width: 100%;
`;

const SignupInpormationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  flex: 1 1 0%;

  h4 {
    margin: 0.3rem 0 0.3rem 0;
  }
`;

const SignupExitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0 1rem 0;

  h2 {
    margin: 0;
  }
`;

const SignupInpormation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 0%;
`;

const SignupForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EmailInputWrapper = styled.div`
  display: flex;
`;

const EmailInput = styled.input`
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  border-right: none;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  font-size: 1rem;
  padding: 0.8rem;
  flex: 1 1 0%;
`;

const EmailCheckBtn = styled.button`
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: none;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 0.8rem;
  background-color: greenyellow;
  cursor: pointer;
`;

const PasswordInput = styled.input`
  border: 1px solid black;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.8rem;
`;

const SignupButton = styled.button`
  background-color: greenyellow;
  border: none;
  margin-top: 1.8rem;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.8rem;
  cursor: pointer;
`;

const XBtn = styled.div`
  cursor: pointer;
`;

const SignupFooter = styled.div`
  text-align: right;
`;

const FooterSpan = styled.span`
  margin-right: 0.5rem;
`;

const Login = styled.div`
  display: inline-block;
  font-weight: bold;
  color: green;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const Signup = ({ onLoggingHandler, switchHandler }) => {
  const { emailCheckSuccess, emailCheckLodding, emailCheckError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');

  useEffect(() => {
    if (emailCheckSuccess) {
      alert(emailCheckSuccess);
    }
  }, [emailCheckSuccess]);
  useEffect(() => {
    if (emailCheckError) {
      alert(emailCheckError);
    }
  }, [emailCheckError]);

  const onEmailCheck = () => {
    dispatch({
      type: EMAIL_CHECK_REQUEST,
      data: { email },
    });
  };

  return (
    <>
      <SignupContainer>
        <SignupWrapper>
          <SignupWelcome>
            <SignupWelcomeImg src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
            <h2>환영합니다.</h2>
          </SignupWelcome>
          <SignupInpormationWrapper>
            <SignupExitWrapper>
              <h2>회원가입</h2>
              <XBtn onClick={onLoggingHandler}>✖️</XBtn>
            </SignupExitWrapper>
            <SignupInpormation>
              <SignupForm>
                <h4>이메일</h4>
                <EmailInputWrapper>
                  <EmailInput type="email" value={email} onChange={onChangeEmail} placeholder="이메일을 입력해주세요." />
                  <EmailCheckBtn type="button" onClick={onEmailCheck}>
                    {emailCheckLodding ? <Spinner /> : '중복확인'}
                  </EmailCheckBtn>
                </EmailInputWrapper>
                <h4>비밀번호</h4> <PasswordInput type="password" value={password} onChange={onChangePassword} placeholder="비밀번호를 입력해주세요." />
                <h4>비밀번호확인</h4> <PasswordInput type="password" value={passwordCheck} onChange={onChangePasswordCheck} placeholder="비밀번호를 입력해주세요." />
                <SignupButton type="submit">회원가입</SignupButton>
              </SignupForm>
              <SignupFooter>
                <FooterSpan>이미 아이디가 있으신가요?</FooterSpan>
                <Login onClick={switchHandler}>로그인</Login>
              </SignupFooter>
            </SignupInpormation>
          </SignupInpormationWrapper>
        </SignupWrapper>
      </SignupContainer>
    </>
  );
};

export default Signup;
