import React from 'react';
import styled from 'styled-components';

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

const LoginInpormationWrapper = styled.div`
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
  justify-content: flex-end;
  cursor: pointer;
`;

const LoginInpormation = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled.input`
  border: 1px solid black;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.8rem;
`;

const PasswordInput = styled.input`
  border: 1px solid black;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.8rem;
`;

const LoginButton = styled.button`
  background-color: greenyellow;
  border: none;
  margin: 2.2rem 0 2.2rem 0;
  border-radius: 2px;
  font-size: 1rem;
  padding: 0.8rem;
  cursor: pointer;
`;

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginWelcome>
          <LoginWelcomeImg src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
          <h2>환영합니다.</h2>
        </LoginWelcome>
        <LoginInpormationWrapper>
          <LoginExitWrapper>X</LoginExitWrapper>
          <LoginInpormation>
            <h2>로그인</h2>
            <LoginForm>
              <h4>이메일</h4> <EmailInput placeholder="이메일을 입력해주세요." />
              <h4>비밀번호</h4> <PasswordInput placeholder="비밀번호를 입력해주세요." />
              <LoginButton>로그인</LoginButton>
            </LoginForm>
          </LoginInpormation>
          아이디가 없다면? 회원가입하러 가기
        </LoginInpormationWrapper>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default LoginPage;
