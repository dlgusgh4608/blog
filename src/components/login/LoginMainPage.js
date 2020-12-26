import React, { useState } from 'react';
import LoginPage from './Login';
import SignUpPage from './SignUp';
import DialogLayout from '../layout/DialogLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background-color: white;
  width: 670px;
  height: 480px;

  @media (max-width: 767px) {
    flex: 1 1 0%;
    width: auto;
    height: 100%;
  }
`;

const Welcome = styled.div`
  width: 250px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 767px) {
    display: none;
  }
`;

const WelcomeImg = styled.img`
  width: 100%;
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
    <DialogLayout>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Container>
        <Welcome>
          <WelcomeImg src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
          <h2>환영합니다</h2>
        </Welcome>
        {signUpToggle ? (
          <SignUpPage toggleDialog={toggleDialog} switchHandler={switchHandler} successAlert={successAlert} errorAlert={errorAlert} />
        ) : (
          <LoginPage toggleDialog={toggleDialog} switchHandler={switchHandler} errorAlert={errorAlert} />
        )}
      </Container>
    </DialogLayout>
  );
};

export default LoginMain;
