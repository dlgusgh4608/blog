import React, { useState } from 'react';
import styled from 'styled-components';
import LoginPage from './Login';
import SignUpPage from './SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const successAlert = (value) => {
    toast.success(value);
  };
  const errorAlert = (value) => {
    toast.error(value);
  };

  const [signUpToggle, setSignUpToggle] = useState(false);
  const switchHandler = () => {
    setSignUpToggle((prev) => !prev);
  };

  return (
    <>
      <MainBackground />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {signUpToggle ? (
        <SignUpPage toggleDialog={toggleDialog} switchHandler={switchHandler} successAlert={successAlert} errorAlert={errorAlert} />
      ) : (
        <LoginPage toggleDialog={toggleDialog} switchHandler={switchHandler} errorAlert={errorAlert} />
      )}
    </>
  );
};

export default LoginMain;
