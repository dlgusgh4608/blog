import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { EMAIL_CHECK_REQUEST, SIGN_UP_REQUEST } from '../../reducer/user';
import Spinner from '../spinner/Spinner';

const SignUpContainer = styled.div`
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

const SignUpWrapper = styled.div`
  display: flex;
  background-color: white;
  width: 670px;
  height: 480px;
`;

const SignUpWelcome = styled.div`
  width: 250px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignUpWelcomeImg = styled.img`
  width: 100%;
`;

const SignUpInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  flex: 1 1 0%;

  h4 {
    margin: 0.3rem 0 0.3rem 0;
  }
`;

const SignUpExitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0 1rem 0;

  h2 {
    margin: 0;
  }
`;

const SignUpInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 0%;
`;

const SignUpForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SpanWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.8rem;
  }
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

const SignUpButton = styled.button`
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

const SignUpFooter = styled.div`
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

const ErrorSpan = styled.span`
  color: red;
`;

const SuccessSpan = styled.span`
  color: yellowgreen;
`;

const SignUp = ({ toggleDialog, switchHandler }) => {
  const { emailCheckSuccess, emailCheckLoading, emailCheckError, signUpSuccess, signUpError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailCheckSuccess) {
      setCheckError(false);
    }
  }, [emailCheckSuccess]);

  useEffect(() => {
    if (signUpSuccess) {
      alert('회원가입에 성공하셨습니다.');
      switchHandler();
    }
  }, [signUpSuccess]);
  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [password, onChangePassword] = useInput('');

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [check, setCheck] = useState('');
  const [checkError, setCheckError] = useState(false);

  const onChangeEmail = useCallback((e) => {
    const testEmail = e.target.value;
    setEmail(testEmail);
    setEmailError(!testEmail.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i));
  }, []);
  const onEmailCheck = useCallback(
    (e) => {
      e.preventDefault();
      if (!email) {
        return setEmailError(true);
      }
      setCheck(email);
      dispatch({
        type: EMAIL_CHECK_REQUEST,
        data: { email },
      });
    },
    [email],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (check !== email) {
        return setCheckError(true);
      }
      if (emailCheckError) {
        return setCheckError(true);
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          email,
          password,
        },
      });
    },
    [email, password, check, passwordCheck],
  );

  return (
    <>
      <SignUpContainer>
        <SignUpWrapper>
          <SignUpWelcome>
            <SignUpWelcomeImg src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
            <h2>환영합니다.</h2>
          </SignUpWelcome>
          <SignUpInformationWrapper>
            <SignUpExitWrapper>
              <h2>회원가입</h2>
              <XBtn onClick={toggleDialog}>✖️</XBtn>
            </SignUpExitWrapper>
            <SignUpInformation>
              <SignUpForm onSubmit={onSubmit}>
                <SpanWrapper>
                  <h4>이메일</h4>
                  {emailCheckError && <ErrorSpan>{emailCheckError}</ErrorSpan>}
                  {emailError && <ErrorSpan>이메일형식으로 입력해주세요!</ErrorSpan>}
                  {emailCheckSuccess && <SuccessSpan>{emailCheckSuccess}</SuccessSpan>}
                </SpanWrapper>
                <EmailInputWrapper>
                  <EmailInput type="email" required value={email} onChange={onChangeEmail} placeholder="이메일을 입력해주세요." />
                  <EmailCheckBtn onClick={onEmailCheck}>{emailCheckLoading ? <Spinner /> : '중복확인'}</EmailCheckBtn>
                </EmailInputWrapper>
                <h4>비밀번호</h4>
                <PasswordInput type="password" required value={password} onChange={onChangePassword} placeholder="비밀번호를 입력해주세요." />
                <SpanWrapper>
                  <h4>비밀번호확인</h4>
                  {passwordError && <ErrorSpan>비밀번호가 일치하지 않습니다.</ErrorSpan>}
                </SpanWrapper>

                <PasswordInput type="password" required value={passwordCheck} onChange={onChangePasswordCheck} placeholder="비밀번호를 한번더 입력해주세요." />
                <SignUpButton type="submit">{checkError ? '중복확인을 시도 해주세요.' : '회원가입'}</SignUpButton>
              </SignUpForm>
              <SignUpFooter>
                <FooterSpan>이미 아이디가 있으신가요?</FooterSpan>
                <Login onClick={switchHandler}>로그인</Login>
              </SignUpFooter>
            </SignUpInformation>
          </SignUpInformationWrapper>
        </SignUpWrapper>
      </SignUpContainer>
    </>
  );
};

export default SignUp;
