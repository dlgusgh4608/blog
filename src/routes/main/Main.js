import React from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/layout/MainLayout';
import MenuList from '../../components/post/MenuList';
import PostItem from '../../components/post/PostItem';

const MainContainer = styled.div`
  width: 1728px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const MainWrapper = styled.div`
  margin-top: 1.5rem;
`;

const PostWrapper = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;
  box-sizing: inherit;
`;

const Main = ({ location }) => {
  const type = location.pathname.replace('/', '');
  return (
    <MainLayout>
      <MainContainer>
        <MenuWrapper>
          <MenuList type={type} />
        </MenuWrapper>
        <MainWrapper>
          <PostWrapper>
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </PostWrapper>
        </MainWrapper>
      </MainContainer>
    </MainLayout>
  );
};

export default Main;
