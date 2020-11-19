import React from 'react';
import styled from 'styled-components';
import MenuList from './MenuList';
import PostItems from './PostItems';

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

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;
  box-sizing: inherit;
`;

const MainPage = () => {
  return (
    <>
      <MainContainer>
        <MenuWrapper>
          <MenuList />
        </MenuWrapper>
        <MainWrapper>
          <Main>
            <PostItems />
            <PostItems />
            <PostItems />
            <PostItems />
            <PostItems />
            <PostItems />
            <PostItems />
            <PostItems />
          </Main>
        </MainWrapper>
      </MainContainer>
    </>
  );
};

export default MainPage;
