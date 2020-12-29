import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { EMAIL_CHECK_REQUEST, SIGN_UP_REQUEST } from '../../reducer/user';
import Spinner from '../spinner/Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  flex: 1 1 0%;

  h4 {
    margin: 0.3rem 0 0.3rem 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0 1rem 0;

  h2 {
    margin: 0;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 0%;

  @media (max-width: 800px) {
    flex: 0;
    margin-bottom: 1rem;
  }
`;

const Wrapper = styled.form`
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
  background-color: #8ce99a;
  cursor: pointer;
`;

const PasswordInput = styled.input`
  border: 1px solid black;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.8rem;
`;

const SignUpButton = styled.button`
  background-color: #8ce99a;
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

const Footer = styled.div`
  text-align: right;
`;

const FooterSpan = styled.span`
  margin-right: 0.5rem;
`;

const Login = styled.div`
  display: inline-block;
  font-weight: bold;
  color: #2b8a3e;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const ErrorSpan = styled.span`
  color: red;
`;

const SignUp = ({ toggleDialog, switchHandler, successAlert, errorAlert }) => {
  const dispatch = useDispatch();
  const { signUpSuccess, emailCheckError, emailCheckLoading, emailCheckSuccess } = useSelector((state) => state.user);
  useEffect(() => {
    if (signUpSuccess) {
      successAlert('회원가입이 성공적으로 완료되었습니다.');
      switchHandler();
    } else if (emailCheckSuccess) {
      successAlert('사용하실수 있는 이메일입니다.');
    }
    if (emailCheckError) {
      errorAlert(emailCheckError.msg);
    }
  }, [signUpSuccess, emailCheckError, emailCheckSuccess, switchHandler, successAlert, errorAlert]);

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
  const onChangeEmail = useCallback((e) => {
    const testEmail = e.target.value;
    setEmail(testEmail);
    setEmailError(!testEmail.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i));
  }, []);

  const [check, setCheck] = useState('');
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
    [email, dispatch],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (check !== email) {
        return errorAlert('중복확인을 시도해주세요.');
      }
      if (emailCheckError) {
        return errorAlert(emailCheckError.msg);
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          email,
          password,
          passwordCheck,
        },
      });
    },
    [email, password, check, passwordCheck, emailCheckError, errorAlert, dispatch],
  );

  return (
    <>
      <Container>
        <Header>
          <h2>회원가입</h2>
          <XBtn onClick={toggleDialog}>✖️</XBtn>
        </Header>
        <Main>
          <Wrapper onSubmit={onSubmit}>
            <SpanWrapper>
              <h4>이메일</h4>
              {emailError && <ErrorSpan>이메일형식으로 입력해주세요!</ErrorSpan>}
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
            <SignUpButton type="submit">회원가입</SignUpButton>
          </Wrapper>
        </Main>
        <Footer>
          <FooterSpan>이미 아이디가 있으신가요?</FooterSpan>
          <Login onClick={switchHandler}>로그인</Login>
        </Footer>
      </Container>
    </>
  );
};

export default SignUp;
