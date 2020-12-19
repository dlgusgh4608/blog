import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import styled from 'styled-components';
import Image from '../../components/setting/Image';
import NicknameForm from '../../components/setting/NicknameForm';
import PasswordForm from '../../components/setting/PasswordForm';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 750px) {
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
  @media (max-width: 750px) {
    margin-left: 0px;
  }
`;

const Setting = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <MainLayout>
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
