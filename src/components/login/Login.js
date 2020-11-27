import React, { useCallback } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

const LoginContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
`;

const LoginWrapper = styled.div`
  display: flex;
  background-color: white;
  width: 670px;
  height: 480px;
`;

const LoginWelcome = styled.div`
  width: 250px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginWelcomeImg = styled.img`
  width: 100%;
`;

const LoginInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  flex: 1 1 0%;

  h4 {
    margin: 0.3rem 0 0.3rem 0;
  }
`;

const LoginExitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0 1.5rem 0 h2 {
    margin: 0;
  }
`;

const LoginInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 0%;
`;

const LoginForm = styled.form`
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
  background-color: greenyellow;
  border: none;
  margin-top: 2.2rem;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.8rem;
  cursor: pointer;
`;

const XBtn = styled.div`
  cursor: pointer;
`;

const LoginFooter = styled.div`
  text-align: right;
`;

const FooterSpan = styled.span`
  margin-right: 0.5rem;
`;

const SignUp = styled.div`
  display: inline-block;
  font-weight: bold;
  color: green;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const Login = ({ toggleDialog, switchHandler }) => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');

  const onSubmit = useCallback(() => {
    if (!email) {
      return alert('이메일을 입력해주세요.');
    }
    if (!password) {
      return alert('비밀번호를 입력해주세요.');
    }
  }, []);

  return (
    <>
      <LoginContainer>
        <LoginWrapper>
          <LoginWelcome>
            <LoginWelcomeImg src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
            <h2>환영합니다.</h2>
          </LoginWelcome>
          <LoginInformationWrapper>
            <LoginExitWrapper>
              <h2>로그인</h2>
              <XBtn onClick={toggleDialog}>✖️</XBtn>
            </LoginExitWrapper>
            <LoginInformation>
              <LoginForm onSubmit={onSubmit}>
                <h4>이메일</h4> <LoginInput type="email" value={email} onChange={onChangeEmail} placeholder="이메일을 입력해주세요." />
                <h4>비밀번호</h4> <LoginInput type="password" value={password} onChange={onChangePassword} placeholder="비밀번호를 입력해주세요." />
                <LoginButton type="submit">로그인</LoginButton>
                <div>이메일 혹은 비밀번호가 잘못되었습니다.</div>
              </LoginForm>
              <LoginFooter>
                <FooterSpan>아직 아이디가 없으신가요?</FooterSpan>
                <SignUp onClick={switchHandler}>회원가입</SignUp>
              </LoginFooter>
            </LoginInformation>
          </LoginInformationWrapper>
        </LoginWrapper>
      </LoginContainer>
    </>
  );
};

export default Login;
