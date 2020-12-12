import React from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/layout/MainLayout';
import Header from '../../components/user/Header';
import Main from '../../components/user/Main';

const Container = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Info = ({ match }) => {
  const id = match.params.userId;
  console.log(id);
  return (
    <MainLayout>
      <Container>
        <Header />
        <Main />
      </Container>
    </MainLayout>
  );
};

export default Info;
