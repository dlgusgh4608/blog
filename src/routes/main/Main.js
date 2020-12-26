import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MainLayout from '../../components/layout/MainLayout';
import MenuList from '../../components/main/MenuList';
import PostItem from '../../components/main/PostItem';
import { LOAD_MAIN_POSTS_REQUEST } from '../../reducer/post';

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
  @media (max-width: 767px) {
    width: 100%;
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

  @media (max-width: 767px) {
    margin: 0px;
  }
`;

const Main = ({ location }) => {
  const type = location.pathname.replace('/', '');
  const dispatch = useDispatch();
  const { posts, addPostLoading, removePostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (!addPostLoading && !removePostLoading) {
      if (type === 'old') {
        return;
      }
      dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
      });
    }
  }, [type, addPostLoading, removePostLoading]);
  return (
    <MainLayout>
      <MainContainer>
        <MenuWrapper>
          <MenuList type={type} />
        </MenuWrapper>
        <MainWrapper>
          <PostWrapper>
            {posts.map((v) => (
              <PostItem key={v.post_id} data={v} />
            ))}
          </PostWrapper>
        </MainWrapper>
      </MainContainer>
    </MainLayout>
  );
};

export default Main;
