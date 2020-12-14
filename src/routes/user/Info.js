import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MainLayout from '../../components/layout/MainLayout';
import Header from '../../components/user/Header';
import Main from '../../components/user/Main';
import { LOAD_USER_POSTS_REQUEST } from '../../reducer/post';
import queryString from 'query-string';

const Container = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Info = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.userId;
  console.log(queryString.parse(props.location.search));
  const { userPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: {
        id,
      },
    });
  }, [id]);

  return (
    <MainLayout userId={id}>
      <Container>
        {user && <Header user={user} />}
        {userPosts && <Main posts={userPosts} />}
      </Container>
    </MainLayout>
  );
};

export default Info;
