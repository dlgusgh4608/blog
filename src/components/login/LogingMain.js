import React, { useState } from 'react';
import styled from 'styled-components';
import LoginPage from './Login';
import SignupPage from './Signup';

const MainBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(249, 249, 249, 0.85);
  z-index: 999;
`;

const LogingMain = ({ onLoggingHandler }) => {
  const [signuping, setSignuping] = useState(false);

  const switchHandler = () => {
    setSignuping((prev) => !prev);
  };

  return (
    <>
      <MainBackground></MainBackground>
      {signuping ? (
        <SignupPage onLoggingHandler={onLoggingHandler} switchHandler={switchHandler} />
      ) : (
        <LoginPage onLoggingHandler={onLoggingHandler} switchHandler={switchHandler} />
      )}
    </>
  );
};

export default LogingMain;
