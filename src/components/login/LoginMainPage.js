import React, { useState } from 'react';
import LoginPage from './Login';
import SignUpPage from './SignUp';
import DialogLayout from '../layout/DialogLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      {signUpToggle ? (
        <SignUpPage toggleDialog={toggleDialog} switchHandler={switchHandler} successAlert={successAlert} errorAlert={errorAlert} />
      ) : (
        <LoginPage toggleDialog={toggleDialog} switchHandler={switchHandler} errorAlert={errorAlert} />
      )}
    </DialogLayout>
  );
};

export default LoginMain;
