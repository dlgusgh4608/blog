import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { LOGIN_REQUEST } from '../../reducer/user';
import Spinner from '../spinner/Spinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  flex: 1 1 0%;

  h4 {
    margin: 0.3rem 0 0.3rem 0;
  }

  @media (max-width: 800px) {
    height: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0 1.5rem 0;
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

const LoginInput = styled.input`
  border: 1px solid black;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.8rem;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8ce99a;
  margin-top: 2.2rem;
  border: none;
  border-radius: 2px;
  padding: 0.8rem;
  font-size: 1rem;
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

const SignUp = styled.div`
  display: inline-block;
  font-weight: bold;
  color: #2b8a3e;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const Login = ({ toggleDialog, switchHandler, errorAlert }) => {
  const dispatch = useDispatch();
  const { loginSuccess, loginLoading, loginError } = useSelector((state) => state.user);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');

  useEffect(() => {
    if (loginSuccess) {
      toggleDialog();
    }
    if (loginError) {
      errorAlert('이메일 혹은 비밀번호가 틀렸습니다.');
      setEmail('');
      setPassword('');
    }
  }, [loginSuccess, setPassword, loginError, toggleDialog, errorAlert, setEmail]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email) {
        return alert('이메일을 입력해주세요.');
      }
      if (!password) {
        return alert('비밀번호를 입력해주세요.');
      }
      dispatch({
        type: LOGIN_REQUEST,
        data: {
          email,
          password,
        },
      });
    },
    [email, password, dispatch],
  );

  return (
    <>
      <Container>
        <Header>
          <h2>로그인</h2>
          <XBtn onClick={toggleDialog}>✖️</XBtn>
        </Header>
        <Main>
          <Wrapper onSubmit={onSubmit}>
            <h4>이메일</h4> <LoginInput type="email" value={email} onChange={onChangeEmail} placeholder="이메일을 입력해주세요." />
            <h4>비밀번호</h4> <LoginInput type="password" value={password} onChange={onChangePassword} placeholder="비밀번호를 입력해주세요." />
            <LoginButton type="submit">{loginLoading ? <Spinner /> : '로그인'}</LoginButton>
          </Wrapper>
        </Main>
        <Footer>
          <FooterSpan>아직 아이디가 없으신가요?</FooterSpan>
          <SignUp onClick={switchHandler}>회원가입</SignUp>
        </Footer>
      </Container>
    </>
  );
};

export default Login;
