import React, { useState } from 'react';
import styled from 'styled-components';
import LoginPage from './Login';
import SignUpPage from './SignUp';

const MainBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(249, 249, 249, 0.85);
  z-index: 999;
`;

const LoginMain = ({ toggleDialog }) => {
  const [signUpToggle, setSignUpToggle] = useState(false);

  const switchHandler = () => {
    setSignUpToggle((prev) => !prev);
  };

  return (
    <>
      <MainBackground></MainBackground>
      {signUpToggle ? <SignUpPage toggleDialog={toggleDialog} switchHandler={switchHandler} /> : <LoginPage toggleDialog={toggleDialog} switchHandler={switchHandler} />}
    </>
  );
};

export default LoginMain;
