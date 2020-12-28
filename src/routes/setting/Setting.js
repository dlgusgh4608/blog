import React, { useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import styled from 'styled-components';
import Image from '../../components/setting/Image';
import NicknameForm from '../../components/setting/NicknameForm';
import PasswordForm from '../../components/setting/PasswordForm';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  width: 767px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  justify-content: flex-end;
  margin-left: 3rem;
  @media (max-width: 800px) {
    margin-left: 0px;
  }
`;

const Setting = () => {
  const { me, changeImageSuccess, changeNicknameSuccess, changePasswordSuccess } = useSelector((state) => state.user);

  useEffect(() => {
    if (changeImageSuccess) {
      successAlert('이미지가 성공적으로 변경되었습니다.');
    }
    if (changeNicknameSuccess) {
      successAlert('닉네임이 성공적으로 변경되었습니다.');
    }
    if (changePasswordSuccess) {
      successAlert('비밀번호가 성공적으로 변경되었습니다.');
    }
  }, [changeImageSuccess, changeNicknameSuccess, changePasswordSuccess]);

  const successAlert = (value) => {
    toast.success(value);
  };

  return (
    <MainLayout>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {me && (
        <Container>
          <Image me={me} />
          <Wrapper>
            <NicknameForm me={me} />
            <PasswordForm />
          </Wrapper>
        </Container>
      )}
    </MainLayout>
  );
};

export default Setting;
